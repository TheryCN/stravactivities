import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Athlete} from '../api';
import {palette} from './palette';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRunning} from '@fortawesome/free-solid-svg-icons';
import {faStarHalf} from '@fortawesome/free-solid-svg-icons';

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
      <View style={styles.header}>
        <View style={styles.container}>
          <Text style={styles.auth}>{username}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>
            <FontAwesomeIcon icon={faStarHalf} color={'white'} />{' '}
            StravActivities
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.other}>
            <FontAwesomeIcon icon={faRunning} color={'white'} />{' '}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 5,
    color: 'white',
    backgroundColor: palette.secondary,
    lineHeight: 30,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
  },
  auth: {
    textAlign: 'left',
    color: 'white',
  },
  other: {
    textAlign: 'right',
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
