import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHeaderLeftNavigator } from '../../helpers';
import { userSelector } from '../../store/selectors/UserSelector';
import { Location, MapView, Permissions } from 'expo';
import poopEmojiIcon from '../../assets/images/poop-emoji.png';
import mapMarkerIcon from '../../assets/images/map-marker-icon.png';
import { fetchRestrooms } from '../../store/actions/RestroomActions';
import { restroomsSelector } from '../../store/selectors/RestroomSelector';
import Colors from '../../constants/Colors';

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
    return { ...headerLeftNav, headerRight, title: 'Home' };
  };

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
    this.props.fetchRestrooms();
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
            <MapView style={styles.map} region={this.state.mapRegion}>
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
                  image={mapMarkerIcon}
                >
                  <MapView.Callout tooltip={true}>
                    <TouchableOpacity style={styles.mapMarkerCallout}>
                      <Text>
                        <Text style={styles.calloutTitle}>{restroom.name} </Text>
                        <Text style={styles.calloutTitleRating}>4.2</Text>
                      </Text>
                      <Text style={styles.calloutStreet}>{restroom.location_text}</Text>
                      <Text style={styles.calloutTap}>Tap to open details</Text>
                    </TouchableOpacity>
                  </MapView.Callout>
                </MapView.Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
  restrooms: restroomsSelector(state)
});

const mapDispatchToProps = {
  fetchRestrooms
};

HomeScreen.propTypes = {
  fetchRestrooms: PropTypes.func,
  navigation: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  restrooms: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  buttonHeaderRight: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 5,
    display: 'flex',
    marginRight: 10,
    padding: 7,
    width: 110
  },
  buttonHeaderRightText: {
    color: '#fff'
  },
  calloutStreet: {
    color: '#fff',
    fontSize: 12
  },
  calloutTap: {
    color: '#cccccc',
    fontSize: 10
  },
  calloutTitle: {
    color: '#fff',
    fontSize: 20
  },
  calloutTitleRating: {
    color: '#cccccc',
    fontSize: 18
  },
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
  },
  mapMarkerCallout: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 5,
    padding: 10
  }
});
