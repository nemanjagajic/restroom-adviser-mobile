import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import AddImage from '../../../../components/image/AddImage';

class PickRestroomImages extends Component {
  static navigationOptions = {
    headerTitle: 'Pick restroom images',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  state = {
    images: []
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
        <View style={styles.imageArea}>
          <View style={styles.imagePresentation}>
            {this.state.images.length > 0 ? (
              <ScrollView horizontal contentContainerStyle={styles.scrollView}>
                {this.state.images.map((image, index) => (
                  <Image source={image} key={index} style={styles.image} />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyImageScrollview}>
                <Ionicons name="md-images" color={'#ccc'} size={150} />
                <Text style={styles.gray}>Images will show up here after you add them</Text>
              </View>
            )}
          </View>
          <AddImage onImageAdded={this.handleImageAdded} />
        </View>
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
    bottom: 20,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginTop: 5,
    position: 'absolute',
    width: 300
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1
  },
  emptyImageScrollview: {
    alignItems: 'center',
    display: 'flex'
  },
  gray: {
    color: '#b3b3b3'
  },
  image: {
    borderRadius: 10,
    height: 300,
    margin: 5,
    width: 225
  },
  imageArea: {
    display: 'flex',
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width
  },
  imagePresentation: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center'
  },
  scrollView: {
    marginTop: 30,
    paddingLeft: 5,
    paddingRight: 5
  },
  white: {
    color: '#fff'
  }
});

export default PickRestroomImages;
