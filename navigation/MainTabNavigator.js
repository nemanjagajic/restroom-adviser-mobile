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
import RatingDetails from '../screens/main/restrooms/restroomDetails/RatingDetails';
import SetRestroomWorkingHours from '../screens/main/restrooms/addRestroom/SetRestroomWorkingHours';
import MyRestrooms from '../screens/main/restrooms/myRestrooms/MyRestrooms';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const FeedsStack = createStackNavigator({
  Feeds: {
    screen: FeedsHome,
    navigationOptions: ({ navigation }) => {
      const headerLeftNav = addHeaderLeftNavigator(navigation);
      return { ...headerLeftNav, title: 'Feeds' };
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
    FeedsStack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#333333'
      }
    },
    header: null
  }
);

const Drawer = createDrawerNavigator(
  {
    BottomTabNavigator: BottomTabNavigator
  },
  {
    contentComponent: LeftSliderScreen,
    navigationOptions: ({ navigation }) => {
      const headerLeftNav = addHeaderLeftNavigator(navigation);
      const headerRight = (
        <TouchableOpacity
          onPress={() => navigation.navigate('PickRestroomLocation')}
          style={styles.buttonHeaderRight}
        >
          <Text style={styles.buttonHeaderRightText}>Add restroom</Text>
        </TouchableOpacity>
      );
      return {
        ...headerLeftNav,
        headerRight,
        title: 'Home',
        headerTintColor: Colors.headerTintColor,
        headerStyle: {
          backgroundColor: '#fff'
        },
        cardStyle: {
          backgroundColor: 'transparent'
        }
      };
    }
  }
);

export default createStackNavigator(
  {
    Drawer,
    EditProfile,
    ChangePassword,
    SetRestroomInfo,
    SetRestroomWorkingHours,
    PickRestroomLocation,
    PickRestroomImages,
    RestroomDetails,
    RestroomComments,
    RatingDetails,
    MyRestrooms
  },
  {
    initialRouteName: 'Drawer'
  }
);

const styles = StyleSheet.create({
  buttonHeaderRight: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 15,
    display: 'flex',
    marginRight: 10,
    padding: 8,
    width: 110
  },
  buttonHeaderRightText: {
    color: '#fff'
  }
});
