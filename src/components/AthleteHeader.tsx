import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Athlete} from '../api';
import {palette} from './palette';

type AthleteProps = {
  athlete: Athlete;
};

/**
 * Athlete Header.
 */
class AthleteHeader extends Component<AthleteProps, {}> {
  render() {
    let username = '';
    if (this.props.athlete) {
      username +=
        this.props.athlete.firstname + ' ' + this.props.athlete.lastname;
    }
    return (
      <View>
        <Text style={styles.header}>{username}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'left',
    fontSize: 16,
    padding: 5,
    color: 'white',
    backgroundColor: palette.secondary,
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    athlete: state.authReducer.refreshToken
      ? state.authReducer.refreshToken.athlete
      : undefined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AthleteHeader);
