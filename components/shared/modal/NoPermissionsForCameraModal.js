import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Modal, ModalBody, ModalFooter } from './baseModal';

const NoPermissionsForCameraModal = ({ isVisible, closeModal }) => {
  return (
    <Modal style={styles.container} isVisible={isVisible} closeModal={closeModal}>
      <ModalBody>
        <Text style={styles.title}>{'No permissions'}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity style={styles.button} onPress={closeModal}>
          <Text style={styles.text}>{'Ok'}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default NoPermissionsForCameraModal;

NoPermissionsForCameraModal.propTypes = {
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
    marginLeft: 5,
    marginRight: 5,
    margin: 20,
    padding: 20,
    width: 80
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
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
