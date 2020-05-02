import {Activity} from '../api';
import {STORE_LAST_TEN_ACTIVITIES} from './activitiesTypes';

// Store Last Ten Activities
export const storeLastTenActivities = (lastTenActivities: Activity[]) => ({
  type: STORE_LAST_TEN_ACTIVITIES,
  lastTenActivities: lastTenActivities,
});
