import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Colors from '../../../../constants/Colors';
import { userSelector } from '../../../../store/selectors/UserSelector';
import StarRating from 'react-native-star-rating';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';

class RatingDetails extends Component {
  state = {
    ratingWidths: [],
    myRating: 0,
    starCount: 0
  };

  componentDidMount() {
    this.setMyVote();
    this.populateChart();
  }

  populateChart = () => {
    const { ratings, numberOfRatings } = this.props.navigation.getParam('ratings');
    const singleItemPercentage = (Dimensions.get('window').width * 0.7) / numberOfRatings;
    const ratingWidths = [0, 0, 0, 0, 0];

    ratings.forEach(rating => {
      ratingWidths[rating.rating - 1] += singleItemPercentage;
    });

    this.setState({ ratingWidths });
  };

  setMyVote = () => {
    const { ratings } = this.props.navigation.getParam('ratings');

    const myVote = ratings.find(rating => rating.user_id === this.props.user.id);

    if (myVote) this.setState({ starCount: myVote.rating, myRating: myVote.rating });
  };

  render() {
    const { rating, numberOfRatings } = this.props.navigation.getParam('ratings');

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
          {this.state.myRating !== this.state.starCount && (
            <View style={styles.buttonsContainer}>
              <ButtonCustom
                style={styles.button}
                textStyle={styles.buttonText}
                title={'Set rating'}
                onPress={this.pickImage}
              />
              <ButtonCustom
                style={styles.button}
                textStyle={styles.buttonText}
                title={'Reset'}
                onPress={() => this.setState(prevState => ({ starCount: prevState.myRating }))}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

RatingDetails.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: userSelector(state)
});

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

export default connect(mapStateToProps)(RatingDetails);
