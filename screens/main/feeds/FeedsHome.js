import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  getFeedRestrooms,
  getRestroomRatings,
  resetFeedRestrooms
} from '../../../store/actions/RestroomActions';
import {
  feedRestroomsSelector,
  feedRestroomsTotalNumberSelector,
  isFetchingFeedRestroomsSelector,
  isFetchingNewFeedRestroomsSelector
} from '../../../store/selectors/RestroomSelector';
import FeedsList from '../../../components/feeds/FeedsList';
import { FETCHING_LIMIT } from '../../../constants/Restrooms';
import { Ionicons } from '@expo/vector-icons';
import FeedSearchHeader from '../../../components/feeds/FeedSearchHeader';
import FeedFiltersModal from '../../../components/feeds/FeedFiltersModal';

class FeedsHome extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    offset: 0,
    isFilterModalVisible: false,
    selectedFilterRating: null,
    appliedFilterRating: null,
    searchValue: ''
  };

  componentDidMount() {
    this.reloadRestrooms();
  }

  reloadRestrooms = () => {
    this.setState({ offset: 0 }, () => this.handleFetchNewRestrooms(true));
  };

  handleFetchNewRestrooms = (isInitial = false) => {
    this.props.getFeedRestrooms({
      offset: this.state.offset,
      limit: FETCHING_LIMIT,
      searchValue: this.state.searchValue === '' ? null : this.state.searchValue,
      minimalRating: this.state.appliedFilterRating,
      isInitial
    });
    this.setState(prevState => ({ offset: prevState.offset + FETCHING_LIMIT }));
  };

  handleApplyFilters = rating => {
    this.setState(
      {
        appliedFilterRating: rating,
        isFilterModalVisible: false
      },
      () => this.reloadRestrooms()
    );
  };

  handleFilterButtonPressed = () => {
    this.setState({
      isFilterModalVisible: true,
      selectedFilterRating: this.state.appliedFilterRating
    });
  };

  handleSelectFilterRating = rating => {
    this.setState({ selectedFilterRating: rating });
  };

  handleCloseFiltersModal = () => {
    this.setState({ isFilterModalVisible: false, selectedFilterRating: null });
  };

  handleSearchTextChange = text => {
    this.setState({ searchValue: text });
  };

  renderFilter = () => {
    const word1 = this.props.restroomsTotalNumber === 1 ? 'is' : 'are';
    const word2 = this.props.restroomsTotalNumber === 1 ? 'restroom' : 'restrooms';
    return (
      <View>
        <FeedSearchHeader
          restroomsTotalNumber={this.props.restroomsTotalNumber}
          appliedFilterRating={this.state.appliedFilterRating}
          onFilterButtonPressed={this.handleFilterButtonPressed}
          onSubmitEditing={this.reloadRestrooms}
          searchValue={this.state.searchValue}
          onChangeText={this.handleSearchTextChange}
        />
        <Text style={styles.searchDescription}>
          {this.props.isFetchingRestrooms
            ? 'Fetching restrooms...'
            : `There ${word1} ${this.props.restroomsTotalNumber} ${word2} matching your criteria`}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.props.isFetchingRestrooms && this.props.restrooms.length === 0 ? (
          <View style={styles.emptyListContainer}>
            {this.renderFilter()}
            {!this.props.isFetchingRestrooms && (
              <View style={styles.emptyList}>
                <Ionicons name="md-planet" color="#ccc" size={100} />
                <Text style={styles.emptyListText}>
                  {'There are no results that match your search'}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <FeedsList
            restrooms={this.props.restrooms}
            restroomsTotalNumber={this.props.restroomsTotalNumber}
            isFetchingRestrooms={this.props.isFetchingRestrooms}
            isFetchingNewRestrooms={this.props.isFetchingNewRestrooms}
            fetchNewFeeds={this.handleFetchNewRestrooms}
            reloadRestrooms={this.reloadRestrooms}
            navigation={this.props.navigation}
            getRestroomRatings={this.props.getRestroomRatings}
            headerComponent={this.renderFilter()}
          />
        )}
        {this.state.isFilterModalVisible && (
          <FeedFiltersModal
            onSelectFilterRating={this.handleSelectFilterRating}
            onCloseFiltersModal={this.handleCloseFiltersModal}
            selectedFilterRating={this.state.selectedFilterRating}
            onApplyFilters={this.handleApplyFilters}
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
  resetFeedRestrooms: PropTypes.func,
  isFetchingNewRestrooms: PropTypes.bool,
  getRestroomRatings: PropTypes.func
};

const mapStateToProps = state => ({
  restrooms: feedRestroomsSelector(state),
  restroomsTotalNumber: feedRestroomsTotalNumberSelector(state),
  isFetchingRestrooms: isFetchingFeedRestroomsSelector(state),
  isFetchingNewRestrooms: isFetchingNewFeedRestroomsSelector(state)
});

const mapDispatchToProps = {
  getFeedRestrooms,
  resetFeedRestrooms,
  getRestroomRatings
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  emptyList: {
    alignItems: 'center',
    flex: 1
  },
  emptyListContainer: {
    alignItems: 'center',
    display: 'flex',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  emptyListText: {
    color: '#ccc'
  },
  searchDescription: {
    color: '#bfbfbf',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsHome);
