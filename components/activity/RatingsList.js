import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons/build/Icons';
import Colors from '../../constants/Colors';
import RatingActivityItem from './RatingActivityItem';

class RatingsList extends Component {
  state = {
    scrollFetchingDisabled: false
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  };

  enableFetching = milliseconds => {
    setTimeout(() => this.setState({ scrollFetchingDisabled: false }), milliseconds);
  };

  handleScroll = ({ nativeEvent }) => {
    const shouldHandleScroll =
      this.isCloseToBottom(nativeEvent) &&
      !this.state.scrollFetchingDisabled &&
      !this.props.isFetchingNewRatings &&
      this.props.ratings.length < this.props.ratingsTotalNumber;

    if (shouldHandleScroll) {
      this.setState({ scrollFetchingDisabled: true });
      this.enableFetching(400);
      this.props.fetchNewRatings();
    }
  };

  renderFooter = () => {
    return (
      <View style={styles.indicatorPlaceholder}>
        {this.props.isFetchingNewRatings && <ActivityIndicator size="large" />}
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.container}
          data={this.props.ratings}
          renderItem={rating => (
            <RatingActivityItem {...rating} navigation={this.props.navigation} />
          )}
          keyExtractor={rating => rating.id.toString()}
          onScroll={this.handleScroll}
          progressViewOffset={1000}
          refreshControl={
            <RefreshControl
              progressViewOffset={this.props.headerComponent ? 80 : 0}
              refreshing={this.props.isFetchingRatings && !this.props.isFetchingNewRatings}
              onRefresh={this.props.reloadRatings}
              colors={[Colors.mainColor]}
            />
          }
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.props.headerComponent || null}
        />
        {this.props.ratings.length === 0 &&
          !this.props.isFetchingRatings && (
          <View style={styles.container}>
            <TouchableOpacity style={styles.emptyListIcon} onPress={this.props.reloadRatings}>
              <Ionicons name="ios-chatbubbles" color="#cccccc" size={40} />
              <Text style={styles.emptyListText}>No ratings added yet</Text>
              <Text style={styles.emptyListText}>tap to reload</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

RatingsList.propTypes = {
  ratings: PropTypes.array,
  getRestroomRatings: PropTypes.func,
  isFetchingRatings: PropTypes.bool,
  fetchNewRatings: PropTypes.func,
  ratingsTotalNumber: PropTypes.number,
  isFetchingNewRatings: PropTypes.bool,
  reloadRatings: PropTypes.func,
  headerComponent: PropTypes.any,
  navigation: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: Dimensions.get('window').width
  },
  emptyListIcon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15
  },
  emptyListText: {
    color: '#bfbfbf'
  },
  indicatorPlaceholder: {
    height: 50
  }
});

export default RatingsList;
