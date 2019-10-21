import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import $t from 'i18n';

import { Modal } from './baseModal';
import Colors from '../../../constants/Colors';

const PasswordChangedModal = ({ isVisible, closeModal }) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <View style={styles.container}>
        <Text style={styles.changedPasswordText}>
          {$t('profile.changePassword.passwordChangedSuccess')}
        </Text>
        <TouchableOpacity style={styles.button} onPress={closeModal}>
          <Text style={styles.okText}>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 50,
    padding: 10,
    width: 80
  },
  changedPasswordText: {
    color: '#999',
    fontSize: 18,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    padding: 10
  },
  okText: {
    color: Colors.mainColor
  }
});

export default PasswordChangedModal;

PasswordChangedModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func
};
