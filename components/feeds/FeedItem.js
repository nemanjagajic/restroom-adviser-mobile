import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation';
import PropTypes from 'prop-types';
import config from '../../config';
import Colors from '../../constants/Colors';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import * as Icon from '@expo/vector-icons';
import { restroomsSelector } from '../../store/selectors/RestroomSelector';

class FeedItem extends PureComponent {
  openRestroomDetails = () => {
    const restroom = this.props.restrooms.find(restroom => restroom.id === this.props.restroom.id);
    this.props.navigation.navigate('RestroomDetails', { restroom });
  };

  openRestroomOnMap = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.getRestroomRatings(this.props.restroom, false);
    this.props.navigation.navigate('Home', {
      restroom: this.props.restroom,
      from: 'FeedItem',
      fromScreen: this.props.fromScreen
    });
  };

  render() {
    const { image, rating, name, location_text: locationText } = this.props.restroom;

    return (
      <TouchableOpacity
        onPress={this.openRestroomDetails}
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          { marginTop: this.props.isFirst ? 10 : 0 }
        ]}
        activeOpacity={1}
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
          onPress={this.openRestroomOnMap}
          style={styles.open}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon.Ionicons name="md-pin" size={22} style={styles.icon} color={'#ccc'} />
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
      </TouchableOpacity>
    );
  }
}

FeedItem.propTypes = {
  restroom: PropTypes.object,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  navigation: PropTypes.object,
  getRestroomRatings: PropTypes.func,
  restrooms: PropTypes.array,
  fromScreen: PropTypes.string
};

const mapStateToProps = state => ({
  restrooms: restroomsSelector(state)
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 250,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width * 0.9
  },
  contentBottom: {
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    borderLeftWidth: 1,
    borderRightWidth: 1,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    height: 160,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 160,
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
    borderRadius: 100,
    display: 'flex',
    elevation: 3,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    top: 145,
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

export default connect(mapStateToProps)(FeedItem);
