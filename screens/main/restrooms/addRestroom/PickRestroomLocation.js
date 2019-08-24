import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroom } from '../../../../store/actions/RestroomActions';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import { isAddingRestroomSelector } from '../../../../store/selectors/RestroomSelector';
import MapPickLocation from '../../../../components/map/MapPickLocation';

class PickRestroomLocation extends Component {
  static navigationOptions = {
    headerTitle: 'Pick restroom location'
  };

  state = {
    focusedLocation: null,
    locationInfo: null
  };

  handleFocusedLocationChanged = focusedLocation => {
    this.setState({ focusedLocation });
  };

  handleLocationInfoChanged = locationInfo => {
    this.setState({ locationInfo });
  };

  addRestroom = () => {
    this.props.addRestroom({
      name: this.props.navigation.getParam('name'),
      description: this.props.navigation.getParam('description'),
      images: this.props.navigation.getParam('images'),
      latitude: this.state.focusedLocation.latitude,
      longitude: this.state.focusedLocation.longitude,
      location_text: this.state.locationInfo
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapPickLocation
          onFocusedLocationChanged={this.handleFocusedLocationChanged}
          onLocationInfoChanged={this.handleLocationInfoChanged}
        />
        <Text style={styles.addingRestroomIndicator}>
          {this.props.isAddingRestroom && 'Adding restroom...'}
        </Text>
        <ButtonCustom
          title={'Add restroom'}
          style={styles.buttonAddRestroom}
          textStyle={styles.white}
          onPress={this.addRestroom}
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
    bottom: 20,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginTop: 40,
    position: 'absolute',
    width: 250
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1
  },
  white: {
    color: '#fff'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickRestroomLocation);
