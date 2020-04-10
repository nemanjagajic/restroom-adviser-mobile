import React, { PureComponent } from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import Comment from './Comment';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import CommentActivityItem from '../activity/CommentActivityItem';

class CommentsList extends PureComponent {
  state = {
    scrollFetchingDisabled: false,
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

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  };

  enableFetching = milliseconds => {
    setTimeout(() => this.setState({ scrollFetchingDisabled: false }), milliseconds);
  };

  handleScroll = ({ nativeEvent }) => {
    const shouldHandleScroll =
      this.isCloseToBottom(nativeEvent) &&
      !this.state.scrollFetchingDisabled &&
      !this.props.isFetchingNewComments &&
      this.props.comments.length < this.props.commentsTotalNumber;

    if (shouldHandleScroll) {
      this.setState({ scrollFetchingDisabled: true });
      this.enableFetching(400);
      this.props.fetchNewComments();
    }
  };

  renderFooter = () => {
    return (
      <View style={styles.indicatorPlaceholder}>
        {this.props.isFetchingNewComments && <ActivityIndicator size="large" />}
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          style={{
            ...(!this.props.isActivityItem && {
              marginBottom: this.state.isKeyboardOpened
                ? this.state.keyboardEndCoordinates + 120
                : 50
            })
          }}
          contentContainerStyle={styles.container}
          data={this.props.comments}
          renderItem={comment => {
            if (this.props.isActivityItem) {
              return <CommentActivityItem {...comment} navigation={this.props.navigation} />;
            }

            return (
              <Comment
                {...comment}
                likeComment={this.props.likeComment}
                unlikeComment={this.props.unlikeComment}
                setCommentLiked={this.props.setCommentLiked}
                setCommentUnliked={this.props.setCommentUnliked}
                isAddingLikeInfo={this.props.isAddingLikeInfo}
                openCommentOptions={this.props.openCommentOptions}
              />
            );
          }}
          keyExtractor={comment => comment.id.toString()}
          onScroll={this.handleScroll}
          progressViewOffset={1000}
          refreshControl={
            <RefreshControl
              progressViewOffset={this.props.headerComponent ? 60 : 0}
              refreshing={this.props.isFetchingComments && !this.props.isFetchingNewComments}
              onRefresh={this.props.reloadComments}
              colors={[Colors.mainColor]}
            />
          }
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.props.headerComponent || null}
        />
        {this.props.comments.length === 0 &&
          !this.props.isFetchingComments && (
          <View style={styles.container}>
            <TouchableOpacity style={styles.emptyListIcon} onPress={this.props.reloadComments}>
              <Ionicons name="ios-chatbubbles" color="#cccccc" size={40} />
              <Text style={styles.emptyListText}>No comments added yet</Text>
              <Text style={styles.emptyListText}>tap to reload</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  getRestroomComments: PropTypes.func,
  isFetchingComments: PropTypes.bool,
  fetchNewComments: PropTypes.func,
  commentsTotalNumber: PropTypes.number,
  isFetchingNewComments: PropTypes.bool,
  reloadComments: PropTypes.func,
  withoutInput: PropTypes.any,
  headerComponent: PropTypes.any,
  isActivityItem: PropTypes.any,
  navigation: PropTypes.any,
  likeComment: PropTypes.func,
  unlikeComment: PropTypes.func,
  setCommentLiked: PropTypes.func,
  setCommentUnliked: PropTypes.func,
  isAddingLikeInfo: PropTypes.bool,
  openCommentOptions: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: Dimensions.get('window').width
  },
  emptyListIcon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15
  },
  emptyListText: {
    color: '#bfbfbf'
  },
  indicatorPlaceholder: {
    height: 50
  }
});

export default CommentsList;
