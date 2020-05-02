import {storeToken} from '../actions/authActions';
import {storeLastTenActivities} from '../actions/activitiesActions';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

interface TypedResponse<T = any> extends Response {
  json(): Promise<T>;
}

export interface RefreshToken {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}

export interface Activity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  start_date: Date;
  kudos_count: number;
}

export const getLastTenActivities = async (accessToken: string) => {
  try {
    const response: TypedResponse<Activity[]> = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?page=1&per_page=10',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const storeLastTenActivitiesCall = async (
  accessToken: string,
  dispatch,
) => {
  try {
    const response: TypedResponse<Activity[]> = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?page=1&per_page=10',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
    const lastTenActivities = await response.json();
    dispatch(storeLastTenActivities(lastTenActivities));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const storeTokenCall = async (dispatch) => {
  const formData = new FormData();
  formData.append('client_id', CLIENT_ID);
  formData.append('client_secret', CLIENT_SECRET);
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', REFRESH_TOKEN);
  try {
    const response: TypedResponse<RefreshToken> = await fetch(
      'https://www.strava.com/api/v3/oauth/token',
      {
        method: 'POST',
        body: formData,
      },
    );
    const refreshToken = await response.json();
    dispatch(storeToken(refreshToken));
  } catch (error) {
    throw error;
  }
};
