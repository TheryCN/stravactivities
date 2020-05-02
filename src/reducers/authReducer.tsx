import {STORE_TOKEN} from '../actions/authTypes';

// Initial State
const initialState = {
  refreshToken: undefined,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case STORE_TOKEN: {
      return {...state, refreshToken: action.refreshToken};
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default authReducer;
