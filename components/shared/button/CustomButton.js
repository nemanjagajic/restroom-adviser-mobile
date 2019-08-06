import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const CustomButton = ({ title, onPress, style, textStyle = {} }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object
};

export default CustomButton;
