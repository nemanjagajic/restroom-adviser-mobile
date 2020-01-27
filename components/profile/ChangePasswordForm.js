import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { changePasswordValidationRules } from '../../validation /profile';
import ErrorText from '../shared/Text/ErrorText';

export const ChangePasswordForm = props => (
  <Formik
    initialValues={{ current_password: '', new_password: '', new_password_confirmation: '' }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={changePasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={styles.container}>
        <Field
          style={styles.input}
          name="current_password"
          component={TextInputField}
          secureTextEntry
          placeholder={'Current password'}
        />
        <ErrorText
          error={!!props.invalidOldPasswordError}
          message={'Old password is incorrect.'}
          style={styles.invalidOldPasswordText}
        />
        <Field
          style={styles.input}
          name="new_password"
          component={TextInputField}
          secureTextEntry
          placeholder={'New password'}
        />
        <Field
          style={styles.input}
          name="new_password_confirmation"
          component={TextInputField}
          secureTextEntry
          placeholder={'Confirm new password'}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{'Change'}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  invalidOldPasswordError: PropTypes.bool
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#737373',
    fontSize: 16,
    height: 50,
    marginBottom: 10,
    width: '80%'
  },
  invalidOldPasswordText: {
    color: '#808080',
    paddingTop: 10
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#26A69A',
    borderRadius: 20,
    elevation: 1,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    padding: 10,
    width: 140
  }
});
