import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { getFeedRestrooms } from '../../../store/actions/RestroomActions';
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
    this.handleFetchNewIssues();
  }

  handleFetchNewIssues = () => {
    this.props.getFeedRestrooms({
      offset: this.state.offset,
      limit: FETCHING_LIMIT
    });
    this.setState(prevState => ({ offset: prevState.offset + FETCHING_LIMIT }));
  };

  render() {
    return (
      <View style={styles.container}>
        <FeedsList
          restrooms={this.props.restrooms}
          restroomsTotalNumber={this.props.restroomsTotalNumber}
          isFetchingRestrooms={this.props.isFetchingRestrooms}
          fetchNewIssues={this.handleFetchNewIssues}
        />
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
  restroomsTotalNumber: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => ({
  restrooms: feedRestroomsSelector(state),
  restroomsTotalNumber: feedRestroomsTotalNumberSelector(state),
  isFetchingRestrooms: isFetchingFeedRestroomsSelector(state)
});

const mapDispatchToProps = {
  getFeedRestrooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsHome);
