import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';

const ButtonCustom = ({
  title,
  onPress,
  style = styles.button,
  textStyle = {},
  disabled = false
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

ButtonCustom.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 20,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginTop: 5,
    width: 250
  }
});

export default ButtonCustom;
