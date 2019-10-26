import React, { Component } from 'react';
import { Button, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';

class TimePicker extends Component {
  state = {
    isDateTimePickerVisible: false
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.props.onTimePicked(date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View>
        <Button title={this.props.title} onPress={this.showDateTimePicker} />
        <DateTimePicker
          mode={'time'}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}

TimePicker.propTypes = {
  onTimePicked: PropTypes.func,
  title: PropTypes.string
};

export default TimePicker;
