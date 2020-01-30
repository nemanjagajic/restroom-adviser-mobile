import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import * as Icon from '@expo/vector-icons';

import { updateUser } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import { UpdateProfileForm } from '../../../components/profile/UpdateProfileForm';
import NoPermissionsForCameraModal from '../../../components/shared/modal/NoPermissionsForCameraModal';
import defaultAvatar from '../../../assets/images/poop-emoji.png';
import Colors from '../../../constants/Colors';
import config from '../../../config';
const { IMAGE_BASE_URL } = config;

class EditProfile extends PureComponent {
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
    isKeyboardOpened: false,
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name
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
      aspect: [3, 4],
      quality: 0.4
    });

    this.setImage(result);
  };

  openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.4
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

  onFirstNameChange = firstName => {
    this.setState({ firstName });
  };

  onLastNameChange = lastName => {
    this.setState({ lastName });
  };

  isProfileEdited = () => {
    const user = this.props.user;
    return (
      this.state.firstName !== user.first_name ||
      this.state.lastName !== user.last_name ||
      this.state.image !== ''
    );
  };

  render() {
    const { user } = this.props;
    const { permissionsModalVisible, image } = this.state;

    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        {!this.state.isKeyboardOpened && (
          <View style={styles.header}>
            {image !== '' || user.avatar !== null ? (
              <Image
                style={styles.image}
                source={
                  image || {
                    uri: user.avatar.startsWith('http')
                      ? user.avatar
                      : `${IMAGE_BASE_URL}${user.avatar}`
                  }
                }
              />
            ) : (
              <Image style={styles.image} source={defaultAvatar} />
            )}
            <View style={styles.changeImageContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={this.openImagePicker}>
                <Icon.Ionicons name="md-images" size={28} style={styles.icon} color={'#808080'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageButton} onPress={this.openCamera}>
                <Icon.Ionicons name="md-camera" size={28} style={styles.icon} color={'#808080'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <KeyboardAwareScrollView>
          <UpdateProfileForm
            onSubmit={this.handleSubmit}
            user={user}
            onFirstNameChange={this.onFirstNameChange}
            onLastNameChange={this.onLastNameChange}
            isProfileEdited={this.isProfileEdited()}
          />
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
  changeImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#26A69A',
    height: 240,
    justifyContent: 'center',
    width: '100%'
  },
  image: {
    backgroundColor: '#f2f2f2',
    borderColor: '#f2f2f2',
    borderRadius: 100,
    borderWidth: 1,
    height: 150,
    width: 150
  },
  imageButton: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    display: 'flex',
    elevation: 2,
    height: 45,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: 45,
    zIndex: 2
  }
});
