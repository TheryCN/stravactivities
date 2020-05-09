/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from '@react-navigation/material-top-tabs';
import {StatusBar} from 'react-native';

import {store, persistor} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Dashboard from './components/Dashboard';
import AthleteHeader from './components/AthleteHeader';
import ActivityList from './components/ActivityList';
import {palette} from './components/palette';

const Tab = createMaterialTopTabNavigator();

/**
 * App.
 */
const App = () => {
  const options: MaterialTopTabBarOptions = {
    indicatorStyle: {
      backgroundColor: palette.third,
    },
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={palette.primary}
          />
          <AthleteHeader />
          <Tab.Navigator tabBarOptions={options}>
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="ActivityList" component={ActivityList} />
          </Tab.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
