import React, { Component } from 'react';
import { Dimensions, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';
import { Icon } from 'expo';

class CommentInput extends Component {
  state = {
    text: '',
    isKeyboardOpened: false,
    keyboardEndCoordinates: 0
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

  keyboardDidShow(e) {
    this.setState({ isKeyboardOpened: true, keyboardEndCoordinates: e.endCoordinates.height });
  }

  keyboardDidHide() {
    this.setState({ isKeyboardOpened: false, keyboardEndCoordinates: 1 });
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            bottom: this.state.isKeyboardOpened ? this.state.keyboardEndCoordinates : 0
          }
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder={'Leave a comment...'}
          multiline={true}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.onAddComment(this.state.text);
            this.setState({ text: '' });
          }}
        >
          <Icon.Ionicons
            name="md-send"
            size={28}
            color={
              this.props.isAddingDisabled || this.state.text === '' ? '#ccc' : Colors.mainColor
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

CommentInput.propTypes = {
  isAddingDisabled: PropTypes.bool,
  onAddComment: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#e6e6e6',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 1
  },
  textInput: {
    color: '#737373',
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  }
});

export default CommentInput;
