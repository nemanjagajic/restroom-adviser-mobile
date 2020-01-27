import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal';
import NavigationService from '../../../services/NavigationService';

const ErrorModal = ({ isVisible, closeModal }) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalHeader>
        <Text>{'Something went wrong'}</Text>
      </ModalHeader>
      <ModalBody>
        <Text>{'Do you want to restart'}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{'Cancel'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('AuthLoading')}>
          <Text>{'Restart'}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default ErrorModal;

ErrorModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func
};
