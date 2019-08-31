import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroomComment } from '../../../../store/actions/RestroomActions';

class RestroomComments extends Component {
  state = {
    content: ''
  };

  render() {
    return (
      <View>
        <TextInput
          onChangeText={text => this.setState({ content: text })}
          value={this.state.content}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.addRestroomComment({
              restroom: this.props.navigation.getParam('restroom'),
              content: this.state.content
            })
          }
        >
          <Text>Add comment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

RestroomComments.propTypes = {
  navigation: PropTypes.object,
  addRestroomComment: PropTypes.func
};

const mapDispatchToProps = {
  addRestroomComment
};

export default connect(
  null,
  mapDispatchToProps
)(RestroomComments);
