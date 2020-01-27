import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal';

const SocialLoginErrorModal = ({ error, closeModal }) => {
  return (
    <Modal isVisible={!!error} closeModal={closeModal}>
      <ModalHeader>
        <Text>{'Social login error'}</Text>
      </ModalHeader>
      <ModalBody>
        <Text>{error}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{'Close'}</Text>
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
