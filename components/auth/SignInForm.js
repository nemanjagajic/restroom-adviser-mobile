import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { signInValidationRules } from '../../validation /auth';
import $t from 'i18n';
import ErrorText from '../shared/Text/ErrorText';
import CustomButton from '../shared/button/CustomButton';
import logo from '../../assets/images/logo.png';

export const SignInForm = props => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={signInValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Field name="email" component={TextInputField} placeholder={$t('auth.enterEmail')} />
        <Field
          name="password"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('auth.enterPassword')}
        />
        <ErrorText
          style={styles.error}
          error={!!props.signInError}
          message={$t('auth.invalidCredentials')}
        />
        <CustomButton title={'Log in'} onPress={handleSubmit} style={styles.button} />
      </View>
    )}
  </Formik>
);

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
  signInError: PropTypes.bool
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFB300',
    borderRadius: 20,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginTop: 5,
    width: 300
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'center'
  },
  error: {
    color: '#b3b3b3',
    paddingBottom: 5,
    paddingTop: 5
  },
  image: {
    height: 120,
    width: 120
  }
});
