import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {Activity} from '../api';
import {palette} from './palette';

type ActivityListProps = {
  lastTenActivities: Activity[];
};

/**
 * Activity List.
 */
class ActivityList extends Component<ActivityListProps, {}> {
  render() {
    const renderItem = (listRenderItemInfo: ListRenderItemInfo<Activity>) => (
      <View style={styles.item}>
        <Text style={styles.title}>
          {listRenderItemInfo.item.name} (
          {Math.round(listRenderItemInfo.item.distance / 10) / 100} km)
        </Text>
      </View>
    );
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.lastTenActivities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: palette.third,
    fontSize: 16,
  },
});

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
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
