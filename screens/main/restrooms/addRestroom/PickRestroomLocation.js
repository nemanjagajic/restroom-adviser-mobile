import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroom, getOsmSuggestions } from '../../../../store/actions/RestroomActions';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import {
  isAddingRestroomSelector,
  osmSuggestionsSelector
} from '../../../../store/selectors/RestroomSelector';
import MapPickLocation from '../../../../components/map/MapPickLocation';

class PickRestroomLocation extends Component {
  static navigationOptions = {
    headerTitle: 'Pick restroom location',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
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
      location_text: this.state.locationInfo,
      working_hours: this.props.navigation.getParam('workingHours')
    });
  };

  onSubmitEditingSearch = query => {
    this.props.getOsmSuggestions(query);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapPickLocation
          onFocusedLocationChanged={this.handleFocusedLocationChanged}
          onLocationInfoChanged={this.handleLocationInfoChanged}
          onSubmitEditing={this.onSubmitEditingSearch}
          osmSuggestions={this.props.osmSuggestions}
        />
        <View style={styles.locationText}>
          <TextInput
            style={styles.locationTextInput}
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
  isAddingRestroom: PropTypes.bool,
  getOsmSuggestions: PropTypes.func,
  osmSuggestions: PropTypes.array
};

const mapStateToProps = state => ({
  isAddingRestroom: isAddingRestroomSelector(state),
  osmSuggestions: osmSuggestionsSelector(state)
});

const mapDispatchToProps = {
  addRestroom,
  getOsmSuggestions
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
  locationText: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e6e6e6',
    borderRadius: 30,
    borderWidth: 1,
    color: '#808080',
    marginTop: 15,
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  locationTextInput: {
    color: '#808080'
  },
  white: {
    color: '#fff'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickRestroomLocation);
