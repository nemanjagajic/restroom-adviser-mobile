import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';
import ButtonCustom from '../shared/button/ButtonCustom';

class AddImage extends Component {
  state = {
    image: null
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 2]
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }

    this.props.onImageAdded(this.state.image);
  };

  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 2]
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }

    this.props.onImageAdded(this.state.image);
  };

  render() {
    return (
      <View style={styles.container}>
        <ButtonCustom title={'Pick Image'} onPress={this.pickImage} />
        <ButtonCustom title={'Take Photo'} onPress={this.openCamera} />
      </View>
    );
  }
}

AddImage.propTypes = {
  onImageAdded: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  }
});

export default AddImage;
