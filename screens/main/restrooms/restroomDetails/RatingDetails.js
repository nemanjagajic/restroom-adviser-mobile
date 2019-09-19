import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../constants/Colors';

class RatingDetails extends Component {
  state = {
    ratingWidth: []
  };

  componentDidMount() {
    this.populateChart();
  }

  populateChart = () => {
    const { ratings, numberOfRatings } = this.props.navigation.getParam('ratings');
    const singleItemPercentage = (Dimensions.get('window').width * 0.7) / numberOfRatings;
    const ratingWidth = [0, 0, 0, 0, 0];

    ratings.forEach(rating => {
      ratingWidth[rating.rating - 1] += singleItemPercentage;
    });

    this.setState({ ratingWidth });
  };

  render() {
    const { rating, numberOfRatings } = this.props.navigation.getParam('ratings');

    return (
      <View style={styles.container}>
        <Text style={styles.name}>{this.props.navigation.getParam('restroomName')}</Text>
        <Text style={styles.ratingsNumber}>{rating}</Text>
        <Text style={styles.usersVotedText}>
          {numberOfRatings !== 1
            ? `${numberOfRatings} users voted`
            : `${numberOfRatings} user voted`}
        </Text>
        <View style={styles.ratingsChart}>
          {this.state.ratingWidth.map((ratingWidth, index) => (
            <View style={styles.lineWrapper} key={index}>
              <Text style={styles.ratingText}>{index + 1}</Text>
              <View style={[styles.line, { width: Dimensions.get('window').width * 0.7 }]}>
                <View style={[styles.lineGreen, { width: ratingWidth }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

RatingDetails.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
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
    borderRadius: 10,
    marginTop: 40,
    width: Dimensions.get('window').width * 0.9
  },
  ratingsNumber: {
    color: Colors.mainColor,
    fontSize: 28,
    height: 30,
    marginBottom: 5,
    textAlign: 'center'
  },
  usersVotedText: {
    color: '#999999',
    fontSize: 16,
    height: 30,
    textAlign: 'center'
  }
});

export default RatingDetails;
