import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';

class FeedsList extends Component {
  state = {
    scrollFetchingDisabled: false
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  enableFetching = milliseconds => {
    setTimeout(() => this.setState({ scrollFetchingDisabled: false }), milliseconds);
  };

  handleScroll = ({ nativeEvent }) => {
    const shouldHandleScroll =
      this.isCloseToBottom(nativeEvent) &&
      !this.state.scrollFetchingDisabled &&
      !this.props.isFetchingRestrooms &&
      this.props.restrooms.length < this.props.restroomsTotalNumber;

    if (shouldHandleScroll) {
      this.setState({ scrollFetchingDisabled: true });
      this.enableFetching(400);
      this.props.fetchNewIssues();
    }
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.restrooms}
          keyExtractor={restroom => restroom.id.toString()}
          renderItem={({ item, index }) => (
            <FeedItem
              isFirst={index === 0}
              isLast={index === this.props.restrooms.length - 1}
              restroom={item}
              navigation={this.props.navigation}
            />
          )}
          onScroll={this.handleScroll}
          progressViewOffset={1000}
          refreshControl={<RefreshControl onRefresh={this.props.reloadRestrooms} />}
        />
        {this.props.isFetchingRestrooms && (
          <ActivityIndicator style={styles.indicator} size="large" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    bottom: 10,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: -1
  }
});

FeedsList.propTypes = {
  restrooms: PropTypes.array,
  isFetchingRestrooms: PropTypes.bool,
  fetchNewIssues: PropTypes.func,
  restroomsTotalNumber: PropTypes.number,
  reloadRestrooms: PropTypes.func,
  navigation: PropTypes.object
};

export default FeedsList;
