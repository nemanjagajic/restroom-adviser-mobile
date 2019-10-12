import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, ImagePicker } from 'expo';

import { updateUser } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import { UpdateProfileForm } from '../../../components/profile/UpdateProfileForm';
import Picture from '../../../components/shared/Picture';
import NoPermissionsForCameraModal from '../../../components/shared/modal/NoPermissionsForCameraModal';
import defaultAvatar from '../../../assets/images/robot-dev.png';
import Colors from '../../../constants/Colors';

class EditProfile extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.mainColorDarker
    }
  };

  static propTypes = {
    navigation: PropTypes.object,
    updateUser: PropTypes.func,
    user: PropTypes.object
  };

  state = {
    image: '',
    permissionsModalVisible: false,
    isKeyboardOpened: false
  };

  constructor(props) {
    super(props);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    this.setState({ isKeyboardOpened: true });
  }

  keyboardDidHide() {
    this.setState({ isKeyboardOpened: false });
  }

  handleSubmit = updateUserData => {
    this.props.updateUser({ ...updateUserData, avatar: this.state.image });
  };

  closePermissionsModal = () => {
    this.setState({ permissionsModalVisible: false });
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [3, 4]
    });

    this.setImage(result);
  };

  openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4]
    });

    this.setImage(result);
  };

  setImage = image => {
    if (!image.cancelled) {
      this.setState({
        image: image
      });
    }
  };

  render() {
    const { user } = this.props;
    const { permissionsModalVisible, image } = this.state;

    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        {!this.state.isKeyboardOpened && (
          <View style={styles.header}>
            {image !== '' || user.avatar !== null ? (
              <Picture style={styles.image} source={image} uri={user.avatar} />
            ) : (
              <Picture style={styles.image} source={defaultAvatar} />
            )}
            <View style={styles.changeImageContainer}>
              <TouchableOpacity onPress={this.openImagePicker}>
                <Icon.Ionicons name="md-images" size={28} style={styles.icon} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openCamera}>
                <Icon.Ionicons name="md-camera" size={28} style={styles.icon} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.borderLine} />
        <KeyboardAwareScrollView enableOnAndroid>
          <UpdateProfileForm onSubmit={this.handleSubmit} user={user} />
        </KeyboardAwareScrollView>
        <NoPermissionsForCameraModal
          isVisible={permissionsModalVisible}
          closeModal={this.closePermissionsModal}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return { user: userSelector(state) };
};

const mapDispatchToProps = { updateUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

const styles = StyleSheet.create({
  borderLine: {
    backgroundColor: Colors.mainColorDarker,
    height: 40,
    marginBottom: 30,
    width: '100%'
  },
  changeImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: 100
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#26A69A',
    height: 200,
    justifyContent: 'center',
    width: '100%'
  },
  image: {
    backgroundColor: '#f2f2f2',
    borderColor: '#f2f2f2',
    borderRadius: 60,
    borderWidth: 1,
    height: 120,
    width: 120
  }
});
