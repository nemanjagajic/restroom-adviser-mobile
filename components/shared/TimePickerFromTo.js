import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimePicker from './TimePicker';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

class TimePickerFromTo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.input}>{this.props.from}</Text>
          <TimePicker
            style={styles.timePicker}
            title={'From'}
            onTimePicked={date => this.props.handleTimePicked(date, this.props.fieldNameFrom)}
          />
        </View>
        <Icon.Ionicons name={'ios-remove'} size={26} style={styles.icon} color={'#ccc'} />
        <View style={styles.field}>
          <Text style={styles.input}>{this.props.to}</Text>
          <TimePicker
            title={'To'}
            onTimePicked={date => this.props.handleTimePicked(date, this.props.fieldNameTo)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    width: 300
  },
  field: {
    alignItems: 'center',
    display: 'flex'
  },
  icon: {
    marginLeft: 5,
    marginRight: 5
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    color: '#666666',
    fontSize: 16,
    marginBottom: 10,
    paddingBottom: 4,
    paddingTop: 2,
    textAlign: 'center',
    width: 45
  }
});

TimePickerFromTo.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  handleTimePicked: PropTypes.func,
  fieldNameFrom: PropTypes.string,
  fieldNameTo: PropTypes.string
};

export default TimePickerFromTo;
