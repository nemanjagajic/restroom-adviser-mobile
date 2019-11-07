import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimePickerFromTo from '../../../../components/shared/TimePickerFromTo';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import PropTypes from 'prop-types';

class SetRestroomWorkingHours extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Set restroom working hours',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  state = {
    workingDaysFrom: '',
    workingDaysTo: '',
    saturdayFrom: '',
    saturdayTo: '',
    sundayFrom: '',
    sundayTo: ''
  };

  handleTimePicked = (date, field) => {
    const hours = this.addZeroPrefix(date.getHours());
    const minutes = this.addZeroPrefix(date.getMinutes());
    this.setState({ [field]: `${hours}:${minutes}` });
  };

  formattedWorkingHours = () => {
    const workingDaysFrom = `${this.state.workingDaysFrom || 'not specified'}`;
    const workingDaysTo = `${this.state.workingDaysTo || 'not specified'}`;
    const saturdayFrom = `${this.state.saturdayFrom || 'not specified'}`;
    const saturdayTo = `${this.state.saturdayTo || 'not specified'}`;
    const sundayFrom = `${this.state.sundayFrom || 'not specified'}`;
    const sundayTo = `${this.state.sundayTo || 'not specified'}`;

    const workingDays = `${workingDaysFrom} - ${workingDaysTo}`;
    const saturday = `${saturdayFrom} - ${saturdayTo}`;
    const sunday = `${sundayFrom} - ${sundayTo}`;

    return `${workingDays}{,}${saturday}{,}${sunday}`;
  };

  addZeroPrefix = num => {
    if (num < 10) return `0${num}`;
    return num;
  };

  isEmpty = () => {
    return (
      this.state.workingDaysFrom === '' &&
      this.state.workingDaysTo === '' &&
      this.state.saturdayFrom === '' &&
      this.state.saturdayTo === '' &&
      this.state.sundayFrom === '' &&
      this.state.sundayTo === ''
    );
  };

  handleNext = () => {
    this.props.navigation.navigate('PickRestroomImages', {
      name: this.props.navigation.getParam('name'),
      description: this.props.navigation.getParam('description'),
      workingHours: this.formattedWorkingHours(),
      latitude: this.props.navigation.getParam('latitude'),
      longitude: this.props.navigation.getParam('longitude'),
      locationInfo: this.props.navigation.getParam('locationInfo')
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.timePickerTitle}>Monday to Friday</Text>
        <TimePickerFromTo
          from={this.state.workingDaysFrom}
          to={this.state.workingDaysTo}
          fieldNameFrom={'workingDaysFrom'}
          fieldNameTo={'workingDaysTo'}
          handleTimePicked={this.handleTimePicked}
        />
        <Text style={styles.timePickerTitle}>Saturday</Text>
        <TimePickerFromTo
          from={this.state.saturdayFrom}
          to={this.state.saturdayTo}
          fieldNameFrom={'saturdayFrom'}
          fieldNameTo={'saturdayTo'}
          handleTimePicked={this.handleTimePicked}
        />
        <Text style={styles.timePickerTitle}>Sunday</Text>
        <TimePickerFromTo
          from={this.state.sundayFrom}
          to={this.state.sundayTo}
          fieldNameFrom={'sundayFrom'}
          fieldNameTo={'sundayTo'}
          handleTimePicked={this.handleTimePicked}
        />
        <View style={styles.nextButtonWrapper}>
          <ButtonCustom
            title={this.isEmpty() ? 'Skip' : 'Next'}
            style={styles.button}
            textStyle={styles.text}
            onPress={this.handleNext}
          />
          <View style={styles.dotWrapper}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dotFilled} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    );
  }
}

SetRestroomWorkingHours.propTypes = {
  navigation: PropTypes.object,
  invalidOldPasswordError: PropTypes.bool,
  setAddingRestroomInfo: PropTypes.func
};

const styles = StyleSheet.create({
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
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30
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
  nextButtonWrapper: {
    bottom: 30,
    position: 'absolute'
  },
  text: {
    color: '#fff',
    fontSize: 16
  },
  timePickerTitle: {
    color: '#999',
    fontSize: 16,
    marginTop: 10
  }
});

export default SetRestroomWorkingHours;
