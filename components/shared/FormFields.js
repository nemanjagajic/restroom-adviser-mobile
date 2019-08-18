import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ErrorMessage } from 'formik';
import Colors from '../../constants/Colors';

export const TextInputField = ({ field, form, ...props }) => {
  const [borderColor, setBorderColor] = useState('#b3b3b3');

  return (
    <View style={[styles.container, { borderColor: borderColor }]}>
      <TextInput
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={() => {
          form.handleBlur(field.name);
          setBorderColor('#b3b3b3');
        }}
        onFocus={() => setBorderColor(Colors.mainColor)}
        {...props}
        selectionColor={Colors.mainColor}
        style={styles.input}
      />
      <ErrorMessage style={styles.error} name={field.name} component={Text} />
    </View>
  );
};

TextInputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 30,
    marginBottom: 10,
    marginTop: 25,
    width: 300
  },
  error: {
    color: '#b3b3b3',
    paddingBottom: 5,
    paddingTop: 5
  },
  input: {
    color: '#666666',
    fontSize: 16
  }
});
