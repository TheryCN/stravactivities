import React, {Component} from 'react';
import {BarChart, YAxis, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';
import * as scale from 'd3-scale';
import {connect} from 'react-redux';
import {Activity} from '../api';
import moment from 'moment';

type DailyStatProps = {
  lastTenActivities: Activity[];
};
type DailyStatState = {data: {value: number; label: string}[]; init: boolean};

/**
 * Daily Stat.
 */
class DailyStat extends Component<DailyStatProps, DailyStatState> {
  state = {
    init: false,
    data: [
      {
        value: 0,
        label: 'Monday',
      },
      {
        value: 0,
        label: 'Tuesday',
      },
      {
        value: 0,
        label: 'Wednesday',
      },
      {
        value: 0,
        label: 'Thursday',
      },
      {
        value: 0,
        label: 'Friday',
      },
      {
        value: 0,
        label: 'Saturday',
      },
      {
        value: 0,
        label: 'Sunday',
      },
    ],
  };

  componentDidUpdate() {
    const data = this.state.data;
    if (!this.state.init) {
      const today = moment();
      const weekStart = today.startOf('week').subtract(1, 'days');
      this.props.lastTenActivities
        .filter((activity) => weekStart.isBefore(moment(activity.start_date))) // Weekly data
        .forEach((activity) => {
          const day = moment(activity.start_date).day();
          data[day].value += activity.distance; // Rearrange by day
        });
      const init = true;
      this.setState({data, init});
    }
  }

  render() {
    const fill = 'rgb(134, 65, 244)';

    return (
      <View style={{height: 300}}>
        <YAxis
          data={this.state.data}
          yAccessor={({index}) => index}
          scale={scale.scaleBand}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          formatLabel={(_, index) => this.state.data[index].label}
        />
        <BarChart
          style={{flex: 1}}
          data={this.state.data}
          horizontal={true}
          yAccessor={({item}) => item.value}
          svg={{fill}}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          gridMin={0}>
          <Grid direction={Grid.Direction.VERTICAL} />
        </BarChart>
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
export default connect(mapStateToProps, mapDispatchToProps)(DailyStat);
