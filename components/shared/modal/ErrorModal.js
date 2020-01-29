import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal';
import NavigationService from '../../../services/NavigationService';

const ErrorModal = ({ isVisible, closeModal }) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalHeader>
        <Text style={styles.title}>{'Something went wrong'}</Text>
      </ModalHeader>
      <ModalBody>
        <Text style={styles.questionTitle}>{'Do you want to restart?'}</Text>
      </ModalBody>
      <ModalFooter>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.text}>{'Cancel'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => NavigationService.navigate('AuthLoading')}
          >
            <Text style={styles.text}>{'Restart'}</Text>
          </TouchableOpacity>
        </View>
      </ModalFooter>
    </Modal>
  );
};

export default ErrorModal;

ErrorModal.propTypes = {
  isVisible: PropTypes.bool,
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
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    padding: 20
  },
  buttonsWrapper: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  questionTitle: {
    color: '#777',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  text: {
    color: '#999'
  },
  title: {
    color: '#777',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center'
  }
});
