import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { resetPasswordValidationRules } from '../../validation /auth';
import ErrorText from '../shared/Text/ErrorText';

export const ResetPasswordForm = props => (
  <Formik
    initialValues={{ password: '', password_confirmation: '' }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={resetPasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          name="password"
          component={TextInputField}
          secureTextEntry
          placeholder={'Enter password'}
        />
        <Field
          name="password_confirmation"
          component={TextInputField}
          secureTextEntry
          placeholder={'Confirm password'}
        />
        <ErrorText error={!!props.resetPasswordError} message={'Invalid or expired token'} />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>{'Reset password'}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  resetPasswordError: PropTypes.bool
};
