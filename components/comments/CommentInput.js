import React, { Component } from 'react';
import { Dimensions, StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';

class CommentInput extends Component {
  state = {
    text: ''
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={'Leave a comment...'}
          multiline={true}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <TouchableOpacity
          style={
            this.props.isAddingDisabled || this.state.text === ''
              ? styles.postButtonInactive
              : styles.postButtonActive
          }
          onPress={() => {
            this.props.onAddComment(this.state.text);
            this.setState({ text: '' });
          }}
        >
          <Text style={styles.text}>Post</Text>
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
    marginBottom: 10,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 15,
    width: Dimensions.get('window').width * 0.9
  },
  postButtonActive: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  postButtonInactive: {
    alignItems: 'center',
    backgroundColor: '#999999',
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 5
  },
  textInput: {
    backgroundColor: '#FFF',
    borderColor: '#bfbfbf',
    borderRadius: 10,
    borderWidth: 1,
    color: '#737373',
    marginBottom: 5,
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  }
});

export default CommentInput;
