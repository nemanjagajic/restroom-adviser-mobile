import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Location, MapView, Permissions } from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroom } from '../../../../store/actions/RestroomActions';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';

class PickRestroomLocation extends Component {
  static navigationOptions = {
    headerTitle: 'Pick restroom location'
  };

  state = {
    focusedLocation: null,
    hasLocationPermissions: false,
    locationResult: null,
    locationInfo: null
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

    // Center the map on the location we just fetched.
    this.setState(
      {
        focusedLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02
        }
      },
      () => this.setLocationInformation(this.state.focusedLocation)
    );
  };

  handlePickLocation = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    this.setState(prevState => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    }));

    this.setLocationInformation(coords);
  };

  async setLocationInformation(coords) {
    const { latitude, longitude } = coords;
    let locationInfo = await Location.reverseGeocodeAsync({ latitude, longitude });

    this.setState({ locationInfo: locationInfo[0] });
  }

  getFormattedLocationInfo = () => {
    const { street, name, city, country } = this.state.locationInfo;
    return `${street} ${name} ${city} ${country}`;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.locationResult === null ? (
          <Text>Finding your current location...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>Location permissions are not granted.</Text>
        ) : this.state.focusedLocation === null ? (
          <Text>Map region does not exist.</Text>
        ) : (
          <MapView
            ref={ref => (this.map = ref)}
            style={styles.map}
            region={this.state.focusedLocation}
            onPress={this.handlePickLocation}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.focusedLocation.latitude,
                longitude: this.state.focusedLocation.longitude
              }}
            />
          </MapView>
        )}
        <View>{this.state.locationInfo && <Text>{this.getFormattedLocationInfo()}</Text>}</View>
        <ButtonCustom
          title={'Add restroom'}
          onPress={() =>
            this.props.addRestroom({
              name: this.props.navigation.getParam('name'),
              description: this.props.navigation.getParam('description'),
              latitude: this.state.focusedLocation.latitude,
              longitude: this.state.focusedLocation.longitude,
              location_text: this.getFormattedLocationInfo()
            })
          }
        />
      </View>
    );
  }
}

PickRestroomLocation.propTypes = {
  addingRestroomInfo: PropTypes.object,
  addRestroom: PropTypes.func,
  navigation: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addRestroom
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  map: {
    height: Dimensions.get('window').height * 0.6,
    width: Dimensions.get('window').width
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickRestroomLocation);
