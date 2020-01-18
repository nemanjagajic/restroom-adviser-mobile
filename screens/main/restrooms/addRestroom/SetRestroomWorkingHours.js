import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TimePickerFromTo from '../../../../components/shared/TimePickerFromTo';
import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
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
    currentlyShowing: 1,
    workingDaysFrom: '',
    workingDaysTo: '',
    saturdayFrom: '',
    saturdayTo: '',
    sundayFrom: '',
    sundayTo: '',
    workingDaysClosed: false,
    saturdayClosed: false,
    sundayClosed: false
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

    let workingDays = `${workingDaysFrom} - ${workingDaysTo}`;
    let saturday = `${saturdayFrom} - ${saturdayTo}`;
    let sunday = `${sundayFrom} - ${sundayTo}`;

    if (this.state.workingDaysClosed) workingDays = 'Closed';
    if (this.state.saturdayClosed) saturday = 'Closed';
    if (this.state.sundayClosed) sunday = 'Closed';

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

  handleLeft = () => {
    if (this.state.currentlyShowing > 1) {
      this.setState(prevState => ({ currentlyShowing: prevState.currentlyShowing - 1 }));
    }
  };

  handleRight = () => {
    if (this.state.currentlyShowing < 3) {
      this.setState(prevState => ({ currentlyShowing: prevState.currentlyShowing + 1 }));
    }
  };

  clearWorkingDays = () => {
    this.setState({ workingDaysFrom: '', workingDaysTo: '' });
  };

  clearSaturday = () => {
    this.setState({ saturdayFrom: '', saturdayTo: '' });
  };

  clearSunday = () => {
    this.setState({ sundayFrom: '', sundayTo: '' });
  };

  handleWorkingDaysClosed = () => {
    this.setState(prevState => ({ workingDaysClosed: !prevState.workingDaysClosed }));
  };

  handleSaturdayClosed = () => {
    this.setState(prevState => ({ saturdayClosed: !prevState.saturdayClosed }));
  };

  handleSundayClosed = () => {
    this.setState(prevState => ({ sundayClosed: !prevState.sundayClosed }));
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentlyShowing === 1 && (
          <View style={styles.timePickerWrapper}>
            <Text style={styles.timePickerTitle}>Monday to Friday</Text>
            {this.state.workingDaysClosed ? (
              <Text style={styles.closedText}>Closed</Text>
            ) : (
              <TimePickerFromTo
                from={this.state.workingDaysFrom}
                to={this.state.workingDaysTo}
                fieldNameFrom={'workingDaysFrom'}
                fieldNameTo={'workingDaysTo'}
                handleTimePicked={this.handleTimePicked}
              />
            )}
            <TouchableOpacity style={styles.optionButton} onPress={this.handleWorkingDaysClosed}>
              <Text style={styles.optionText}>
                {this.state.workingDaysClosed ? 'Remove closed' : 'Set closed'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={this.clearWorkingDays}>
              <Text style={styles.optionText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.currentlyShowing === 2 && (
          <View style={styles.timePickerWrapper}>
            <Text style={styles.timePickerTitle}>Saturday</Text>
            {this.state.saturdayClosed ? (
              <Text style={styles.closedText}>Closed</Text>
            ) : (
              <TimePickerFromTo
                from={this.state.saturdayFrom}
                to={this.state.saturdayTo}
                fieldNameFrom={'saturdayFrom'}
                fieldNameTo={'saturdayTo'}
                handleTimePicked={this.handleTimePicked}
              />
            )}
            <TouchableOpacity style={styles.optionButton} onPress={this.handleSaturdayClosed}>
              <Text style={styles.optionText}>
                {this.state.sundayClosed ? 'Remove closed' : 'Set closed'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={this.clearSaturday}>
              <Text style={styles.optionText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.currentlyShowing === 3 && (
          <View style={styles.timePickerWrapper}>
            <Text style={styles.timePickerTitle}>Sunday</Text>
            {this.state.sundayClosed ? (
              <Text style={styles.closedText}>Closed</Text>
            ) : (
              <TimePickerFromTo
                from={this.state.sundayFrom}
                to={this.state.sundayTo}
                fieldNameFrom={'sundayFrom'}
                fieldNameTo={'sundayTo'}
                handleTimePicked={this.handleTimePicked}
              />
            )}
            <TouchableOpacity style={styles.optionButton} onPress={this.handleSundayClosed}>
              <Text style={styles.optionText}>
                {this.state.sundayClosed ? 'Remove closed' : 'Set closed'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={this.clearSunday}>
              <Text style={styles.optionText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={this.handleLeft}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="ios-arrow-back"
            disabled={this.state.currentlyShowing === 1}
            color={this.state.currentlyShowing === 1 ? '#ccc' : Colors.mainColor}
            size={40}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={this.handleRight}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="ios-arrow-forward"
            disabled={this.state.currentlyShowing === 3}
            color={this.state.currentlyShowing === 3 ? '#ccc' : Colors.mainColor}
            size={40}
          />
        </TouchableOpacity>
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
  buttonLeft: {
    alignSelf: 'center',
    left: 30,
    position: 'absolute'
  },
  buttonRight: {
    alignSelf: 'center',
    position: 'absolute',
    right: 30
  },
  closedText: {
    color: '#ff6666',
    fontSize: 22,
    marginBottom: 20
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -50
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
  optionButton: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    display: 'flex',
    elevation: 1,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    width: 180
  },
  optionText: {
    color: '#999'
  },
  text: {
    color: '#fff',
    fontSize: 16
  },
  timePickerTitle: {
    color: '#999',
    fontSize: 24,
    marginBottom: 30
  },
  timePickerWrapper: {
    alignItems: 'center',
    display: 'flex'
  }
});

export default SetRestroomWorkingHours;
