import React, { PureComponent } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';
import Colors from '../../constants/Colors';

class FeedsList extends PureComponent {
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
      !this.props.isFetchingNewRestrooms &&
      this.props.restrooms.length < this.props.restroomsTotalNumber;

    if (shouldHandleScroll) {
      this.setState({ scrollFetchingDisabled: true });
      this.enableFetching(400);
      this.props.fetchNewFeeds();
    }
  };

  renderFooter = () => {
    return (
      <View style={styles.indicatorPlaceholder}>
        {this.props.isFetchingNewRestrooms && <ActivityIndicator size="large" />}
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.restrooms}
        keyExtractor={restroom => restroom.id.toString()}
        renderItem={({ item, index }) => (
          <FeedItem
            isFirst={index === 0}
            isLast={index === this.props.restrooms.length - 1}
            restroom={item}
            navigation={this.props.navigation}
            getRestroomRatings={this.props.getRestroomRatings}
          />
        )}
        onScroll={this.handleScroll}
        refreshControl={
          <RefreshControl
            progressViewOffset={this.props.indicatorOffset || 70}
            refreshing={this.props.isFetchingRestrooms && !this.props.isFetchingNewRestrooms}
            onRefresh={this.props.reloadRestrooms}
            colors={[Colors.mainColor]}
          />
        }
        ListFooterComponent={this.renderFooter}
        ListHeaderComponent={this.props.headerComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  indicatorPlaceholder: {
    height: 50
  }
});

FeedsList.propTypes = {
  restrooms: PropTypes.array,
  isFetchingRestrooms: PropTypes.bool,
  fetchNewFeeds: PropTypes.func,
  restroomsTotalNumber: PropTypes.number,
  reloadRestrooms: PropTypes.func,
  navigation: PropTypes.object,
  isFetchingNewRestrooms: PropTypes.bool,
  getRestroomRatings: PropTypes.func,
  headerComponent: PropTypes.any,
  indicatorOffset: PropTypes.any
};

export default FeedsList;
