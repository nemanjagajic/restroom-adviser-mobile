import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Dimensions, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getFeedRestrooms, resetFeedRestrooms } from '../../../store/actions/RestroomActions';
import {
  feedRestroomsSelector,
  feedRestroomsTotalNumberSelector,
  isFetchingFeedRestroomsSelector,
  isFetchingNewFeedRestroomsSelector
} from '../../../store/selectors/RestroomSelector';
import FeedsList from '../../../components/feeds/FeedsList';
import { FETCHING_LIMIT } from '../../../constants/Restrooms';
import { Ionicons } from '@expo/vector-icons';
import ButtonCustom from '../../../components/shared/button/ButtonCustom';
import Colors from '../../../constants/Colors';

class FeedsHome extends Component {
  static navigationOptions = {
    headerTitle: 'Feeds',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  state = {
    offset: 0,
    searchValue: '',
    isFilterModalVisible: false,
    selectedFilterRating: null,
    appliedFilterRating: null
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

  handleApplyFilters = () => {
    this.setState(
      {
        appliedFilterRating: this.state.selectedFilterRating,
        isFilterModalVisible: false
      },
      () => this.reloadRestrooms()
    );
  };

  render() {
    const ratings = [1, 2, 3, 4, 5];

    return (
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchInputWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder={'Search restrooms'}
              onChangeText={text => this.setState({ searchValue: text })}
              value={this.state.searchValue}
              returnKeyType={'search'}
              onSubmitEditing={this.reloadRestrooms}
              clearButtonMode="always"
            />
            <TouchableOpacity
              style={
                this.state.appliedFilterRating ? styles.searchButtonApplied : styles.searchButton
              }
              onPress={() =>
                this.setState({
                  isFilterModalVisible: true,
                  selectedFilterRating: this.state.appliedFilterRating
                })
              }
            >
              <Ionicons name="ios-funnel" color="#fff" size={25} />
            </TouchableOpacity>
          </View>
          <Text style={styles.numberOfRestroomsText}>
            {`Number of restrooms: ${this.props.restroomsTotalNumber}`}
          </Text>
        </View>
        {!this.props.isFetchingRestrooms && this.props.restrooms.length === 0 ? (
          <View style={styles.emptyListContainer}>
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
            fetchNewIssues={this.handleFetchNewRestrooms}
            reloadRestrooms={this.reloadRestrooms}
            navigation={this.props.navigation}
          />
        )}
        {this.state.isFilterModalVisible && (
          <View style={styles.filterModalWrapper}>
            <View style={styles.filterModal}>
              <Text style={styles.filterModalTitle}>Minimal rating:</Text>
              <View style={styles.minimalRatingWrapper}>
                {ratings.map(rating => (
                  <TouchableOpacity
                    style={
                      this.state.selectedFilterRating === rating
                        ? styles.ratingButtonSelected
                        : styles.ratingButton
                    }
                    key={rating}
                    onPress={() => this.setState({ selectedFilterRating: rating })}
                  >
                    <Text
                      style={
                        this.state.selectedFilterRating === rating ? styles.white : styles.gray
                      }
                    >
                      {rating}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={
                    !this.state.selectedFilterRating
                      ? styles.ratingButtonSelected
                      : styles.ratingButton
                  }
                  onPress={() => this.setState({ selectedFilterRating: null })}
                >
                  <Text style={!this.state.selectedFilterRating ? styles.white : styles.gray}>
                    Show All
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButtons}>
                <ButtonCustom
                  title={'Apply'}
                  style={styles.modalButton}
                  textStyle={styles.modalButtonText}
                  onPress={this.handleApplyFilters}
                />
                <ButtonCustom
                  title={'Close'}
                  onPress={() => {
                    this.setState({ isFilterModalVisible: false, selectedFilterRating: null });
                  }}
                  style={styles.modalButton}
                  textStyle={styles.modalButtonText}
                />
              </View>
            </View>
          </View>
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
  isFetchingNewRestrooms: PropTypes.bool
};

const mapStateToProps = state => ({
  restrooms: feedRestroomsSelector(state),
  restroomsTotalNumber: feedRestroomsTotalNumberSelector(state),
  isFetchingRestrooms: isFetchingFeedRestroomsSelector(state),
  isFetchingNewRestrooms: isFetchingNewFeedRestroomsSelector(state)
});

const mapDispatchToProps = {
  getFeedRestrooms,
  resetFeedRestrooms
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  emptyList: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  emptyListContainer: {
    alignItems: 'center',
    display: 'flex',
    height: Dimensions.get('window').height,
    paddingTop: 200,
    width: Dimensions.get('window').width
  },
  emptyListText: {
    color: '#ccc'
  },
  filterModal: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    marginTop: 150,
    width: Dimensions.get('window').width * 0.9,
    zIndex: 2
  },
  filterModalTitle: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 10
  },
  filterModalWrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    flex: 1,
    height: Dimensions.get('window').height,
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 1
  },
  gray: {
    color: '#b3b3b3'
  },
  minimalRatingWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalButton: {
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    width: 100
  },
  modalButtonText: {
    alignSelf: 'center',
    color: '#808080'
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    width: Dimensions.get('window').width * 0.7
  },
  numberOfRestroomsText: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 5
  },
  ratingButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    marginRight: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  ratingButtonSelected: {
    backgroundColor: Colors.mainColor,
    borderRadius: 50,
    marginRight: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 50,
    display: 'flex',
    height: 35,
    justifyContent: 'center',
    marginLeft: 5,
    width: 35
  },
  searchButtonApplied: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 50,
    display: 'flex',
    height: 35,
    justifyContent: 'center',
    marginLeft: 5,
    width: 35
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    height: 35,
    padding: 10,
    width: Dimensions.get('window').width * 0.8
  },
  searchInputWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  searchWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    height: 75,
    justifyContent: 'center',
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 1
  },
  white: {
    color: '#fff'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsHome);
