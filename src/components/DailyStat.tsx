import React, {Component} from 'react';
import {BarChart, YAxis, Grid} from 'react-native-svg-charts';
import {View, Text} from 'react-native';
import * as scale from 'd3-scale';

class DailyStat extends Component {
  render() {
    const fill = 'rgb(134, 65, 244)';
    const data = [
      {
        value: 50,
        label: 'Monday',
      },
      {
        value: 15,
        label: 'Tuesday',
      },
      {
        value: 25,
        label: 'Wednesday',
      },
      {
        value: 12,
        label: 'Thursday',
      },
      {
        value: 50,
        label: 'Friday',
      },
      {
        value: 50,
        label: 'Saturday',
      },
      {
        value: 50,
        label: 'Sunday',
      },
    ];

    return (
      <View style={{height: 300}}>
        <YAxis
          data={data}
          yAccessor={({index}) => index}
          scale={scale.scaleBand}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          formatLabel={(_, index) => data[index].label}
        />
        <BarChart
          style={{flex: 1}}
          data={data}
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

export default DailyStat;
