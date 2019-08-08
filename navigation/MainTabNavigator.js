import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/main/HomeScreen';
import LeftSliderScreen from '../screens/main/LeftSliderScreen';
import { addHeaderLeftNavigator } from '../helpers';
import ChangePassword from '../screens/main/profile/ChangePassword';
import EditProfile from '../screens/main/profile/EditProfile';
import FeedsHome from '../screens/main/feeds/FeedsHome';
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ChangePassword,
  EditProfile
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: FeedsHome,
    navigationOptions: ({ navigation }) => {
      const headerLeftNav = addHeaderLeftNavigator(navigation);
      return { ...headerLeftNav, title: 'Settings' };
    }
  }
});

/* eslint-disable react/prop-types, react/display-name */
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-map'} />,
  tabBarOptions: {
    activeTintColor: '#FFB300'
  }
};

SettingsStack.navigationOptions = {
  tabBarLabel: 'Feeds',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'ios-list'} />,
  tabBarOptions: {
    activeTintColor: '#FFB300'
  }
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#333'
      }
    }
  }
);

export default createDrawerNavigator(
  {
    BottomTabNavigator: BottomTabNavigator
  },
  {
    contentComponent: LeftSliderScreen
  }
);
