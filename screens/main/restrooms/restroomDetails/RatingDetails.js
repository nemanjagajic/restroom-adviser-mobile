import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import Colors from '../../../../constants/Colors';
import { userSelector } from '../../../../store/selectors/UserSelector';
import StarRating from 'react-native-star-rating';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import {
  isAddingRatingSelector,
  restroomRatingsSelector
} from '../../../../store/selectors/RestroomSelector';
import { addRestroomRating } from '../../../../store/actions/RestroomActions';

class RatingDetails extends Component {
  state = {
    ratingWidths: [],
    starCount: 0
  };

  componentDidMount() {
    this.setMyVote();
    this.populateChart();
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
    const { rating, numberOfRatings, myRating } = this.props.ratings;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{this.props.navigation.getParam('restroomName')}</Text>
        <Text style={styles.ratingsNumber}>{rating}</Text>
        <Text style={styles.usersVotedText}>
          {numberOfRatings !== 1
            ? `${numberOfRatings} users voted`
            : `${numberOfRatings} user voted`}
        </Text>
        <View style={styles.ratingsChart}>
          {this.state.ratingWidths.map((ratingWidth, index) => (
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
              {this.props.isAddingRating ? (
                <ActivityIndicator
                  style={styles.loading}
                  animating={this.state.loader}
                  size="large"
                />
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
  isAddingRating: PropTypes.bool
};

const mapStateToProps = state => ({
  user: userSelector(state),
  ratings: restroomRatingsSelector(state),
  isAddingRating: isAddingRatingSelector(state)
});

const mapDispatchToProps = {
  addRestroomRating
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
    color: '#808080',
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
