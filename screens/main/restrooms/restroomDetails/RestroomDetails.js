import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import config from '../../../../config';
import { Ionicons } from '@expo/vector-icons/build/Icons';
import Colors from '../../../../constants/Colors';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import { getRestroomRatings } from '../../../../store/actions/RestroomActions';
import {
  restroomRatingsSelector,
  isFetchingRatingsSelector
} from '../../../../store/selectors/RestroomSelector';
import StarRating from 'react-native-star-rating';

class RestroomDetails extends Component {
  static navigationOptions = {
    headerTitle: 'Restroom details',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  componentDidMount() {
    const restroom = this.props.navigation.getParam('restroom');
    this.props.getRestroomRatings(restroom);
  }

  state = {
    currentImageIndex: 0
  };

  handleImageBack = () => {
    if (this.state.currentImageIndex > 0) {
      this.setState(prevState => ({ currentImageIndex: prevState.currentImageIndex - 1 }));
    }
  };

  handleImageForward = () => {
    const images = this.props.navigation.getParam('restroom').images;

    if (this.state.currentImageIndex < images.length - 1) {
      this.setState(prevState => ({ currentImageIndex: prevState.currentImageIndex + 1 }));
    }
  };

  render() {
    const {
      name,
      description,
      location_text: locationText,
      images
    } = this.props.navigation.getParam('restroom');
    const ratings = this.props.ratings;
    const isFetchingRatings = this.props.isFetchingRatings;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imagePreview}>
          <View style={styles.imageGallery}>
            <TouchableOpacity style={styles.imageArrows} onPress={this.handleImageBack}>
              <Ionicons
                name="ios-arrow-back"
                color={this.state.currentImageIndex > 0 ? Colors.mainColor : '#b3b3b3'}
                size={30}
              />
            </TouchableOpacity>
            {images.length > 0 ? (
              <Image
                style={styles.image}
                key={images[this.state.currentImageIndex].id}
                source={{
                  uri: `${config.IMAGE_BASE_URL}${images[this.state.currentImageIndex].path}`
                }}
              />
            ) : (
              <View style={styles.noImages}>
                <Ionicons name="md-images" color={'#ccc'} size={100} />
                <Text style={styles.noImagesText}>No images have been added for this restroom</Text>
              </View>
            )}
            <TouchableOpacity style={styles.imageArrows} onPress={this.handleImageForward}>
              <Ionicons
                name="ios-arrow-forward"
                color={
                  this.state.currentImageIndex < images.length - 1 ? Colors.mainColor : '#b3b3b3'
                }
                size={30}
              />
            </TouchableOpacity>
          </View>
          {images.length > 0 && (
            <Text style={styles.imageNumberIndicator}>
              {`${this.state.currentImageIndex + 1}/${images.length}`}
            </Text>
          )}
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{locationText}</Text>
        <TouchableOpacity
          onPress={() => {
            if (!isFetchingRatings) {
              this.props.navigation.navigate('RatingDetails', {
                restroom: this.props.navigation.getParam('restroom')
              });
            }
          }}
        >
          {!isFetchingRatings ? (
            <View style={styles.ratings}>
              {ratings.rating !== 0 ? (
                <Text style={styles.ratingsNumber}>{ratings.rating}</Text>
              ) : (
                <Text style={styles.ratingsTitle}>No ratings left yet</Text>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={ratings.rating}
                starSize={32}
                emptyStarColor={Colors.mainColor}
                fullStarColor={Colors.mainColor}
              />
              <Text style={styles.ratingsText}>Tap to open voting or view rating details</Text>
            </View>
          ) : (
            <View style={styles.ratings}>
              <Text style={styles.ratingsTitle}>Fetching rating...</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={0}
                starSize={32}
                emptyStarColor={Colors.mainColor}
                fullStarColor={Colors.mainColor}
              />
              <Text style={styles.ratingsText}>Tap to open voting or view rating details</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {description || (
              <Text style={styles.emptyDescriptionText}>
                {'Description hasn\'t been written for this restroom'}
              </Text>
            )}
          </Text>
        </View>
        <ButtonCustom
          style={styles.buttonComment}
          textStyle={styles.buttonCommentText}
          title={'Open comments (4)'}
          onPress={() =>
            this.props.navigation.navigate('RestroomComments', {
              restroom: this.props.navigation.getParam('restroom')
            })
          }
        />
      </ScrollView>
    );
  }
}

RestroomDetails.propTypes = {
  navigation: PropTypes.object,
  getRestroomRatings: PropTypes.func,
  ratings: PropTypes.object,
  isFetchingRatings: PropTypes.bool
};

const mapStateToProps = state => ({
  ratings: restroomRatingsSelector(state),
  isFetchingRatings: isFetchingRatingsSelector(state)
});

const mapDispatchToProps = {
  getRestroomRatings
};

const styles = StyleSheet.create({
  buttonComment: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 30,
    borderWidth: 1,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
    width: 200
  },
  buttonCommentText: {
    color: '#999999'
  },
  container: {
    alignItems: 'center',
    display: 'flex'
  },
  description: {
    color: '#808080',
    fontSize: 16
  },
  descriptionContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  emptyDescriptionText: {
    color: '#a6a6a6',
    fontStyle: 'italic'
  },
  image: {
    borderRadius: 10,
    height: 300,
    marginLeft: 10,
    marginRight: 10,
    width: 225
  },
  imageArrows: {
    padding: 20
  },
  imageGallery: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageNumberIndicator: {
    color: '#808080',
    marginTop: 10
  },
  imagePreview: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    height: 360,
    justifyContent: 'center'
  },
  location: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: Colors.mainColor,
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 10
  },
  name: {
    color: '#808080',
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  noImages: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    height: 300,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    width: 225
  },
  noImagesText: {
    color: '#b3b3b3',
    textAlign: 'center'
  },
  ratings: {
    marginTop: 15
  },
  ratingsNumber: {
    color: '#999999',
    fontSize: 20,
    height: 30,
    textAlign: 'center'
  },
  ratingsText: {
    color: '#999999',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center'
  },
  ratingsTitle: {
    color: '#999999',
    fontSize: 16,
    height: 30,
    marginTop: 5,
    textAlign: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestroomDetails);
