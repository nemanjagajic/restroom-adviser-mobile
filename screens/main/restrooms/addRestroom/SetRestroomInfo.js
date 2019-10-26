import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../../../constants/Colors';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';

class SetRestroomInfo extends Component {
  static navigationOptions = {
    headerTitle: 'Set restroom info',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  state = {
    name: '',
    description: ''
  };

  handleNext = () => {
    this.props.navigation.navigate('SetRestroomWorkingHours', {
      name: this.state.name,
      description: this.state.description,
      latitude: this.props.navigation.getParam('latitude'),
      longitude: this.props.navigation.getParam('longitude'),
      locationInfo: this.props.navigation.getParam('locationInfo')
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChange={event => this.setState({ name: event.nativeEvent.text })}
          placeholder={'Name*'}
        />
        <TextInput
          style={styles.inputDesc}
          value={this.state.description}
          onChange={event => this.setState({ description: event.nativeEvent.text })}
          placeholder={'Description'}
        />
        <ButtonCustom
          title={'Next'}
          style={styles.button}
          textStyle={styles.addButtonText}
          onPress={this.handleNext}
        />
      </KeyboardAvoidingView>
    );
  }
}

SetRestroomInfo.propTypes = {
  navigation: PropTypes.object,
  invalidOldPasswordError: PropTypes.bool,
  setAddingRestroomInfo: PropTypes.func
};

const styles = StyleSheet.create({
  addButtonText: {
    color: '#fff',
    fontSize: 16
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    marginTop: 10
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#666666',
    fontSize: 16,
    height: 50,
    width: 300
  },
  inputDesc: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#666666',
    fontSize: 16,
    height: 50,
    marginBottom: 10,
    width: 300
  }
});

export default SetRestroomInfo;
