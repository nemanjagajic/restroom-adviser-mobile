import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import config from '../../config';
import Colors from '../../constants/Colors';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';

const FeedItem = props => {
  const { id, image, rating, name, location_text: locationText } = props.restroom;

  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Home', { selectedRestroomId: id })}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        { marginTop: props.isFirst ? 90 : 0 }
      ]}
    >
      {!image ? (
        <View style={styles.emptyImage}>
          <Ionicons name="md-images" color={'#fff'} size={50} />
        </View>
      ) : (
        <Image
          style={styles.image}
          key={image.id}
          source={{
            uri: `${config.IMAGE_BASE_URL}${image.path}`
          }}
        />
      )}
      <View style={styles.contentRight}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{locationText}</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={rating.totalRating}
          starSize={18}
          emptyStarColor={Colors.mainColor}
          fullStarColor={Colors.mainColor}
        />
        <Text style={styles.totalRating}>
          {' '}
          {`${rating.totalRating} (${rating.numberOfRatings} votes)`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

FeedItem.propTypes = {
  restroom: PropTypes.object,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e6e6e6',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 120,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width * 0.9
  },
  contentRight: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  emptyImage: {
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    display: 'flex',
    height: 118,
    justifyContent: 'center',
    width: 118
  },
  image: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 118,
    width: 118
  },
  location: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center'
  },
  name: {
    color: '#808080',
    fontSize: 14
  },
  totalRating: {
    color: Colors.mainColor,
    fontSize: 12
  }
});

export default FeedItem;
