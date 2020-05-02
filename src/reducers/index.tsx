// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import activitiesReducer from './activitiesReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  activitiesReducer: activitiesReducer,
});
// Exports
export default rootReducer;
