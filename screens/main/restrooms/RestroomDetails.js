import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import config from '../../../config';

class RestroomDetails extends Component {
  render() {
    const { name, description, locationText, images } = this.props.navigation.getParam('restroom');

    return (
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
        <Text>{locationText}</Text>
        {images.map(image => (
          <Image
            style={styles.image}
            key={image.id}
            source={{ uri: `${config.IMAGE_BASE_URL}${image.path}` }}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100
  }
});

RestroomDetails.propTypes = {
  navigation: PropTypes.object
};

export default RestroomDetails;
