{
  /* eslint-disable react-native/no-inline-styles */
}
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Location, MapView, Permissions } from 'expo';
import poopEmojiIcon from '../../assets/images/poop-emoji.png';
import mapMarkerIcon from '../../assets/images/map-marker-icon-filled.png';
import mapMarkerIconRed from '../../assets/images/map-marker-icon-red.png';

class MapLocations extends React.Component {
  state = {
    modalVisible: false,
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    isRestroomModalVisible: false,
    pickedRestroom: null
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

    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.02
      }
    });
  };

  render() {
    const location = this.props.centerLocation;

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {this.state.locationResult === null ? (
            <Text>Finding your current location...</Text>
          ) : this.state.hasLocationPermissions === false ? (
            <Text>Location permissions are not granted.</Text>
          ) : this.state.mapRegion === null ? (
            <Text>Map region does not exist.</Text>
          ) : (
            <MapView style={styles.map} region={location || this.state.mapRegion}>
              <MapView.Marker
                coordinate={{
                  latitude: this.state.mapRegion.latitude,
                  longitude: this.state.mapRegion.longitude
                }}
                image={poopEmojiIcon}
                zIndex={1}
              />
              {this.props.restrooms.map(restroom => (
                <MapView.Marker
                  key={restroom.id}
                  coordinate={{
                    latitude: restroom.latitude,
                    longitude: restroom.longitude
                  }}
                  image={
                    this.props.selectedRestroomId === restroom.id ? mapMarkerIconRed : mapMarkerIcon
                  }
                  onPress={() => this.props.onMarkerPressed(restroom)}
                  style={{ zIndex: this.props.selectedRestroomId === restroom.id ? 2 : 0 }}
                />
              ))}
            </MapView>
          )}
        </View>
      </View>
    );
  }
}

MapLocations.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  restrooms: PropTypes.array,
  selectedRestroomId: PropTypes.number,
  onMarkerPressed: PropTypes.func,
  centerLocation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  map: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  mapContainer: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center'
  }
});

export default MapLocations;
