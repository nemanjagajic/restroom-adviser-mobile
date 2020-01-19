import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Icon from '@expo/vector-icons';
import Colors from '../constants/Colors';

export const addHeaderLeftNavigator = navigation => {
  const styles = {
    menuIcon: {
      color: Colors.headerTintColor
    },
    iconWrapper: {
      paddingLeft: 15,
      paddingRight: 15
    }
  };

  return {
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={styles.iconWrapper}
      >
        <Icon.Ionicons name="ios-menu" size={24} style={styles.menuIcon} />
      </TouchableOpacity>
    )
  };
};
