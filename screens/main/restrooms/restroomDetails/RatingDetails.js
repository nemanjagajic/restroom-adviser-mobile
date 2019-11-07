import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import Colors from '../../../../constants/Colors';
import { userSelector } from '../../../../store/selectors/UserSelector';
import StarRating from 'react-native-star-rating';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import {
  isAddingRatingSelector,
  isFetchingRatingsSelector,
  restroomRatingsSelector
} from '../../../../store/selectors/RestroomSelector';
import { addRestroomRating, getRestroomRatings } from '../../../../store/actions/RestroomActions';

class RatingDetails extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Rating details',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  state = {
    ratingWidths: [],
    starCount: 0,
    isInitiallyFetching: false
  };

  componentDidMount() {
    if (this.props.navigation.getParam('isFromActivity')) {
      this.setState({ isInitiallyFetching: true }, () => {
        const restroom = this.props.navigation.getParam('restroom');
        this.props.getRestroomRatings(restroom, true, () => {
          this.setMyVote();
          this.populateChart();
          this.setState({ isInitiallyFetching: false });
        });
      });
    } else {
      this.setMyVote();
      this.populateChart();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ratings !== this.props.ratings) {
      this.populateChart();
    }
  }

  populateChart = () => {
    const { ratings, numberOfRatings } = this.props.ratings;
    const singleItemPercentage = (Dimensions.get('window').width * 0.7) / numberOfRatings;
    const ratingWidths = [0, 0, 0, 0, 0];

    ratings.forEach(rating => {
      ratingWidths[rating.rating - 1] += singleItemPercentage;
    });

    this.setState({ ratingWidths });
  };

  setMyVote = () => {
    const { myRating } = this.props.ratings;
    this.setState({ starCount: myRating });
  };

  addRating = () => {
    this.props.addRestroomRating({
      restroom: this.props.navigation.getParam('restroom'),
      rating: this.state.starCount
    });
  };

  render() {
    const restroom = this.props.navigation.getParam('restroom');
    const { rating, numberOfRatings, myRating } = this.props.ratings;
    const emptyRatings = [0, 0, 0, 0, 0];

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.name}>{restroom.name}</Text>
          <Text style={styles.ratingsNumber}>{this.state.isInitiallyFetching ? '' : rating}</Text>
          {this.state.isInitiallyFetching ? (
            <View style={styles.usersVotedText} />
          ) : (
            <Text style={styles.usersVotedText}>
              {numberOfRatings !== 1
                ? `${numberOfRatings} users voted`
                : `${numberOfRatings} user voted`}
            </Text>
          )}
        </View>

        <View style={styles.ratingsChart}>
          {this.state.ratingWidths.length > 0
            ? this.state.ratingWidths.map((ratingWidth, index) => (
              <View style={styles.lineWrapper} key={index}>
                <Text style={styles.ratingText}>{index + 1}</Text>
                <View style={[styles.line, { width: Dimensions.get('window').width * 0.7 }]}>
                  <View style={[styles.lineGreen, { width: ratingWidth }]} />
                </View>
              </View>
            ))
            : emptyRatings.map((ratingWidth, index) => (
              <View style={styles.lineWrapper} key={index}>
                <Text style={styles.ratingText}>{index + 1}</Text>
                <View style={[styles.line, { width: Dimensions.get('window').width * 0.7 }]}>
                  <View style={[styles.lineGreen, { width: ratingWidth }]} />
                </View>
              </View>
            ))}
        </View>
        <View style={styles.myRatingContainer}>
          <Text style={styles.myRatingTitle}>Your rating</Text>
          <StarRating
            disabled={false}
            selectedStar={selectedRating => this.setState({ starCount: selectedRating })}
            maxStars={5}
            rating={this.state.starCount}
            starSize={32}
            emptyStarColor={Colors.mainColor}
            fullStarColor={Colors.mainColor}
            containerStyle={styles.stars}
          />
          {myRating !== this.state.starCount && (
            <View>
              {this.props.isAddingRating || this.props.isFetchingRatings ? (
                <View>
                  <ActivityIndicator
                    style={styles.loading}
                    animating={this.state.loader}
                    size="large"
                  />
                  <Text style={styles.indicatorText}>
                    {this.props.isAddingRating ? 'Adding rating...' : 'Fetching ratings...'}
                  </Text>
                </View>
              ) : (
                <View style={styles.buttonsContainer}>
                  <ButtonCustom
                    style={styles.button}
                    textStyle={styles.buttonText}
                    title={'Set rating'}
                    onPress={this.addRating}
                  />
                  <ButtonCustom
                    style={styles.button}
                    textStyle={styles.buttonText}
                    title={'Reset'}
                    onPress={() => this.setState({ starCount: myRating })}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

RatingDetails.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  ratings: PropTypes.object,
  addRestroomRating: PropTypes.func,
  isAddingRating: PropTypes.bool,
  isFetchingRatings: PropTypes.bool,
  getRestroomRatings: PropTypes.func,
  restroom: PropTypes.object
};

const mapStateToProps = state => ({
  user: userSelector(state),
  ratings: restroomRatingsSelector(state),
  isAddingRating: isAddingRatingSelector(state),
  isFetchingRatings: isFetchingRatingsSelector(state)
});

const mapDispatchToProps = {
  addRestroomRating,
  getRestroomRatings
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 30,
    borderWidth: 1,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginBottom: 30,
    width: 120
  },
  buttonText: {
    color: Colors.mainColor
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: 260
  },
  container: {
    alignItems: 'center',
    display: 'flex'
  },
  indicatorText: {
    color: '#999999',
    marginTop: 10
  },
  line: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    height: 10,
    marginLeft: 10
  },
  lineGreen: {
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
    height: 10
  },
  lineWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  loading: {
    marginTop: 5
  },
  myRatingContainer: {
    alignItems: 'center',
    display: 'flex'
  },
  myRatingTitle: {
    color: '#999999',
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center'
  },
  name: {
    color: '#999',
    fontSize: 24,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    textAlign: 'center'
  },
  ratingText: {
    color: '#808080',
    fontSize: 20
  },
  ratingsChart: {
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    width: Dimensions.get('window').width * 0.9
  },
  ratingsNumber: {
    color: Colors.mainColor,
    fontSize: 28,
    height: 30,
    marginBottom: 5,
    textAlign: 'center'
  },
  stars: {
    width: 200
  },
  usersVotedText: {
    color: '#999999',
    fontSize: 16,
    height: 30,
    textAlign: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatingDetails);
