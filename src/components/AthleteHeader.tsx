import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Athlete} from '../api';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type AthleteProps = {
  athlete: Athlete;
};

/**
 * Athlete Header.
 */
class AthleteHeader extends Component<AthleteProps, {}> {
  render() {
    let welcome = 'Welcome ';
    if (this.props.athlete) {
      welcome +=
        this.props.athlete.firstname + ' ' + this.props.athlete.lastname;
    }
    return (
      <View>
        <Text style={styles.header}>{welcome}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 24,
    padding: 40,
    color: 'white',
    backgroundColor: 'rgb(134, 65, 244)',
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
