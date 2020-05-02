import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Activity} from '../api';
import {connect} from 'react-redux';

type ScoreProps = {
  lastTenActivities: Activity[];
};
type ScoreState = {myScore: number};

/**
 * The score is the number of activities.
 */
class Score extends Component<ScoreProps, ScoreState> {
  state = {
    myScore: 0,
  };

  componentDidMount() {
    this.setState({myScore: this.props.lastTenActivities.length});
  }

  componentDidUpdate() {
    if (this.state.myScore !== this.props.lastTenActivities.length) {
      this.setState({myScore: this.props.lastTenActivities.length});
    }
  }

  render() {
    return (
      <View>
        <Text>Your score is {this.state.myScore}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    lastTenActivities: state.activitiesReducer.lastTenActivities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Score);
