import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { updateProfileValidationRules } from '../../validation /profile';

export const UpdateProfileForm = props => (
  <Formik
    initialValues={{ first_name: props.user.first_name, last_name: props.user.last_name }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={updateProfileValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={styles.container}>
        <Field
          style={styles.input}
          name="first_name"
          component={TextInputField}
          placeholder={'First name'}
        />
        <Field
          style={styles.input}
          name="last_name"
          component={TextInputField}
          placeholder={'Last name'}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{'Update'}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

UpdateProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object
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
    justifyContent: 'center',
    marginTop: 50
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
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#26A69A',
    borderRadius: 20,
    elevation: 1,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 40,
    width: 130
  }
});
