import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TimePicker from './TimePicker';
import PropTypes from 'prop-types';

class TimePickerFromTo extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.from}</Text>
        <TimePicker
          title={'From'}
          onTimePicked={date => this.props.handleTimePicked(date, this.props.fieldNameFrom)}
        />
        <Text>{this.props.to}</Text>
        <TimePicker
          title={'To'}
          onTimePicked={date => this.props.handleTimePicked(date, this.props.fieldNameTo)}
        />
      </View>
    );
  }
}

TimePickerFromTo.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  handleTimePicked: PropTypes.func,
  fieldNameFrom: PropTypes.string,
  fieldNameTo: PropTypes.string
};

export default TimePickerFromTo;
