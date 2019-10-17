import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import config from '../../config';
import Colors from '../../constants/Colors';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'expo';

const FeedItem = props => {
  const { image, rating, name, location_text: locationText } = props.restroom;

  return (
    <View
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
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home', { restroom: props.restroom })}
        style={styles.open}
      >
        <Icon.Ionicons name="md-open" size={22} style={styles.icon} color={'#ccc'} />
      </TouchableOpacity>
      <View style={styles.contentBottom}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{locationText}</Text>
        <View style={styles.voteWrapper}>
          <View style={styles.voteStars}>
            <Text style={styles.voteNumber}>{rating.totalRating}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={rating.totalRating}
              starSize={18}
              emptyStarColor={Colors.mainColor}
              fullStarColor={Colors.mainColor}
            />
          </View>
          <Text style={styles.numberOfVotes}>{`${rating.numberOfRatings} votes`}</Text>
        </View>
      </View>
    </View>
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
    display: 'flex',
    height: 230,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width * 0.9
  },
  contentBottom: {
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5
  },
  emptyImage: {
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    display: 'flex',
    height: 140,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 140,
    width: Dimensions.get('window').width * 0.9
  },
  location: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 5
  },
  name: {
    color: '#808080',
    fontSize: 16
  },
  numberOfVotes: {
    color: '#999999',
    fontSize: 12
  },
  open: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#cccccc',
    borderRadius: 50,
    borderWidth: 1,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 125,
    width: 40,
    zIndex: 1
  },
  voteNumber: {
    color: Colors.mainColor,
    marginRight: 5
  },
  voteStars: {
    display: 'flex',
    flexDirection: 'row'
  },
  voteWrapper: {
    bottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9
  }
});

export default FeedItem;
