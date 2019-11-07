import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';

class TimePicker extends PureComponent {
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
        <TouchableOpacity onPress={this.showDateTimePicker} style={styles.button}>
          <Text style={styles.text}>{this.props.title}</Text>
        </TouchableOpacity>
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
  title: PropTypes.string,
  stylesButton: PropTypes.object
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    display: 'flex',
    elevation: 1,
    height: 30,
    justifyContent: 'center',
    padding: 20,
    width: 80
  },
  text: {
    color: '#999'
  }
});

export default TimePicker;
