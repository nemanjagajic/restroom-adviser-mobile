import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal';

const SocialLoginErrorModal = ({ error, closeModal }) => {
  return (
    <Modal isVisible={!!error} closeModal={closeModal}>
      <ModalHeader>
        <Text style={styles.title}>{'Social login error'}</Text>
      </ModalHeader>
      <ModalBody>
        <Text style={styles.description}>{error}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity style={styles.button} onPress={closeModal}>
          <Text style={styles.text}>{'Close'}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default SocialLoginErrorModal;

SocialLoginErrorModal.propTypes = {
  error: PropTypes.string,
  closeModal: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    display: 'flex',
    elevation: 1,
    height: 30,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    margin: 20,
    padding: 20,
    width: 80
  },
  description: {
    color: '#777',
    fontSize: 14,
    margin: 20,
    textAlign: 'center'
  },
  text: {
    color: '#999'
  },
  title: {
    color: '#777',
    fontSize: 18,
    margin: 20,
    textAlign: 'center'
  }
});
