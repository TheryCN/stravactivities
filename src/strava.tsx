export const config = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUrl: 'stravactivities://oauthredirect',
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
    tokenEndpoint: 'https://www.strava.com/api/v3/oauth/token',
  },
  scopes: ['activity:read_all'],
};

export const authorizationEndpoint = () =>
  config.serviceConfiguration.authorizationEndpoint +
  '?client_id=' +
  config.clientId +
  '&redirect_uri=' +
  config.redirectUrl +
  '&response_type=code' +
  '&approval_prompt=force' +
  '&scope=' +
  config.scopes.join(',');
