export const FETCH_SQUADS_REQUEST = 'FETCH_SQUADS_REQUEST';
export const FETCH_SQUADS_SUCCESS = 'FETCH_SQUADS_SUCCESS';
export const FETCH_SQUADS_FAILURE = 'FETCH_SQUADS_FAILURE';

export const fetchSquadsRequest = () => ({
  type: FETCH_SQUADS_REQUEST
});

export const fetchSquadsSuccess = (squads) => ({
  type: FETCH_SQUADS_SUCCESS,
  payload: squads
});

export const fetchSquadsFailure = (error) => ({
  type: FETCH_SQUADS_FAILURE,
  payload: error
});