import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Location, MapView, Permissions } from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroom } from '../../../../store/actions/RestroomActions';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import mapMarkerIcon from '../../../../assets/images/map-marker-icon.png';
import Colors from '../../../../constants/Colors';
import { isAddingRestroomSelector } from '../../../../store/selectors/RestroomSelector';
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
          latitudeDelta: 0.01,
          longitudeDelta: 0.005
        }
      },
      () => this.setLocationInformation(this.state.focusedLocation)
    );
  };

  handleRegionChanged = region => {
    this.setState(prevState => ({
      focusedLocation: {
        ...prevState,
        latitude: region.latitude,
        longitude: region.longitude
      }
    }));

    this.setLocationInformation();
  };

  async setLocationInformation() {
    const { latitude, longitude } = this.state.focusedLocation;
    let locationInfo = await Location.reverseGeocodeAsync({ latitude, longitude });

    this.setState({ locationInfo: this.getFormattedLocationInfo(locationInfo[0]) });
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
                latitudeDelta: 0.01,
                longitudeDelta: 0.005
              }}
              onRegionChangeComplete={this.handleRegionChanged}
            />
            <View style={styles.markerFixed}>
              <Image source={mapMarkerIcon} style={styles.mapMarkerIcon} />
            </View>
          </View>
        )}
        <View style={styles.locationText}>
          <TextInput
            onChangeText={text => this.setState({ locationInfo: text })}
            value={this.state.locationInfo || 'Loading current location'}
          />
        </View>
        <Text style={styles.addingRestroomIndicator}>
          {this.props.isAddingRestroom && 'Adding restroom...'}
        </Text>
        <ButtonCustom
          title={'Add restroom'}
          style={styles.buttonAddRestroom}
          textStyle={styles.white}
          onPress={() =>
            this.props.addRestroom({
              name: this.props.navigation.getParam('name'),
              description: this.props.navigation.getParam('description'),
              latitude: this.state.focusedLocation.latitude,
              longitude: this.state.focusedLocation.longitude,
              location_text: this.state.locationInfo
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
  navigation: PropTypes.object,
  isAddingRestroom: PropTypes.bool
};

const mapStateToProps = state => ({
  isAddingRestroom: isAddingRestroomSelector(state)
});

const mapDispatchToProps = {
  addRestroom
};

const styles = StyleSheet.create({
  addingRestroomIndicator: {
    color: '#808080',
    fontSize: 18,
    marginTop: 10
  },
  buttonAddRestroom: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 20,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginTop: 40,
    width: 250
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex'
  },
  locationText: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#b3b3b3',
    borderRadius: 10,
    borderWidth: 1,
    color: '#808080',
    marginTop: 15,
    padding: 10,
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9
  },
  map: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#b3b3b3',
    display: 'flex',
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'center',
    width: Dimensions.get('window').width
  },
  mapMarkerIcon: {
    height: 40,
    width: 40
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  white: {
    color: '#fff'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickRestroomLocation);
