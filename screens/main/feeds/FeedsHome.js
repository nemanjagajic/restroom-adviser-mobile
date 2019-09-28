import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { getFeedRestrooms, resetFeedRestrooms } from '../../../store/actions/RestroomActions';
import {
  feedRestroomsSelector,
  feedRestroomsTotalNumberSelector,
  isFetchingFeedRestroomsSelector
} from '../../../store/selectors/RestroomSelector';
import FeedsList from '../../../components/feeds/FeedsList';
import { FETCHING_LIMIT } from '../../../constants/Restrooms';
import { Ionicons } from '@expo/vector-icons';

class FeedsHome extends Component {
  state = {
    offset: 0,
    searchValue: ''
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
      limit: FETCHING_LIMIT,
      searchValue: this.state.searchValue === '' ? null : this.state.searchValue
    });
    this.setState(prevState => ({ offset: prevState.offset + FETCHING_LIMIT }));
  };

  render() {
    const shouldShowIndicator =
      this.props.restrooms && this.props.restrooms.length === 0 && this.props.isFetchingRestrooms;

    return (
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchInputWrapper}>
            <TextInput
              style={styles.searchInput}
              onChangeText={text => this.setState({ searchValue: text })}
              value={this.state.searchValue}
            />
            <TouchableOpacity style={styles.searchButton} onPress={this.reloadRestrooms}>
              <Ionicons name="ios-search" color="#fff" size={25} />
            </TouchableOpacity>
          </View>
          <Text style={styles.numberOfRestroomsText}>
            {`Number of restrooms: ${this.props.restroomsTotalNumber}`}
          </Text>
        </View>
        {shouldShowIndicator && <ActivityIndicator style={styles.indicator} size="large" />}
        {this.props.restrooms && this.props.restrooms.length !== 0 ? (
          <FeedsList
            restrooms={this.props.restrooms}
            restroomsTotalNumber={this.props.restroomsTotalNumber}
            isFetchingRestrooms={this.props.isFetchingRestrooms}
            fetchNewIssues={this.handleFetchNewRestrooms}
            reloadRestrooms={this.reloadRestrooms}
            navigation={this.props.navigation}
          />
        ) : (
          <View style={styles.emptyListContainer} />
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
  emptyListContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  indicator: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 80
  },
  numberOfRestroomsText: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 5
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
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    height: 35,
    padding: 10,
    width: Dimensions.get('window').width * 0.7
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
