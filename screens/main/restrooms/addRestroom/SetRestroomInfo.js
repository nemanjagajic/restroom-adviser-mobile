import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, View } from 'react-native';
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
          multiline
          style={styles.inputDesc}
          value={this.state.description}
          onChange={event => this.setState({ description: event.nativeEvent.text })}
          placeholder={'Description'}
        />
        <View style={styles.nextButtonWrapper}>
          <ButtonCustom
            disabled={this.state.name.trim() === ''}
            title={'Next'}
            style={this.state.name.trim() !== '' ? styles.button : styles.buttonDisabled}
            textStyle={styles.addButtonText}
            onPress={this.handleNext}
          />
          <View style={styles.dotWrapper}>
            <View style={styles.dot} />
            <View style={styles.dotFilled} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
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
  buttonDisabled: {
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 30,
    display: 'flex',
    elevation: 1,
    height: 45,
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 20,
    width: 140
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10
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
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    color: '#666666',
    fontSize: 16,
    height: 50,
    padding: 10,
    paddingLeft: 20,
    width: 300
  },
  inputDesc: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    color: '#666666',
    fontSize: 16,
    height: 120,
    marginBottom: 10,
    marginTop: 20,
    padding: 15,
    textAlignVertical: 'top',
    width: 300
  },
  nextButtonWrapper: {
    bottom: 10,
    position: 'absolute'
  }
});

export default SetRestroomInfo;
