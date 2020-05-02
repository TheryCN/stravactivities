import {RefreshToken} from '../api';
import {STORE_TOKEN} from './authTypes';

// Login
export const storeToken = (refreshToken: RefreshToken) => ({
  type: STORE_TOKEN,
  refreshToken: refreshToken,
});
