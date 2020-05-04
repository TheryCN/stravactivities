import React, {Component} from 'react';
import {
  storeTokenCall,
  storeLastTenActivitiesCall,
  RefreshToken,
  Activity,
  extractUri,
  storeTokenByCodeCall,
} from '../api';
import {connect} from 'react-redux';
import {View, Linking} from 'react-native';
import {authorizationEndpoint} from '../strava';

type StravaContainerProps = {
  refreshToken: RefreshToken;
  lastTenActivities: Activity[];
  storeToken: (refreshToken: string) => void;
  storeTokenByCode: (code: string) => void;
  storeLastTenActivities: (accessToken: string) => void;
};

/**
 * Load Activities from Strava.
 */
class StravaContainer extends Component<StravaContainerProps, {}> {
  componentDidMount() {
    if (!this.props.refreshToken) {
      // OAuth2 Redirection
      Linking.openURL(authorizationEndpoint());
      Linking.addEventListener('url', (event) => {
        const code = extractUri(event.url).code;
        // Get Token by Code
        this.props.storeTokenByCode(code);
      });
    } else if (
      this.props.refreshToken.expires_at * 1000 <
      new Date().getTime()
    ) {
      // Refresh Token
      this.props.storeToken(this.props.refreshToken.refresh_token);
    } else {
      // Load Activities
      this.props.storeLastTenActivities(this.props.refreshToken.access_token);
    }
  }

  componentDidUpdate() {
    // Load only if we have a valid token and no activities
    if (
      this.props.refreshToken &&
      this.props.lastTenActivities instanceof Array &&
      this.props.lastTenActivities.length === 0
    ) {
      console.log('ICIIII', this.props.refreshToken);
      this.props.storeLastTenActivities(this.props.refreshToken.access_token);
    }
  }

  render() {
    return <View>{this.props.children}</View>;
  }
}

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    refreshToken: state.authReducer.refreshToken,
    lastTenActivities: state.activitiesReducer.lastTenActivities,
  };
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    storeToken: (refreshToken: string) =>
      storeTokenCall(dispatch, refreshToken),
    storeTokenByCode: (code: string) => storeTokenByCodeCall(dispatch, code),
    storeLastTenActivities: (accessToken: string) =>
      storeLastTenActivitiesCall(accessToken, dispatch),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(StravaContainer);
