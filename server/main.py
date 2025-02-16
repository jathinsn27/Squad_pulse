import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import chromadb
import json
from datetime import datetime
from typing import Dict, Any

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path="db")

# Create or get collection
collection = chroma_client.get_or_create_collection(
    name="health_data"
)

def load_json_file(filename: str) -> Dict[str, Any]:
    with open(filename, 'r') as f:
        return json.load(f)

@app.route("/process_health_data", methods=["POST"])
def process_health_data():
    try:
        # Load the filtered JSON file
        data = load_json_file('filtered_health_data.json')
        user_id = data.get('user_id', 'unknown')
        
        # Check if user data already exists
        existing_data = collection.get(
            ids=[user_id],
            include=['metadatas']
        )
        
        if existing_data and existing_data['metadatas']:
            logger.error(f"Data already exists for user_id={user_id}")
            return jsonify({
                "error": f"User {user_id} already exists in the database. Cannot add duplicate data."
            }), 409  # 409 Conflict status code
        
        # Prepare metadata with default values
        metadata = {
            "user_id": user_id,
            "timestamp": data.get('timestamp', datetime.utcnow().isoformat()),
            "avg_heart_rate": data.get('heart_rate', {}).get('avg_bpm', 0.0),
            "max_heart_rate": data.get('heart_rate', {}).get('max_bpm', 0.0),
            "min_heart_rate": data.get('heart_rate', {}).get('min_bpm', 0.0),
            "avg_oxygen_saturation": data.get('oxygen', {}).get('avg_saturation', 0.0),
            "total_steps": data.get('steps', {}).get('total_steps', 0),
            "distance_meters": data.get('steps', {}).get('distance_meters', 0.0),
            "sleep_efficiency": data.get('sleep', {}).get('efficiency', 0.0),
            "total_sleep_seconds": data.get('sleep', {}).get('total_sleep_seconds', 0.0),
            "deep_sleep_seconds": data.get('sleep', {}).get('deep_sleep_seconds', 0.0),
            "light_sleep_seconds": data.get('sleep', {}).get('light_sleep_seconds', 0.0),
            "rem_sleep_seconds": data.get('sleep', {}).get('rem_sleep_seconds', 0.0)
        }
        
        # Add new data only if user doesn't exist
        collection.add(
            ids=[user_id],
            metadatas=[metadata],
            documents=[json.dumps(data)]
        )
        
        logger.info(f"Stored new health data for user_id={user_id}")
        return jsonify({
            "message": "Health data stored successfully",
            "data": metadata
        })
        
    except Exception as e:
        logger.error(f"Error processing health data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health_data/<user_id>", methods=["GET"])
def get_health_data(user_id: str):
    try:
        results = collection.get(
            ids=[user_id],
            include=['metadatas']
        )
        
        if results and results['metadatas']:
            return jsonify(results['metadatas'][0])
        else:
            return jsonify({"error": "No health data found for this user"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health_data/batch", methods=["GET"])
def get_batch_health_data():
    try:
        limit = request.args.get('limit', default=20, type=int)
        
        results = collection.get(
            include=['metadatas'],
            limit=limit
        )
        
        if results and results['metadatas']:
            return jsonify({
                "count": len(results['metadatas']),
                "data": results['metadatas']
            })
        else:
            return jsonify({"error": "No health data found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health_data/clear", methods=["POST"])
def clear_health_data():
    try:
        # Delete the existing collection
        chroma_client.delete_collection(name="health_data")
        
        # Recreate the collection
        global collection
        collection = chroma_client.create_collection(name="health_data")
        
        logger.info("Successfully cleared all health data")
        return jsonify({"message": "All health data cleared successfully"})
            
    except Exception as e:
        logger.error(f"Error clearing health data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health_data/latest", methods=["GET"])
def get_latest_health_data():
    try:
        # Get the limit from query params, default to 20
        limit = int(request.args.get('limit', 20))
        
        # Query the collection with limit
        result = collection.get(
            limit=limit,
            include=['documents', 'metadatas']
        )
        
        if not result['ids']:
            return jsonify({"message": "No records found"}), 404
            
        # Create list of results with timestamps for sorting
        results = []
        for i in range(len(result['ids'])):
            results.append({
                "user_id": result['ids'][i],
                "metadata": result['metadatas'][i],
                "data": json.loads(result['documents'][i]),
                "timestamp": result['metadatas'][i].get('timestamp', '')
            })
        
        # Sort results by timestamp in descending order
        results.sort(key=lambda x: x['timestamp'], reverse=True)
            
        # Return all matching results
        return jsonify({
            "count": len(results),
            "results": results
        })
        
    except Exception as e:
        logger.error(f"Error retrieving latest health data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health_data/count", methods=["GET"])
def count_health_data():
    try:
        # Get all records to count them
        result = collection.get()
        count = len(result['ids'])
        
        return jsonify({
            "total_records": count
        })
        
    except Exception as e:
        logger.error(f"Error counting health data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health_data/range", methods=["GET"])
def get_health_data_range():
    try:
        # Get i and j from query parameters
        i = int(request.args.get('i', 0))
        j = int(request.args.get('j', 20))
        sort_by = request.args.get('sort_by', 'timestamp')
        order = request.args.get('order', 'desc')
        
        if i < 0 or j <= i:
            return jsonify({"error": "Invalid range. 'i' must be >= 0 and 'j' must be > 'i'"}), 400
            
        # Get all records first (since ChromaDB doesn't support offset)
        result = collection.get(
            include=['documents', 'metadatas']
        )
        
        if not result['ids']:
            return jsonify({"message": "No records found"}), 404
            
        # Create list of results
        results = []
        for idx in range(len(result['ids'])):
            results.append({
                "user_id": result['ids'][idx],
                "data": json.loads(result['documents'][idx])
            })
        
        # Sort results
        reverse = order.lower() == 'desc'
        results.sort(
            key=lambda x: x['data'].get(sort_by, ''),
            reverse=reverse
        )
        
        # Slice the results for the requested range
        total_records = len(results)
        j = min(j, total_records)  # Ensure j doesn't exceed total records
        range_results = results[i:j]
            
        return jsonify({
            "total_records": total_records,
            "i": i,
            "j": j,
            "count": len(range_results),
            "sort_by": sort_by,
            "order": order,
            "results": range_results
        })
        
    except Exception as e:
        logger.error(f"Error retrieving health data range: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    logger.info("Starting server on http://localhost:5000")
    app.run(debug=True)
