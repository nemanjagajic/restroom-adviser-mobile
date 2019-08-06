import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { signUpValidationRules } from '../../validation /auth';
import $t from 'i18n';
import ErrorText from '../shared/Text/ErrorText';
import CustomButton from '../shared/button/CustomButton';

export const SignUpForm = props => (
  <View>
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      }}
      onSubmit={values => props.onSubmit(values)}
      validationSchema={signUpValidationRules}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Field
            name="first_name"
            component={TextInputField}
            placeholder={$t('auth.enterFirstName')}
          />
          <Field
            name="last_name"
            component={TextInputField}
            placeholder={$t('auth.enterLastName')}
          />
          <Field name="email" component={TextInputField} placeholder={$t('auth.enterEmail')} />
          <ErrorText error={!!props.signUpErrors.email} message={props.signUpErrors.email} />
          <Field
            name="password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('auth.enterPassword')}
          />
          <Field
            name="confirm_password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('auth.confirmPassword')}
          />
          <CustomButton title={$t('auth.signUp')} onPress={handleSubmit} style={styles.button} />
        </View>
      )}
    </Formik>
  </View>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  signUpErrors: PropTypes.object
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFB300',
    borderRadius: 20,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    marginTop: 40,
    width: 300
  },
  container: {
    alignItems: 'center'
  }
});
