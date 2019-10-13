import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonCustom from '../shared/button/ButtonCustom';
import Colors from '../../constants/Colors';
import PropTypes from 'prop-types';

class FeedFiltersModal extends Component {
  render() {
    const ratings = [1, 2, 3, 4, 5];

    return (
      <View style={styles.filterModalWrapper}>
        <View style={styles.filterModal}>
          <Text style={styles.filterModalTitle}>Minimal rating:</Text>
          <View style={styles.minimalRatingWrapper}>
            {ratings.map(rating => (
              <TouchableOpacity
                style={
                  this.props.selectedFilterRating === rating
                    ? styles.ratingButtonSelected
                    : styles.ratingButton
                }
                key={rating}
                onPress={() => this.props.onSelectFilterRating(rating)}
              >
                <Text
                  style={this.props.selectedFilterRating === rating ? styles.white : styles.gray}
                >
                  {rating}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={
                !this.props.selectedFilterRating ? styles.ratingButtonSelected : styles.ratingButton
              }
              onPress={() => this.props.onSelectFilterRating(null)}
            >
              <Text style={!this.props.selectedFilterRating ? styles.white : styles.gray}>
                Show All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalButtons}>
            <ButtonCustom
              title={'Apply'}
              style={styles.modalButton}
              textStyle={styles.modalButtonText}
              onPress={this.props.onApplyFilters}
            />
            <ButtonCustom
              title={'Close'}
              onPress={this.props.onCloseFiltersModal}
              style={styles.modalButton}
              textStyle={styles.modalButtonText}
            />
          </View>
        </View>
      </View>
    );
  }
}

FeedFiltersModal.propTypes = {
  onSelectFilterRating: PropTypes.func,
  onCloseFiltersModal: PropTypes.func,
  selectedFilterRating: PropTypes.any,
  onApplyFilters: PropTypes.func
};

const styles = StyleSheet.create({
  filterModal: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    marginTop: 150,
    width: Dimensions.get('window').width * 0.9,
    zIndex: 2
  },
  filterModalTitle: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 10
  },
  filterModalWrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    flex: 1,
    height: Dimensions.get('window').height,
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 1
  },
  gray: {
    color: '#b3b3b3'
  },
  minimalRatingWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalButton: {
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    width: 100
  },
  modalButtonText: {
    alignSelf: 'center',
    color: '#808080'
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    width: Dimensions.get('window').width * 0.7
  },
  ratingButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    marginRight: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  ratingButtonSelected: {
    backgroundColor: Colors.mainColor,
    borderRadius: 50,
    marginRight: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  white: {
    color: '#fff'
  }
});

export default FeedFiltersModal;
