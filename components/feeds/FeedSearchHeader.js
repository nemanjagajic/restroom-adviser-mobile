import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import PropTypes from 'prop-types';

class FeedSearchHeader extends Component {
  render() {
    return (
      <View style={styles.searchWrapper}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder={'Search restrooms'}
            onChangeText={text => this.props.onChangeText(text)}
            value={this.props.searchValue}
            returnKeyType={'search'}
            onSubmitEditing={() => this.props.onSubmitEditing(this.props.searchValue)}
            clearButtonMode="always"
          />
          <TouchableOpacity
            style={
              this.props.appliedFilterRating ? styles.searchButtonApplied : styles.searchButton
            }
            onPress={this.props.onFilterButtonPressed}
          >
            <Ionicons name="ios-funnel" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
        <Text style={styles.numberOfRestroomsText}>
          {`Number of restrooms: ${this.props.restroomsTotalNumber}`}
        </Text>
      </View>
    );
  }
}

FeedSearchHeader.propTypes = {
  restroomsTotalNumber: PropTypes.number,
  appliedFilterRating: PropTypes.any,
  onFilterButtonPressed: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  searchValue: PropTypes.any,
  onChangeText: PropTypes.func
};

const styles = StyleSheet.create({
  numberOfRestroomsText: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 5
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 50,
    display: 'flex',
    height: 35,
    justifyContent: 'center',
    marginLeft: 5,
    width: 35
  },
  searchButtonApplied: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 50,
    display: 'flex',
    height: 35,
    justifyContent: 'center',
    marginLeft: 5,
    width: 35
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    height: 35,
    padding: 10,
    width: Dimensions.get('window').width * 0.8
  },
  searchInputWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  searchWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    height: 75,
    justifyContent: 'center',
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 1
  }
});

export default FeedSearchHeader;
