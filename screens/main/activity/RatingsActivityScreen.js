import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import TabBarIcon from '../../../components/TabBarIcon';

class RatingsActivityScreen extends Component {
  static navigationOptions = {
    headerTitle: 'My Activity',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    },
    tabBarLabel: 'Ratings',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'ios-star-half'} />,
    tabBarOptions: {
      activeTintColor: Colors.mainColor
    }
  };

  render() {
    return (
      <View>
        <Text>Ratings</Text>
      </View>
    );
  }
}

export default RatingsActivityScreen;
