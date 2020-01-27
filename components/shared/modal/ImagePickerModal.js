import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal';

const ImagePickerModal = ({ isVisible, closeModal, galleryImport, openCamera }) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalHeader>
        <Text>{'Import image'}</Text>
      </ModalHeader>
      <ModalBody>
        <TouchableOpacity onPress={openCamera}>
          <Text>{'Take picture'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={galleryImport}>
          <Text>{'Import from gallery'}</Text>
        </TouchableOpacity>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{'Cancel'}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default ImagePickerModal;

ImagePickerModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  openCamera: PropTypes.func,
  galleryImport: PropTypes.func
};
