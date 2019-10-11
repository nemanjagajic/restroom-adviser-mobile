import React from 'react';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

export const addHeaderLeftNavigator = navigation => {
  const styles = {
    menuIcon: {
      marginLeft: 10,
      marginTop: 10,
      color: Colors.headerTintColor
    }
  };

  return {
    headerLeft: (
      <Icon.Ionicons
        name="ios-menu"
        size={24}
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={styles.menuIcon}
      />
    )
  };
};
