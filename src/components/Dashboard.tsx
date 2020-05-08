import {ScrollView} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Score from './Score';
import DailyStat from './DailyStat';
import {Colors} from 'react-native/Libraries/NewAppScreen';

/**
 * Dashboard.
 */
const Dashboard = ({navigation}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Score</Text>
          <Score />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Daily Stat</Text>
          <DailyStat />
        </View>
        <View style={styles.sectionContainer}>
          <Text
            style={styles.sectionTitle}
            onPress={() => navigation.navigate('ActivityList')}>
            Activity List link
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default Dashboard;
