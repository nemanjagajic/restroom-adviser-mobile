import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import FeedsList from '../../../../components/feeds/FeedsList';
import { FETCHING_LIMIT } from '../../../../constants/Restrooms';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import FeedSearchHeader from '../../../../components/feeds/FeedSearchHeader';
import FeedFiltersModal from '../../../../components/feeds/FeedFiltersModal';
import {
  getMyFeedRestrooms,
  getRestroomRatings,
  resetMyFeedRestrooms
} from '../../../../store/actions/RestroomActions';
import {
  isFetchingMyFeedRestroomsSelector,
  isFetchingMyNewFeedRestroomsSelector,
  myFeedRestroomsSelector,
  myFeedRestroomsTotalNumberSelector
} from '../../../../store/selectors/RestroomSelector';

class MyRestrooms extends PureComponent {
  static navigationOptions = {
    headerTitle: 'My toilets',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
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
    this.props.getMyFeedRestrooms({
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
    const word2 = this.props.restroomsTotalNumber === 1 ? 'toilet' : 'toilets';
    return (
      <View>
        <Text style={styles.title}>{'Toilets you have added'}</Text>
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
            ? 'Fetching toilets...'
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
            indicatorOffset={125}
            fromScreen={'MyRestrooms'}
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

MyRestrooms.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  getMyFeedRestrooms: PropTypes.func,
  restrooms: PropTypes.array,
  isFetchingRestrooms: PropTypes.bool,
  restroomsTotalNumber: PropTypes.number,
  resetMyFeedRestrooms: PropTypes.func,
  isFetchingNewRestrooms: PropTypes.bool,
  getRestroomRatings: PropTypes.func
};

const mapStateToProps = state => ({
  restrooms: myFeedRestroomsSelector(state),
  restroomsTotalNumber: myFeedRestroomsTotalNumberSelector(state),
  isFetchingRestrooms: isFetchingMyFeedRestroomsSelector(state),
  isFetchingNewRestrooms: isFetchingMyNewFeedRestroomsSelector(state)
});

const mapDispatchToProps = {
  getMyFeedRestrooms,
  resetMyFeedRestrooms,
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
)(MyRestrooms);
