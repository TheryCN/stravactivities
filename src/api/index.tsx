import {storeToken} from '../actions/authActions';
import {storeLastTenActivities} from '../actions/activitiesActions';
import {config} from '../strava';

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

export const storeTokenCall = async (dispatch, refreshToken: string) => {
  const formData = new FormData();
  formData.append('client_id', config.clientId);
  formData.append('client_secret', config.clientSecret);
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refreshToken);
  try {
    const response: TypedResponse<RefreshToken> = await fetch(
      config.serviceConfiguration.tokenEndpoint,
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

export const storeTokenByCodeCall = async (dispatch, code: string) => {
  const formData = new FormData();
  formData.append('client_id', config.clientId);
  formData.append('client_secret', config.clientSecret);
  formData.append('grant_type', 'authorization_code');
  formData.append('code', code);
  try {
    const response: TypedResponse<RefreshToken> = await fetch(
      config.serviceConfiguration.tokenEndpoint,
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

export const extractUri = (uri: string) => {
  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params: any = {},
    match: any;
  while ((match = regex.exec(uri))) {
    params[match[1]] = match[2];
  }
  return params;
};
