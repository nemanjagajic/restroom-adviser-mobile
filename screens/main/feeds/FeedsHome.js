import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { getFeedRestrooms, resetFeedRestrooms } from '../../../store/actions/RestroomActions';
import {
  feedRestroomsSelector,
  feedRestroomsTotalNumberSelector,
  isFetchingFeedRestroomsSelector
} from '../../../store/selectors/RestroomSelector';
import FeedsList from '../../../components/feeds/FeedsList';
import { FETCHING_LIMIT } from '../../../constants/Restrooms';

class FeedsHome extends Component {
  state = {
    offset: 0
  };

  componentDidMount() {
    this.handleFetchNewRestrooms();
  }

  reloadRestrooms = () => {
    this.props.resetFeedRestrooms();
    this.setState({ offset: 0 }, this.handleFetchNewRestrooms);
  };

  handleFetchNewRestrooms = () => {
    this.props.getFeedRestrooms({
      offset: this.state.offset,
      limit: FETCHING_LIMIT
    });
    this.setState(prevState => ({ offset: prevState.offset + FETCHING_LIMIT }));
  };

  render() {
    const shouldShowList =
      this.props.restrooms && this.props.restrooms.length === 0 && this.props.isFetchingRestrooms;

    return (
      <View style={styles.container}>
        {shouldShowList ? (
          <ActivityIndicator style={styles.indicator} size="large" />
        ) : (
          <FeedsList
            restrooms={this.props.restrooms}
            restroomsTotalNumber={this.props.restroomsTotalNumber}
            isFetchingRestrooms={this.props.isFetchingRestrooms}
            fetchNewIssues={this.handleFetchNewRestrooms}
            reloadRestrooms={this.reloadRestrooms}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}

FeedsHome.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  getFeedRestrooms: PropTypes.func,
  restrooms: PropTypes.array,
  isFetchingRestrooms: PropTypes.bool,
  restroomsTotalNumber: PropTypes.number,
  resetFeedRestrooms: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  indicator: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 20
  }
});

const mapStateToProps = state => ({
  restrooms: feedRestroomsSelector(state),
  restroomsTotalNumber: feedRestroomsTotalNumberSelector(state),
  isFetchingRestrooms: isFetchingFeedRestroomsSelector(state)
});

const mapDispatchToProps = {
  getFeedRestrooms,
  resetFeedRestrooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsHome);
