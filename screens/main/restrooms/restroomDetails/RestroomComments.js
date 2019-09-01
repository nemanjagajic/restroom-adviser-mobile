import React, { Component } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroomComment, getRestroomComments } from '../../../../store/actions/RestroomActions';
import CommentInput from '../../../../components/comments/CommentInput';
import {
  isAddingComment,
  isFetchingCommentsSelector,
  restroomCommentsSelector
} from '../../../../store/selectors/RestroomSelector';
import CommentsList from '../../../../components/comments/CommentList';

class RestroomComments extends Component {
  static navigationOptions = {
    headerTitle: 'Comments'
  };

  componentDidMount() {
    this.props.getRestroomComments(this.props.navigation.getParam('restroom'));
  }

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
      <ScrollView>
        <CommentInput
          onAddComment={this.handleAddComment}
          isAddingDisabled={this.props.isAddingComment}
        />

        {!this.props.isFetchingComments && <CommentsList comments={this.props.comments} />}
        {this.props.isFetchingComments && <ActivityIndicator size="large" color="#009688" />}
      </ScrollView>
    );
  }
}

RestroomComments.propTypes = {
  navigation: PropTypes.object,
  addRestroomComment: PropTypes.func,
  isAddingComment: PropTypes.bool,
  getRestroomComments: PropTypes.func,
  comments: PropTypes.array,
  isFetchingComments: PropTypes.bool
};

const mapStateToProps = state => ({
  isAddingComment: isAddingComment(state),
  comments: restroomCommentsSelector(state),
  isFetchingComments: isFetchingCommentsSelector(state)
});

const mapDispatchToProps = {
  addRestroomComment,
  getRestroomComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestroomComments);
