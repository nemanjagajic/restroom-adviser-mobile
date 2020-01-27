import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { signUpValidationRules } from '../../validation /auth';
import ErrorText from '../shared/Text/ErrorText';
import ButtonCustom from '../shared/button/ButtonCustom';
import Colors from '../../constants/Colors';
import { TextInputFieldWhite } from '../shared/FormFieldsWhite';

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
            component={TextInputFieldWhite}
            placeholder={'Enter first name'}
          />
          <Field name="last_name" component={TextInputFieldWhite} placeholder={'Enter last name'} />
          <Field name="email" component={TextInputFieldWhite} placeholder={'Enter email'} />
          {props.signUpErrors.email && (
            <ErrorText error={!!props.signUpErrors.email} message={props.signUpErrors.email} />
          )}
          <Field
            name="password"
            component={TextInputFieldWhite}
            secureTextEntry
            placeholder={'Enter password'}
          />
          <Field
            name="confirm_password"
            component={TextInputFieldWhite}
            secureTextEntry
            placeholder={'Confirm password'}
          />
          <ButtonCustom
            title={'Sign up'}
            onPress={handleSubmit}
            style={styles.button}
            textStyle={styles.buttonText}
          />
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
    backgroundColor: Colors.mainColor,
    borderRadius: 30,
    display: 'flex',
    elevation: 1,
    height: 50,
    justifyContent: 'center',
    width: 300
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  container: {
    alignItems: 'center'
  }
});
