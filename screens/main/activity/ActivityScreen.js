import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import { FETCHING_LIMIT } from '../../../constants/Activity';
import { getMyComments } from '../../../store/actions/UserActions';
import CommentsList from '../../../components/comments/CommentList';
import {
  isFetchingMyCommentsSelector,
  isFetchingMyNewCommentsSelector,
  myCommentsSelector,
  myCommentsTotalNumberSelector
} from '../../../store/selectors/UserSelector';

class ActivityScreen extends Component {
  static navigationOptions = {
    headerTitle: 'My Activity',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  state = {
    offset: 0
  };

  componentDidMount() {
    this.reloadComments();
  }

  reloadComments = () => {
    this.setState({ offset: 0 }, () => this.handleFetchNewComments(true));
  };

  handleFetchNewComments = (isInitial = false) => {
    this.props.getMyComments({
      offset: this.state.offset,
      limit: FETCHING_LIMIT,
      isInitial
    });
    this.setState(prevState => ({ offset: prevState.offset + FETCHING_LIMIT }));
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
          withoutInput={true}
        />
      </View>
    );
  }
}

ActivityScreen.propTypes = {
  getMyComments: PropTypes.func,
  isFetchingComments: PropTypes.bool,
  comments: PropTypes.array,
  commentsTotalNumber: PropTypes.number,
  isFetchingNewComments: PropTypes.bool
};

const mapStateToProps = state => ({
  isFetchingComments: isFetchingMyCommentsSelector(state),
  isFetchingNewComments: isFetchingMyNewCommentsSelector(state),
  commentsTotalNumber: myCommentsTotalNumberSelector(state),
  comments: myCommentsSelector(state)
});

const mapDispatchToProps = {
  getMyComments
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityScreen);