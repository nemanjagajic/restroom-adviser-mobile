import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { signInValidationRules } from '../../validation /auth';
import $t from 'i18n';
import ErrorText from '../shared/Text/ErrorText';
import ButtonCustom from '../shared/button/ButtonCustom';
import logo from '../../assets/images/poop-emoji.png';
import Colors from '../../constants/Colors';
import { TextInputFieldWhite } from '../shared/FormFieldsWhite';

export const SignInForm = props => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={signInValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Field name="email" component={TextInputFieldWhite} placeholder={$t('auth.enterEmail')} />
        <Field
          name="password"
          component={TextInputFieldWhite}
          secureTextEntry
          placeholder={$t('auth.enterPassword')}
        />
        <ErrorText
          style={styles.error}
          error={!!props.signInError}
          message={$t('auth.invalidCredentials')}
        />
        <ButtonCustom
          title={'Log in'}
          onPress={handleSubmit}
          style={styles.button}
          textStyle={styles.buttonText}
        />
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
    backgroundColor: Colors.mainColor,
    borderRadius: 30,
    display: 'flex',
    elevation: 1,
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 5,
    width: 300
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
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
    height: 80,
    marginBottom: 20,
    width: 80
  }
});
