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
import CommentsList from '../../../../components/comments/CommentList';
import Colors from '../../../../constants/Colors';
import { FETCHING_LIMIT } from '../../../../constants/Restrooms';

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
    return (
      <View style={styles.container}>
        <CommentsList
          comments={this.props.comments}
          commentsTotalNumber={this.props.commentsTotalNumber}
          isFetchingComments={this.props.isFetchingComments}
          isFetchingNewComments={this.props.isFetchingNewComments}
          fetchNewComments={this.handleFetchNewComments}
          reloadComments={this.reloadComments}
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
  isFetchingNewComments: PropTypes.bool
};

const mapStateToProps = state => ({
  isAddingComment: isAddingComment(state),
  isFetchingComments: isFetchingCommentsSelector(state),
  isFetchingNewComments: isFetchingNewCommentsSelector(state),
  commentsTotalNumber: commentsTotalNumberSelector(state),
  comments: restroomCommentsSelector(state)
});

const mapDispatchToProps = {
  addRestroomComment,
  getRestroomComments
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
