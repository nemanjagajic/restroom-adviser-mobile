import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroomComment } from '../../../../store/actions/RestroomActions';
import CommentInput from '../../../../components/comments/CommentInput';
import {
  isAddingComment,
  isFetchingCommentsSelector,
  restroomCommentsSelector
} from '../../../../store/selectors/RestroomSelector';
import CommentsList from '../../../../components/comments/CommentList';
import Colors from '../../../../constants/Colors';

class RestroomComments extends Component {
  static navigationOptions = {
    headerTitle: 'Comments',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  handleAddComment = commentContent => {
    if (commentContent) {
      this.props.addRestroomComment({
        restroom: this.props.navigation.getParam('restroom'),
        content: commentContent
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {!this.props.isFetchingComments && <CommentsList comments={this.props.comments} />}
          {this.props.isFetchingComments && (
            <ActivityIndicator style={styles.indicator} size="large" color="#009688" />
          )}
        </ScrollView>
        <CommentInput
          onAddComment={this.handleAddComment}
          isAddingDisabled={this.props.isAddingComment}
        />
      </View>
    );
  }
}

RestroomComments.propTypes = {
  navigation: PropTypes.object,
  addRestroomComment: PropTypes.func,
  isAddingComment: PropTypes.bool,
  isFetchingComments: PropTypes.bool,
  comments: PropTypes.array
};

const mapStateToProps = state => ({
  isAddingComment: isAddingComment(state),
  isFetchingComments: isFetchingCommentsSelector(state),
  comments: restroomCommentsSelector(state)
});

const mapDispatchToProps = {
  addRestroomComment
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicator: {
    marginTop: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestroomComments);
