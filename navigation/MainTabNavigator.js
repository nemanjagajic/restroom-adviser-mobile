import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LeftSliderScreen from '../screens/main/LeftSliderScreen';
import { addHeaderLeftNavigator } from '../helpers';
import ChangePassword from '../screens/main/profile/ChangePassword';
import EditProfile from '../screens/main/profile/EditProfile';
import FeedsHome from '../screens/main/feeds/FeedsHome';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/main/HomeScreen';
import SetRestroomInfo from '../screens/main/restrooms/addRestroom/SetRestroomInfo';
import PickRestroomLocation from '../screens/main/restrooms/addRestroom/PickRestroomLocation';
import PickRestroomImages from '../screens/main/restrooms/addRestroom/PickRestroomImages';
import RestroomDetails from '../screens/main/restrooms/restroomDetails/RestroomDetails';
import RestroomComments from '../screens/main/restrooms/restroomDetails/RestroomComments';
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ChangePassword,
  EditProfile,
  SetRestroomInfo,
  PickRestroomLocation,
  PickRestroomImages,
  RestroomDetails,
  RestroomComments
});

const FeedsStack = createStackNavigator({
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
    activeTintColor: Colors.mainColor
  }
};

FeedsStack.navigationOptions = {
  tabBarLabel: 'Feeds',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'ios-list'} />,
  tabBarOptions: {
    activeTintColor: Colors.mainColor
  }
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    SettingsStack: FeedsStack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#333333'
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
