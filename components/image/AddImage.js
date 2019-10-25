import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';
import ButtonCustom from '../shared/button/ButtonCustom';
import Colors from '../../constants/Colors';

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
      aspect: [3, 4],
      quality: 0.8
    });

    if (!result.cancelled) {
      this.setState({ image: result });
      this.props.onImageAdded(this.state.image);
    }
  };

  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8
    });

    if (!result.cancelled) {
      this.setState({ image: result });
      this.props.onImageAdded(this.state.image);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ButtonCustom
          style={styles.button}
          textStyle={styles.buttonText}
          title={'Pick Image'}
          onPress={this.pickImage}
        />
        <ButtonCustom
          style={styles.button}
          textStyle={styles.buttonText}
          title={'Take Photo'}
          onPress={this.openCamera}
        />
      </View>
    );
  }
}

AddImage.propTypes = {
  onImageAdded: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderRadius: 30,
    borderWidth: 1,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    width: 120
  },
  buttonText: {
    color: Colors.mainColor
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%'
  }
});

export default AddImage;
