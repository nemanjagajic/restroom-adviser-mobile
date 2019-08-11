import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import { Field, Formik } from 'formik';
import { TextInputField } from '../../../../components/shared/FormFields';
class SetRestroomInfo extends Component {
  static navigationOptions = {
    headerTitle: 'Add location info'
  };

  handleNext = values => {
    this.props.navigation.navigate('PickRestroomLocation', {
      name: values.name,
      description: values.description
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'}>
          <Formik
            initialValues={{ name: '', description: '' }}
            onSubmit={(values, { resetForm }) => {
              this.handleNext(values);
              resetForm({});
            }}
          >
            {({ handleSubmit }) => (
              <View>
                <Field name="name" component={TextInputField} placeholder={'Name'} />
                <Field name="description" component={TextInputField} placeholder={'Description'} />
                <ButtonCustom title={'Next'} style={styles.button} onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

SetRestroomInfo.propTypes = {
  navigation: PropTypes.object,
  onSubmit: PropTypes.func,
  invalidOldPasswordError: PropTypes.bool,
  setAddingRestroomInfo: PropTypes.func
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
    backgroundColor: '#333333',
    display: 'flex',
    flex: 1,
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'center'
  }
});

export default SetRestroomInfo;
