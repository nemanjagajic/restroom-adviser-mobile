import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { Modal } from './baseModal';

const PasswordChangedModal = ({ isVisible, closeModal }) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <View style={styles.container}>
        <Text style={styles.changedPasswordText}>{'Password changed successfully'}</Text>
        <TouchableOpacity style={styles.button} onPress={closeModal}>
          <Text style={styles.text}>{'Ok'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    display: 'flex',
    elevation: 1,
    height: 30,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 30,
    padding: 20,
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
  text: {
    color: '#999'
  }
});

export default PasswordChangedModal;

PasswordChangedModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func
};
