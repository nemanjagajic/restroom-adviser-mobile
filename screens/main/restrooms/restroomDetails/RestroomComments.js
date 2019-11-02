import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRestroomComment, getRestroomComments } from '../../../../store/actions/RestroomActions';
import CommentInput from '../../../../components/comments/CommentInput';
import {
  commentsTotalNumberSelector,
  isAddingComment,
  isFetchingCommentsSelector,
  isFetchingNewCommentsSelector,
  restroomCommentsSelector
} from '../../../../store/selectors/RestroomSelector';
import CommentsList from '../../../../components/comments/CommentsList';
import Colors from '../../../../constants/Colors';
import { FETCHING_LIMIT } from '../../../../constants/Restrooms';
import {
  likeComment,
  setCommentLiked,
  setCommentUnliked,
  unlikeComment
} from '../../../../store/actions/UserActions';
import { isAddingLikeInfoSelector } from '../../../../store/selectors/UserSelector';

class RestroomComments extends Component {
  static navigationOptions = {
    headerTitle: 'Comments',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  state = {
    offset: 0,
    isFilterModalVisible: false,
    selectedFilterRating: null,
    appliedFilterRating: null,
    searchValue: ''
  };

  componentDidMount() {
    this.setState({
      offset: Math.ceil(this.props.comments.length / FETCHING_LIMIT) * FETCHING_LIMIT
    });

    if (this.props.navigation.getParam('isFromActivity')) {
      this.reloadComments();
    }
  }

  reloadComments = () => {
    this.setState({ offset: 0 }, () => this.handleFetchNewComments(true));
  };

  handleFetchNewComments = (isInitial = false) => {
    this.props.getRestroomComments({
      restroom: this.props.navigation.getParam('restroom'),
      offset: this.state.offset,
      limit: FETCHING_LIMIT,
      isInitial
    });
    this.setState(prevState => ({ offset: prevState.offset + FETCHING_LIMIT }));
  };

  handleAddComment = commentContent => {
    if (commentContent) {
      this.props.addRestroomComment({
        restroom: this.props.navigation.getParam('restroom'),
        content: commentContent
      });
      this.setState({ offset: FETCHING_LIMIT });
    }
  };

  render() {
    const shouldShowComments =
      this.props.navigation.getParam('isFromActivity') && this.props.isFetchingComments;

    return (
      <View style={styles.container}>
        <CommentsList
          comments={shouldShowComments ? [] : this.props.comments}
          commentsTotalNumber={this.props.commentsTotalNumber}
          isFetchingComments={this.props.isFetchingComments}
          isFetchingNewComments={this.props.isFetchingNewComments}
          fetchNewComments={this.handleFetchNewComments}
          reloadComments={this.reloadComments}
          likeComment={this.props.likeComment}
          unlikeComment={this.props.unlikeComment}
          setCommentLiked={this.props.setCommentLiked}
          setCommentUnliked={this.props.setCommentUnliked}
          isAddingLikeInfo={this.props.isAddingLikeInfo}
        />
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
  comments: PropTypes.array,
  getRestroomComments: PropTypes.func,
  commentsTotalNumber: PropTypes.number,
  isFetchingNewComments: PropTypes.bool,
  likeComment: PropTypes.func,
  unlikeComment: PropTypes.func,
  setCommentLiked: PropTypes.func,
  setCommentUnliked: PropTypes.func,
  isAddingLikeInfo: PropTypes.bool
};

const mapStateToProps = state => ({
  isAddingComment: isAddingComment(state),
  isFetchingComments: isFetchingCommentsSelector(state),
  isFetchingNewComments: isFetchingNewCommentsSelector(state),
  commentsTotalNumber: commentsTotalNumberSelector(state),
  comments: restroomCommentsSelector(state),
  isAddingLikeInfo: isAddingLikeInfoSelector(state)
});

const mapDispatchToProps = {
  addRestroomComment,
  getRestroomComments,
  likeComment,
  unlikeComment,
  setCommentLiked,
  setCommentUnliked
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestroomComments);
