import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

const CommentBottomOptions = props => {
  const handleLikePressed = () => {
    props.setCommentLiked(props.openedComment.id);
    props.likeComment(props.openedComment);
  };

  const handleUnlikePressed = () => {
    props.setCommentUnliked(props.openedComment.id);
    props.unlikeComment(props.openedComment);
  };

  return (
    <View style={styles.modalWrapper}>
      <TouchableWithoutFeedback onPress={props.closeCommentOptions}>
        <View style={styles.dimmedBackground} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        {!props.openedComment.isLikedByMe ? (
          <TouchableOpacity onPress={handleLikePressed}>
            <Text style={styles.like}>Like</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleUnlikePressed}>
            <Text style={styles.like}>Unlike</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CommentBottomOptions.propTypes = {
  openedComment: PropTypes.object,
  closeCommentOptions: PropTypes.func,
  setCommentLiked: PropTypes.func,
  likeComment: PropTypes.func,
  setCommentUnliked: PropTypes.func,
  unlikeComment: PropTypes.func
};

const styles = StyleSheet.create({
  delete: {
    color: '#ff6666',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    width: 200
  },
  dimmedBackground: {
    flex: 1
  },
  like: {
    color: '#808080',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    width: 200
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    elevation: 2,
    height: 200,
    justifyContent: 'center',
    marginTop: 150,
    paddingBottom: 100,
    paddingTop: 10,
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 2
  },
  modalWrapper: {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    flex: 1,
    height: Dimensions.get('window').height,
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 1
  }
});

export default CommentBottomOptions;
