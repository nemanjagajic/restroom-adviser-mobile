import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';

import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import AddImage from '../../../../components/image/AddImage';

class PickRestroomImages extends Component {
  state = {
    images: []
  };

  static navigationOptions = {
    headerTitle: 'Pick restroom images'
  };

  handleNext = () => {
    this.props.navigation.navigate('PickRestroomLocation', {
      name: this.props.navigation.getParam('name'),
      description: this.props.navigation.getParam('description'),
      images: this.state.images
    });
  };

  handleImageAdded = image => {
    this.setState(prevState => ({
      images: prevState.images.concat(image)
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.images[0]} style={styles.imagePlaceholder} />
        <Image source={this.state.images[1]} style={styles.imagePlaceholder} />
        <AddImage onImageAdded={this.handleImageAdded} />
        <ButtonCustom
          title={'Next'}
          style={styles.button}
          textStyle={styles.white}
          onPress={this.handleNext}
        />
      </View>
    );
  }
}

PickRestroomImages.propTypes = {
  navigation: PropTypes.object,
  onSubmit: PropTypes.func,
  invalidOldPasswordError: PropTypes.bool,
  setAddingRestroomInfo: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 20,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginTop: 5,
    width: 300
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'center'
  },
  imagePlaceholder: {
    height: 100,
    width: 100
  },
  white: {
    color: '#fff'
  }
});

export default PickRestroomImages;
