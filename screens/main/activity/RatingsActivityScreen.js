import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import TabBarIcon from '../../../components/TabBarIcon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  isFetchingMyRatingsSelector,
  isFetchingMyNewRatingsSelector,
  myRatingsSelector,
  myRatingsTotalNumberSelector
} from '../../../store/selectors/UserSelector';
import { getMyRatings } from '../../../store/actions/UserActions';
import { getRestroomRatings } from '../../../store/actions/RestroomActions';
import RatingsList from '../../../components/ratings/RatingsList';
import { FETCHING_LIMIT } from '../../../constants/Activity';

class RatingsActivityScreen extends Component {
  static navigationOptions = {
    headerTitle: 'My Activity',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    },
    tabBarLabel: 'Ratings',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'ios-star-half'} />,
    tabBarOptions: {
      activeTintColor: Colors.mainColor
    }
  };

  state = {
    offset: 0
  };

  componentDidMount() {
    this.reloadRatings();
  }

  reloadRatings = () => {
    this.setState({ offset: 0 }, () => this.handleFetchNewRatings(true));
  };

  handleFetchNewRatings = (isInitial = false) => {
    this.props.getMyRatings({
      offset: this.state.offset,
      limit: FETCHING_LIMIT,
      isInitial
    });
    this.setState(prevState => ({ offset: prevState.offset + FETCHING_LIMIT }));
  };

  renderHeader = () => <Text style={styles.title}>{'Ratings you have left'}</Text>;

  render() {
    return (
      <View style={styles.container}>
        <RatingsList
          ratings={this.props.ratings}
          ratingsTotalNumber={this.props.ratingsTotalNumber}
          isFetchingRatings={this.props.isFetchingRatings}
          isFetchingNewRatings={this.props.isFetchingNewRatings}
          fetchNewRatings={this.handleFetchNewRatings}
          reloadRatings={this.reloadRatings}
          headerComponent={this.renderHeader()}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

RatingsActivityScreen.propTypes = {
  getMyRatings: PropTypes.func,
  isFetchingRatings: PropTypes.bool,
  ratings: PropTypes.array,
  ratingsTotalNumber: PropTypes.number,
  isFetchingNewRatings: PropTypes.bool,
  navigation: PropTypes.object
};

const mapStateToProps = state => ({
  isFetchingRatings: isFetchingMyRatingsSelector(state),
  isFetchingNewRatings: isFetchingMyNewRatingsSelector(state),
  ratingsTotalNumber: myRatingsTotalNumberSelector(state),
  ratings: myRatingsSelector(state)
});

const mapDispatchToProps = {
  getMyRatings,
  getRestroomRatings
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: '#999',
    fontSize: 24,
    padding: 15,
    textAlign: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatingsActivityScreen);
