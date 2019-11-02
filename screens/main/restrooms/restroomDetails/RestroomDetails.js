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
import ContentLoader from 'react-native-content-loader';
import { Rect } from 'react-native-svg';
import config from '../../../../config';
import { Ionicons } from '@expo/vector-icons/build/Icons';
import Colors from '../../../../constants/Colors';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import {
  getIsOpenedRestroomBookmarked,
  getRestroomComments,
  getRestroomRatings,
  invalidateRestroom,
  setOpenedRestroomBookmarked,
  setOpenedRestroomNotBookmarked,
  unbookmarkRestroom,
  validateRestroom
} from '../../../../store/actions/RestroomActions';
import {
  restroomRatingsSelector,
  isFetchingRatingsSelector,
  restroomCommentsSelector,
  isFetchingCommentsSelector,
  commentsTotalNumberSelector,
  isOpenedRestroomBookmarkedSelector,
  isFetchingBookmarkInfoSelector,
  isAddingBookmarkInfoSelector,
  isFetchingRestroomValidationInfoSelector
} from '../../../../store/selectors/RestroomSelector';
import StarRating from 'react-native-star-rating';
import Swiper from 'react-native-swiper';
import { FETCHING_LIMIT } from '../../../../constants/Restrooms';
import { bookmarkRestroom } from '../../../../store/actions/RestroomActions';

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
    this.props.getIsOpenedRestroomBookmarked(restroom);
    this.props.getRestroomRatings(restroom);
    this.props.getRestroomComments({
      restroom: this.props.navigation.getParam('restroom'),
      offset: this.state.offset,
      limit: FETCHING_LIMIT,
      isInitial: true
    });
  }

  state = {
    currentImageIndex: 0
  };

  handleBookmarkPressed = () => {
    if (!this.props.isAddingBookmarkInfo) {
      if (this.props.isOpenedRestroomBookmarked) {
        this.props.setOpenedRestroomNotBookmarked();
        this.props.unbookmarkRestroom(this.props.navigation.getParam('restroom'));
      } else {
        this.props.setOpenedRestroomBookmarked();
        this.props.bookmarkRestroom(this.props.navigation.getParam('restroom'));
      }
    }
  };

  handleValidateRestroom = () => {
    if (!this.props.isFetchingRestroomValidationInfo) {
      this.props.validateRestroom(this.props.navigation.getParam('restroom'));
    }
  };

  handleInvalidateRestroom = () => {
    if (!this.props.isFetchingRestroomValidationInfo) {
      this.props.invalidateRestroom(this.props.navigation.getParam('restroom'));
    }
  };

  render() {
    const {
      name,
      description,
      location_text: locationText,
      images,
      working_hours
    } = this.props.navigation.getParam('restroom');
    const ratings = this.props.ratings;

    const workingHours = working_hours || 'not specified{,}not specified';
    const workingHoursTokens = workingHours.split('{,}');

    const isLoadingData =
      this.props.isFetchingRatings ||
      this.props.isFetchingComments ||
      this.props.isFetchingBookmarkInfo;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Swiper
          style={styles.imageSwiper}
          showsButtons={images.length > 1}
          activeDotColor={'#f5f5f5'}
          nextButton={<Ionicons name="ios-arrow-forward" color={'#f5f5f5'} size={30} />}
          prevButton={<Ionicons name="ios-arrow-back" color={'#f5f5f5'} size={30} />}
        >
          {images.length > 0 ? (
            images.map(image => (
              <Image
                style={styles.image}
                key={images[this.state.currentImageIndex].id}
                source={{
                  uri: `${config.IMAGE_BASE_URL}${image.path}`
                }}
              />
            ))
          ) : (
            <View style={styles.image}>
              <Ionicons name="md-images" color={'#ccc'} size={100} />
              <Text style={styles.noImagesText}>No images have been added for this restroom</Text>
            </View>
          )}
        </Swiper>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{locationText}</Text>
        {isLoadingData ? (
          <ContentLoader style={styles.contentLoader} height={240} duration={1000}>
            <Rect x="130" y="15" rx="10" ry="10" width="40" height="25" />
            <Rect x="40" y="45" rx="15" ry="15" width="220" height="50" />
            <Rect x="0" y="120" rx="10" ry="10" width="300" height="60" />
          </ContentLoader>
        ) : (
          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('RatingDetails', {
                  restroom: this.props.navigation.getParam('restroom')
                });
              }}
            >
              <View style={styles.ratings}>
                <Text style={styles.ratingsNumber}>{ratings.rating}</Text>
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
            <View style={styles.workingHoursWrapper}>
              <View style={styles.timeIconWrapper}>
                <Ionicons
                  style={styles.timeIcon}
                  name="md-time"
                  color={Colors.mainColor}
                  size={36}
                />
              </View>
              <Text style={styles.infoTextTop}>{'Monday to Friday'}</Text>
              <Text style={styles.infoTextBold}>{workingHoursTokens[0]}</Text>
              <Text style={styles.infoTextBottom}>{'Saturday'}</Text>
              <Text style={styles.infoTextBold}>{workingHoursTokens[1]}</Text>
              <Text style={styles.infoTextBottom}>{'Sunday'}</Text>
              <Text style={styles.infoTextBold}>{workingHoursTokens[2]}</Text>
            </View>
            <View>
              <Text style={styles.validateTitle}>Does this restroom exist?</Text>
              <View style={styles.buttonValidateWrapper}>
                <View>
                  <Text style={styles.validateNumber}>2</Text>
                  <ButtonCustom
                    style={styles.buttonValidate}
                    textStyle={styles.buttonText}
                    title={'Yes'}
                    onPress={this.handleValidateRestroom}
                  />
                </View>
                <View>
                  <Text style={styles.validateNumber}>0</Text>
                  <ButtonCustom
                    style={styles.buttonValidate}
                    textStyle={styles.buttonText}
                    title={'No'}
                    onPress={this.handleInvalidateRestroom}
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <ButtonCustom
                style={styles.buttonComment}
                textStyle={styles.buttonText}
                title={`Comments ${this.props.commentsTotalNumber}`}
                onPress={() =>
                  this.props.navigation.navigate('RestroomComments', {
                    restroom: this.props.navigation.getParam('restroom')
                  })
                }
              />
              <ButtonCustom
                style={styles.bookmarkButton}
                textStyle={styles.buttonText}
                title={this.props.isOpenedRestroomBookmarked ? 'Unbookmark' : 'Bookmark'}
                onPress={this.handleBookmarkPressed}
              />
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

RestroomDetails.propTypes = {
  navigation: PropTypes.object,
  getRestroomRatings: PropTypes.func,
  ratings: PropTypes.object,
  isFetchingRatings: PropTypes.bool,
  comments: PropTypes.array,
  isFetchingComments: PropTypes.bool,
  getRestroomComments: PropTypes.func,
  commentsTotalNumber: PropTypes.number,
  bookmarkRestroom: PropTypes.func,
  unbookmarkRestroom: PropTypes.func,
  getIsOpenedRestroomBookmarked: PropTypes.func,
  isOpenedRestroomBookmarked: PropTypes.bool,
  setOpenedRestroomBookmarked: PropTypes.func,
  setOpenedRestroomNotBookmarked: PropTypes.func,
  isFetchingBookmarkInfo: PropTypes.bool,
  isAddingBookmarkInfo: PropTypes.bool,
  isFetchingRestroomValidationInfo: PropTypes.bool,
  validateRestroom: PropTypes.func,
  invalidateRestroom: PropTypes.func
};

const mapStateToProps = state => ({
  ratings: restroomRatingsSelector(state),
  isFetchingRatings: isFetchingRatingsSelector(state),
  comments: restroomCommentsSelector(state),
  isFetchingComments: isFetchingCommentsSelector(state),
  commentsTotalNumber: commentsTotalNumberSelector(state),
  isOpenedRestroomBookmarked: isOpenedRestroomBookmarkedSelector(state),
  isFetchingBookmarkInfo: isFetchingBookmarkInfoSelector(state),
  isAddingBookmarkInfo: isAddingBookmarkInfoSelector(state),
  isFetchingRestroomValidationInfo: isFetchingRestroomValidationInfoSelector(state)
});

const mapDispatchToProps = {
  getRestroomRatings,
  getRestroomComments,
  bookmarkRestroom,
  unbookmarkRestroom,
  getIsOpenedRestroomBookmarked,
  setOpenedRestroomBookmarked,
  setOpenedRestroomNotBookmarked,
  validateRestroom,
  invalidateRestroom
};

const styles = StyleSheet.create({
  bookmarkButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderRadius: 30,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 10,
    padding: 10,
    width: 140
  },
  buttonComment: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderRadius: 30,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 5,
    padding: 10,
    width: 140
  },
  buttonText: {
    color: '#999'
  },
  buttonValidate: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    display: 'flex',
    elevation: 1,
    height: 30,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    width: 80
  },
  buttonValidateWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  buttonWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  container: {
    alignItems: 'center',
    display: 'flex'
  },
  contentContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  contentLoader: {
    marginBottom: 10,
    marginTop: 10
  },
  description: {
    color: '#808080',
    fontSize: 16
  },
  descriptionContainer: {
    backgroundColor: '#f7f7f7',
    borderColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 30,
    marginTop: 20,
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  emptyDescriptionText: {
    color: '#a6a6a6',
    fontStyle: 'italic'
  },
  image: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  imageSwiper: {
    backgroundColor: '#f2f2f2',
    height: 360,
    width: Dimensions.get('window').width
  },
  infoTextBold: {
    color: '#808080',
    fontSize: 14,
    textAlign: 'center'
  },
  infoTextBottom: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center'
  },
  infoTextTop: {
    color: '#b3b3b3',
    fontSize: 14,
    textAlign: 'center'
  },
  location: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: Colors.mainColor,
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 10,
    textAlign: 'center'
  },
  name: {
    color: '#808080',
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
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
  timeIconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 30,
    position: 'absolute',
    top: -18
  },
  validateNumber: {
    color: '#b3b3b3',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center'
  },
  validateTitle: {
    color: '#999',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  },
  workingHoursWrapper: {
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 25,
    width: Dimensions.get('window').width * 0.9
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestroomDetails);
