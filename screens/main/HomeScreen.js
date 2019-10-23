import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHeaderLeftNavigator } from '../../helpers';
import { fetchRestrooms, getRestroomRatings } from '../../store/actions/RestroomActions';
import {
  isFetchingRatingsSelector,
  restroomRatingsSelector,
  restroomsSelector
} from '../../store/selectors/RestroomSelector';
import Colors from '../../constants/Colors';
import MapLocations from '../../components/map/MapLocations';
import SelectedRestroomModal from '../../components/home/SelectedRestroomModal';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    const headerRight = (
      <TouchableOpacity
        onPress={() => navigation.navigate('SetRestroomInfo')}
        style={styles.buttonHeaderRight}
      >
        <Text style={styles.buttonHeaderRightText}>Add restroom</Text>
      </TouchableOpacity>
    );
    return {
      ...headerLeftNav,
      headerRight,
      title: 'Home',
      headerTintColor: Colors.headerTintColor,
      headerStyle: {
        backgroundColor: '#fff'
      }
    };
  };

  state = {
    lastSelectedLocation: null
  };

  componentDidMount() {
    this.props.fetchRestrooms();
  }

  openRestroomDetails = restroomId => {
    const restroom = this.props.restrooms.find(restroom => restroom.id === restroomId);
    this.props.navigation.navigate('RestroomDetails', { restroom });
  };

  handleMarkerPressed = restroom => {
    const selectedRestroom = this.props.navigation.getParam('restroom');

    if (selectedRestroom && selectedRestroom.id === restroom.id) return;

    this.props.navigation.setParams({ restroom, from: 'HomeScreen' });
    this.props.getRestroomRatings(restroom, false);
  };

  clearSelectedRestroom = () => {
    const restroom = this.props.navigation.getParam('restroom');
    if (restroom !== null) {
      const lastSelectedLocation = {
        latitude: restroom.latitude,
        longitude: restroom.longitude
      };
      this.props.navigation.setParams({ restroom: null, from: 'HomeScreen' });
      this.setState({ lastSelectedLocation });
    }
  };

  getCenterLocation = () => {
    const selectedRestroom = this.props.navigation.getParam('restroom');
    const isSelectedFromFeeds = this.props.navigation.getParam('from') !== 'HomeScreen';

    if (selectedRestroom) {
      return isSelectedFromFeeds
        ? {
          latitude: selectedRestroom.latitude,
          longitude: selectedRestroom.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }
        : {
          latitude: selectedRestroom.latitude,
          longitude: selectedRestroom.longitude
        };
    }

    return this.props.navigation.getParam('centerLocation') || this.state.lastSelectedLocation;
  };

  render() {
    const selectedRestroom = this.props.navigation.getParam('restroom');

    return (
      <View style={styles.container}>
        <MapLocations
          restrooms={this.props.restrooms}
          selectedRestroomId={selectedRestroom ? selectedRestroom.id : -1}
          onMarkerPressed={this.handleMarkerPressed}
          centerLocation={this.getCenterLocation()}
        />
        {selectedRestroom && (
          <SelectedRestroomModal
            selectedRestroom={selectedRestroom}
            openRestroomDetails={this.openRestroomDetails}
            clearSelectedRestroom={this.clearSelectedRestroom}
            ratings={this.props.ratings}
            isFetchingRatings={this.props.isFetchingRatings}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ratings: restroomRatingsSelector(state),
  restrooms: restroomsSelector(state),
  isFetchingRatings: isFetchingRatingsSelector(state)
});

const mapDispatchToProps = {
  fetchRestrooms,
  getRestroomRatings
};

HomeScreen.propTypes = {
  fetchRestrooms: PropTypes.func,
  navigation: PropTypes.object,
  logout: PropTypes.func,
  restrooms: PropTypes.array,
  getRestroomRatings: PropTypes.func,
  ratings: PropTypes.object,
  isFetchingRatings: PropTypes.bool
};

const styles = StyleSheet.create({
  buttonHeaderRight: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
    display: 'flex',
    marginRight: 10,
    padding: 7,
    width: 110
  },
  buttonHeaderRightText: {
    color: '#fff'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
