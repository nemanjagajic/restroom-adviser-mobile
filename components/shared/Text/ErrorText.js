import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const ErrorText = props => {
  return <Text style={props.style}>{props.error ? props.message : ''}</Text>;
};

ErrorText.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
  style: PropTypes.object
};

export default ErrorText;
