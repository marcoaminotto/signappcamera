import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Camera from './pages/Camera';

const mainPage = createStackNavigator({
    Home: Camera,
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerTitle: <Text style={{ marginLeft: 180 }}>SignApp</Text>,
    headerBackTitle: null,
  },
  mode: 'modal'

});

export default createAppContainer (mainPage);