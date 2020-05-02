import React, {Component} from 'react';
import {
  storeTokenCall,
  storeLastTenActivitiesCall,
  RefreshToken,
  Activity,
} from '../api';
import {connect} from 'react-redux';
import {View} from 'react-native';

type StravaContainerProps = {
  refreshToken: RefreshToken;
  lastTenActivities: Activity[];
  storeToken: () => void;
  storeLastTenActivities: (accessToken: string) => void;
};

/**
 * Load Activities from Strava.
 */
class StravaContainer extends Component<StravaContainerProps, {}> {
  componentDidMount() {
    if (
      !this.props.refreshToken ||
      this.props.refreshToken.expires_at * 1000 < new Date().getTime()
    ) {
      this.props.storeToken();
    } else {
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
    storeToken: () => storeTokenCall(dispatch),
    storeLastTenActivities: (accessToken: string) =>
      storeLastTenActivitiesCall(accessToken, dispatch),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(StravaContainer);
