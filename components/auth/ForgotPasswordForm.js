import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { forgotPasswordValidationRules } from '../../validation /auth';
import ErrorText from '../shared/Text/ErrorText';

export const ForgotPasswordForm = props => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={forgotPasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field name="email" component={TextInputField} placeholder={'Enter email'} />
        <ErrorText error={!!props.forgotPasswordError} message={'Email does not exist'} />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>{'Send email'}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  forgotPasswordError: PropTypes.bool
};
