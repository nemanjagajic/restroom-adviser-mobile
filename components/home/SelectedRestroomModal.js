import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import Colors from '../../constants/Colors';
import ButtonCustom from '../shared/button/ButtonCustom';
import PropTypes from 'prop-types';

const SelectedRestroomModal = props => {
  return (
    <View style={styles.selectedRestroom}>
      <View style={styles.restroomDetails}>
        <Text style={styles.name}>{props.selectedRestroom.name}</Text>
        <Text style={styles.location}>{props.selectedRestroom.location_text}</Text>
        <View style={styles.voteStars}>
          {/*<Text style={styles.voteNumber}>{selectedRestroom.rating.totalRating}</Text>*/}
          <StarRating
            disabled={true}
            maxStars={5}
            // rating={selectedRestroom.rating.totalRating}
            starSize={18}
            emptyStarColor={Colors.mainColor}
            fullStarColor={Colors.mainColor}
          />
          <Text style={styles.numberOfVotes}>
            {/*{` (${selectedRestroom.rating.numberOfRatings} votes)`}*/}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <ButtonCustom
          title={'Open details'}
          onPress={() => props.openRestroomDetails(props.selectedRestroom.id)}
          style={styles.buttonOpen}
          textStyle={styles.buttonOpenText}
        />
        <ButtonCustom
          title={'Close'}
          onPress={props.clearSelectedRestroom}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

SelectedRestroomModal.propTypes = {
  selectedRestroom: PropTypes.object,
  openRestroomDetails: PropTypes.func,
  clearSelectedRestroom: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 5,
    padding: 10,
    zIndex: 1
  },
  buttonOpen: {
    backgroundColor: Colors.mainColor,
    borderRadius: 15,
    marginBottom: 5,
    marginRight: 5,
    padding: 10,
    zIndex: 1
  },
  buttonOpenText: {
    color: '#fff',
    fontSize: 14
  },
  buttonText: {
    color: '#999999',
    fontSize: 14
  },
  buttonsWrapper: {
    bottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    position: 'absolute',
    width: Dimensions.get('window').width * 0.95
  },
  location: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 5
  },
  name: {
    color: '#808080',
    fontSize: 18
  },
  numberOfVotes: {
    color: '#999999',
    fontSize: 12
  },
  restroomDetails: {
    marginLeft: 10,
    marginTop: 5
  },
  selectedRestroom: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    bottom: 5,
    elevation: 3,
    height: Dimensions.get('window').height * 0.2,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: Dimensions.get('window').width * 0.95,
    zIndex: 2
  },
  // voteNumber: {
  //   color: Colors.mainColor,
  //   marginRight: 5
  // },
  voteStars: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default SelectedRestroomModal;
