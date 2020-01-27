import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Modal, ModalBody, ModalFooter } from './baseModal';

const NoPermissionsForCameraModal = ({ isVisible, closeModal }) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalBody>
        <Text>{'No permissions'}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{'Ok'}</Text>
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
