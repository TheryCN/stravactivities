/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Score from './components/Score';
import DailyStat from './components/DailyStat';

import {store, persistor} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import StravaContainer from './components/StravaContainer';
import ActivityList from './components/ActivityList';
import AthleteHeader from './components/AthleteHeader';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(134, 65, 244, .8)"
        />
        <SafeAreaView>
          <StravaContainer>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={styles.body}>
                <AthleteHeader />
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Score</Text>
                  <Score />
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Daily Stat</Text>
                  <DailyStat />
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Activity List</Text>
                  <ActivityList />
                </View>
              </View>
            </ScrollView>
          </StravaContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
