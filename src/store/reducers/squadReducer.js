import {
    FETCH_SQUADS_REQUEST,
    FETCH_SQUADS_SUCCESS,
    FETCH_SQUADS_FAILURE
  } from '../actions/squadActions';
  
  const initialState = {
    squads: [],
    loading: false,
    error: null
  };
  
  const squadReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SQUADS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_SQUADS_SUCCESS:
        return {
          ...state,
          loading: false,
          squads: action.payload,
          error: null
        };
      case FETCH_SQUADS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default squadReducer;