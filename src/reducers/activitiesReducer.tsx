import {STORE_LAST_TEN_ACTIVITIES} from '../actions/activitiesTypes';

// Initial State
const initialState = {
  lastTenActivities: [],
};

// Reducers (Modifies The State And Returns A New State)
const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_LAST_TEN_ACTIVITIES: {
      return {...state, lastTenActivities: action.lastTenActivities};
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default activitiesReducer;
