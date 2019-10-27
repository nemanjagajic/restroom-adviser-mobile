import React, { Component } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOsmSuggestions, setOsmSuggestions } from '../../../../store/actions/RestroomActions';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import {
  isFetchingOsmSuggestionsSelector,
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

  onSubmitEditingSearch = query => {
    this.props.getOsmSuggestions(query);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <MapPickLocation
            onFocusedLocationChanged={this.handleFocusedLocationChanged}
            onLocationInfoChanged={this.handleLocationInfoChanged}
            onSubmitEditing={this.onSubmitEditingSearch}
            osmSuggestions={this.props.osmSuggestions}
            setOsmSuggestions={this.props.setOsmSuggestions}
            isFetchingOsmSuggestions={this.props.isFetchingOsmSuggestions}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.locationText}>
            <TextInput
              style={styles.locationTextInput}
              onChangeText={text => this.setState({ locationInfo: text })}
              value={this.state.locationInfo || 'Loading current location'}
            />
          </View>
          {this.state.focusedLocation && (
            <View style={styles.nextButtonWrapper}>
              <ButtonCustom
                title={'Next'}
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() =>
                  this.props.navigation.navigate('SetRestroomInfo', {
                    latitude: this.state.focusedLocation.latitude,
                    longitude: this.state.focusedLocation.longitude,
                    locationInfo: this.state.locationInfo
                  })
                }
              />
              <View style={styles.dotWrapper}>
                <View style={styles.dotFilled} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

PickRestroomLocation.propTypes = {
  addingRestroomInfo: PropTypes.object,
  navigation: PropTypes.object,
  getOsmSuggestions: PropTypes.func,
  osmSuggestions: PropTypes.array,
  setOsmSuggestions: PropTypes.func,
  isFetchingOsmSuggestions: PropTypes.bool
};

const mapStateToProps = state => ({
  osmSuggestions: osmSuggestionsSelector(state),
  isFetchingOsmSuggestions: isFetchingOsmSuggestionsSelector(state)
});

const mapDispatchToProps = {
  getOsmSuggestions,
  setOsmSuggestions
};

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    bottom: 0,
    display: 'flex',
    elevation: 3,
    height: Dimensions.get('window').height * 0.25,
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 30,
    display: 'flex',
    elevation: 1,
    height: 45,
    justifyContent: 'center',
    marginBottom: 15,
    width: 140
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1
  },
  dot: {
    borderColor: '#ccc',
    borderRadius: 100,
    borderWidth: 1,
    height: 10,
    width: 10
  },
  dotFilled: {
    backgroundColor: Colors.mainColor,
    borderColor: Colors.mainColor,
    borderRadius: 100,
    borderWidth: 1,
    height: 10,
    width: 10
  },
  dotWrapper: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80
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
  nextButtonWrapper: {
    bottom: 10,
    position: 'absolute'
  },
  topContainer: {
    height: Dimensions.get('window').height * 0.6
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickRestroomLocation);
