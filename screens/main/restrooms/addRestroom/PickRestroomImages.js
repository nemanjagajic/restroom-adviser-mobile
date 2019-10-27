import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ButtonCustom from '../../../../components/shared/button/ButtonCustom';
import Colors from '../../../../constants/Colors';
import AddImage from '../../../../components/image/AddImage';
import { isAddingRestroomSelector } from '../../../../store/selectors/RestroomSelector';
import { addRestroom } from '../../../../store/actions/RestroomActions';

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

  handleImageAdded = image => {
    this.setState(prevState => ({
      images: prevState.images.concat(image)
    }));
  };

  removeImage = image => {
    this.setState(prevState => ({
      images: prevState.images.filter(currentImage => currentImage.uri !== image.uri)
    }));
  };

  addRestroom = () => {
    this.props.addRestroom({
      name: this.props.navigation.getParam('name'),
      description: this.props.navigation.getParam('description'),
      working_hours: this.props.navigation.getParam('workingHours'),
      latitude: this.props.navigation.getParam('latitude'),
      longitude: this.props.navigation.getParam('longitude'),
      location_text: this.props.navigation.getParam('locationInfo'),
      images: this.state.images
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageArea}>
          <View style={styles.imagePresentation}>
            {this.state.images.length > 0 ? (
              <ScrollView
                horizontal
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}
              >
                {this.state.images.map((image, index) => (
                  <View key={index}>
                    <Image source={image} style={styles.image} />
                    <TouchableOpacity style={styles.close} onPress={() => this.removeImage(image)}>
                      <Ionicons color={'#555'} name="ios-close-circle" size={34} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyImageScrollview}>
                <Ionicons name="md-images" color={'#ccc'} size={150} />
                <Text style={styles.gray}>Images will show up here after you add them</Text>
              </View>
            )}
          </View>
        </View>
        <AddImage onImageAdded={this.handleImageAdded} />
        <View style={styles.nextButtonWrapper}>
          <ButtonCustom
            disabled={this.props.isAddingRestroom}
            title={this.props.isAddingRestroom ? 'Adding restroom... ' : 'Add restroom'}
            style={this.props.isAddingRestroom ? styles.buttonAdding : styles.button}
            textStyle={
              this.props.isAddingRestroom ? styles.addButtonTextAdding : styles.addButtonText
            }
            onPress={this.addRestroom}
          />
          <View style={styles.dotWrapper}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dotFilled} />
          </View>
        </View>
      </View>
    );
  }
}

PickRestroomImages.propTypes = {
  navigation: PropTypes.object,
  onSubmit: PropTypes.func,
  invalidOldPasswordError: PropTypes.bool,
  setAddingRestroomInfo: PropTypes.func,
  addRestroom: PropTypes.func,
  isAddingRestroom: PropTypes.bool
};

const mapStateToProps = state => ({
  isAddingRestroom: isAddingRestroomSelector(state)
});

const mapDispatchToProps = {
  addRestroom
};

const styles = StyleSheet.create({
  addButtonText: {
    color: '#fff',
    fontSize: 16
  },
  addButtonTextAdding: {
    color: '#999999',
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 30,
    display: 'flex',
    elevation: 1,
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
    width: 300
  },
  buttonAdding: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    display: 'flex',
    elevation: 1,
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
    width: 300
  },
  close: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    display: 'flex',
    height: 29,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 29
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1
  },
  dot: {
    borderColor: '#ccc',
    borderRadius: 100,
    borderWidth: 1,
    height: 10,
    width: 10
  },
  dotFilled: {
    backgroundColor: Colors.mainColor,
    borderColor: Colors.mainColor,
    borderRadius: 100,
    borderWidth: 1,
    height: 10,
    width: 10
  },
  dotWrapper: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80
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
    height: Dimensions.get('window').height * 0.55,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width
  },
  imagePresentation: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    flex: 1,
    justifyContent: 'center'
  },
  nextButtonWrapper: {
    bottom: 10,
    position: 'absolute'
  },
  scrollView: {
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickRestroomImages);
