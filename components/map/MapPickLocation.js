import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Icon, Location, MapView, Permissions } from 'expo';
import mapMarkerIcon from '../../assets/images/map-marker-icon-filled.png';
import PropTypes from 'prop-types';

class MapPickLocation extends Component {
  static navigationOptions = {
    headerTitle: 'Pick restroom location'
  };

  state = {
    focusedLocation: null,
    hasLocationPermissions: false,
    locationResult: null,
    locationInfo: null,
    searchInput: ''
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied'
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    this.setState(
      {
        focusedLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }
      },
      () => this.setLocationInformation(this.state.focusedLocation)
    );
  };

  handleRegionChanged = region => {
    this.setState(
      prevState => ({
        focusedLocation: {
          ...prevState,
          latitude: region.latitude,
          longitude: region.longitude
        }
      }),
      () => this.props.onFocusedLocationChanged(this.state.focusedLocation)
    );

    this.setLocationInformation();
  };

  async setLocationInformation() {
    const { latitude, longitude } = this.state.focusedLocation;
    let locationInfo = await Location.reverseGeocodeAsync({ latitude, longitude });

    this.setState({ locationInfo: this.getFormattedLocationInfo(locationInfo[0]) }, () => {
      this.props.onLocationInfoChanged(this.state.locationInfo);
    });
  }

  getFormattedLocationInfo = locationInfo => {
    const { street, name, city, country } = locationInfo;
    return `${street} ${name} ${city} ${country}`;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.locationResult === null ? (
          <View style={styles.map}>
            <Text>Finding your current location...</Text>
          </View>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>Location permissions are not granted.</Text>
        ) : this.state.focusedLocation === null ? (
          <Text>Map region does not exist.</Text>
        ) : (
          <View style={styles.map}>
            <MapView
              style={styles.map}
              initialRegion={{
                ...this.state.focusedLocation,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015
              }}
              onRegionChangeComplete={this.handleRegionChanged}
            />
            <View style={styles.markerFixed}>
              <Image source={mapMarkerIcon} style={styles.mapMarkerIcon} />
            </View>
          </View>
        )}
        <View style={styles.locationSearchWrapper}>
          <View style={styles.searchInputWrapper}>
            <Icon.Ionicons
              name="ios-search"
              size={24}
              style={styles.searchIcon}
              color={'#808080'}
            />
            <TextInput
              style={styles.locationTextInput}
              onChangeText={text => this.setState({ searchInput: text })}
              value={this.state.searchInput}
              placeholder={'Search places, cafes, restaurants, streets...'}
              returnKeyType={'search'}
              onSubmitEditing={() => this.props.onSubmitEditing(this.state.searchInput)}
            />
          </View>
          <View style={styles.suggestionsWrapper} />
        </View>
      </View>
    );
  }
}

MapPickLocation.propTypes = {
  onFocusedLocationChanged: PropTypes.func,
  onLocationInfoChanged: PropTypes.func,
  onSubmitEditing: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex'
  },
  locationSearchWrapper: {
    borderRadius: 20,
    marginTop: 15,
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    zIndex: 2
  },
  locationTextInput: {
    color: '#808080',
    flex: 1
  },
  map: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    display: 'flex',
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'center',
    width: Dimensions.get('window').width
  },
  mapMarkerIcon: {
    height: 40,
    width: 27
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  searchIcon: {
    padding: 10
  },
  searchInputWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    display: 'flex',
    elevation: 3,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: Dimensions.get('window').width * 0.9,
    zIndex: 2
  },
  suggestionsWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    elevation: 3,
    flexDirection: 'row',
    height: 200,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: Dimensions.get('window').width * 0.9
  }
});

export default MapPickLocation;
