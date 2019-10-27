import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
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
    setTimeout(() => {
      this.getLocationAsync();
    }, 500);
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

  handleSuggestionPressed = suggestion => {
    const displayName = suggestion.displayName.split(',');

    this.setState(
      {
        focusedLocation: {
          longitude: suggestion.coordinates[0],
          latitude: suggestion.coordinates[1],
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        },
        searchInput: `${displayName[0].trim()}, ${displayName[1].trim()}`
      },
      () => {
        this.props.onFocusedLocationChanged(this.state.focusedLocation);
        this.props.setOsmSuggestions([]);
      }
    );
  };

  renderSuggestions = () => {
    return (
      <FlatList
        data={this.props.osmSuggestions}
        keyExtractor={(suggestion, index) => index.toString()}
        renderItem={({ item, index }) => (
          // eslint-disable-next-line react-native/no-inline-styles
          <TouchableOpacity
            onPress={() => this.handleSuggestionPressed(item)}
            style={[
              styles.suggestionItem,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                borderBottomWidth: index !== this.props.osmSuggestions.length - 1 ? 1 : 0,
                paddingTop: index !== 0 ? 10 : 0,
                borderColor: '#f2f2f2'
              }
            ]}
          >
            <Text style={styles.suggestionItemText}>{item.displayName}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  handleClearSearch = () => {
    this.setState(
      {
        searchInput: ''
      },
      () => {
        this.props.setOsmSuggestions([]);
        this.searchTextInput.focus();
      }
    );
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
            <Text style={styles.findingLocationText}>Finding your current location...</Text>
          </View>
        ) : this.state.hasLocationPermissions === false ? (
          <Text style={styles.findingLocationText}>Location permissions are not granted.</Text>
        ) : this.state.focusedLocation === null ? (
          <Text style={styles.findingLocationText}>Map region does not exist.</Text>
        ) : (
          <View style={styles.map}>
            <MapView
              style={styles.map}
              initialRegion={{
                ...this.state.focusedLocation,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015
              }}
              region={this.state.focusedLocation}
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
              ref={input => (this.searchTextInput = input)}
              style={styles.locationTextInput}
              onChangeText={text => this.setState({ searchInput: text })}
              value={this.state.searchInput}
              placeholder={'Search places, cafes, restaurants, streets...'}
              returnKeyType={'search'}
              onSubmitEditing={() => this.props.onSubmitEditing(this.state.searchInput)}
            />
            {this.state.searchInput !== '' &&
              !this.props.isFetchingOsmSuggestions && (
              <TouchableOpacity onPress={this.handleClearSearch}>
                <Icon.Ionicons
                  name="md-close"
                  size={24}
                  style={styles.clearSearchIcon}
                  color={'#999'}
                />
              </TouchableOpacity>
            )}
            {this.props.isFetchingOsmSuggestions && (
              <ActivityIndicator style={styles.searchIndicator} />
            )}
          </View>
          <View style={styles.suggestionsWrapper}>{this.renderSuggestions()}</View>
        </View>
      </View>
    );
  }
}

MapPickLocation.propTypes = {
  onFocusedLocationChanged: PropTypes.func,
  onLocationInfoChanged: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  osmSuggestions: PropTypes.array,
  setOsmSuggestions: PropTypes.func,
  isFetchingOsmSuggestions: PropTypes.bool
};

const styles = StyleSheet.create({
  clearSearchIcon: {
    padding: 10,
    paddingRight: 15
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1
  },
  findingLocationText: {
    color: '#666666'
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
    flex: 1,
    fontSize: 14
  },
  map: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flex: 1,
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
  searchIndicator: {
    padding: 10,
    paddingRight: 12
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
  suggestionItem: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10
  },
  suggestionItemText: {
    color: '#808080'
  },
  suggestionsWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
    marginTop: -20,
    maxHeight: 200,
    paddingTop: 15,
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
