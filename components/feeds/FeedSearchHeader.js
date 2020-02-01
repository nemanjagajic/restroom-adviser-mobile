import React from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import PropTypes from 'prop-types';
import * as Icon from '@expo/vector-icons';

const FeedSearchHeader = props => (
  <View style={styles.searchWrapper}>
    <View style={styles.searchInputWrapper}>
      <Icon.Ionicons name="ios-search" size={24} style={styles.searchIcon} color={'#808080'} />
      <TextInput
        style={styles.searchInput}
        placeholder={'Search toilets'}
        onChangeText={text => props.onChangeText(text)}
        value={props.searchValue}
        returnKeyType={'search'}
        onSubmitEditing={() => props.onSubmitEditing(props.searchValue)}
        clearButtonMode="always"
      />
      <TouchableOpacity
        style={props.appliedFilterRating ? styles.searchButtonApplied : styles.searchButton}
        onPress={props.onFilterButtonPressed}
      >
        <Ionicons name="ios-funnel" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  </View>
);

FeedSearchHeader.propTypes = {
  restroomsTotalNumber: PropTypes.number,
  appliedFilterRating: PropTypes.any,
  onFilterButtonPressed: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  searchValue: PropTypes.any,
  onChangeText: PropTypes.func
};

const styles = StyleSheet.create({
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 50,
    display: 'flex',
    height: 35,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: 35
  },
  searchButtonApplied: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 50,
    display: 'flex',
    height: 35,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: 35
  },
  searchIcon: {
    padding: 10
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 15,
    color: '#808080',
    flex: 1,
    fontSize: 16
  },
  searchInputWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    display: 'flex',
    elevation: 2,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
    zIndex: 2
  },
  searchWrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 10,
    width: Dimensions.get('window').width
  }
});

export default FeedSearchHeader;
