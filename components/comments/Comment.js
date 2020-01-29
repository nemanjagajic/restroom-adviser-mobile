import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import poopEmojiIcon from '../../assets/images/poop-emoji.png';
import likeFilled from '../../assets/images/filled.png';
import likeOutlined from '../../assets/images/outlined.png';
import config from '../../config';
const { IMAGE_BASE_URL } = config;

class Comment extends React.PureComponent {
  handleLikePressed = () => {
    if (!this.props.isAddingLikeInfo) {
      if (this.props.item.isLikedByMe) {
        this.props.setCommentUnliked(this.props.item.id);
        this.props.unlikeComment(this.props.item);
      } else {
        this.props.setCommentLiked(this.props.item.id);
        this.props.likeComment(this.props.item);
      }
    }
  };

  render() {
    const { content, user, created_at: createdAt, numberOfLikes, isLikedByMe } = this.props.item;
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={[styles.container, { marginTop: this.props.index === 0 ? 10 : 0 }]}>
        <Image
          style={user.avatar ? styles.image : styles.imageWithBorder}
          source={
            user.avatar
              ? {
                uri: user.avatar.startsWith('http')
                  ? user.avatar
                  : `${IMAGE_BASE_URL}${user.avatar}`
              }
              : poopEmojiIcon
          }
        />
        <View style={styles.commentWrapper}>
          <Text style={styles.userFullName}>{`${user.first_name}  ${user.last_name}`}</Text>
          <Text style={styles.content}>{content}</Text>
          <Text style={styles.createdAtText}>{moment(createdAt).fromNow()}</Text>
        </View>
        <View style={styles.likeWrapper}>
          <TouchableOpacity
            onPress={this.handleLikePressed}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image style={styles.likeButton} source={isLikedByMe ? likeFilled : likeOutlined} />
          </TouchableOpacity>
          <Text style={styles.likeNumberText}>{numberOfLikes}</Text>
        </View>
      </View>
    );
  }
}

Comment.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  likeComment: PropTypes.func,
  unlikeComment: PropTypes.func,
  setCommentLiked: PropTypes.func,
  setCommentUnliked: PropTypes.func,
  isAddingLikeInfo: PropTypes.bool
};

const styles = StyleSheet.create({
  commentWrapper: {
    width: Dimensions.get('window').width * 0.6
  },
  container: {
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: '5%',
    marginRight: '5%',
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  content: {
    color: '#666666',
    paddingRight: 5,
    paddingTop: 10
  },
  createdAtText: {
    color: '#b3b3b3',
    fontSize: 12,
    paddingRight: 10,
    paddingTop: 10
  },
  image: {
    borderRadius: 50,
    height: 50,
    marginRight: 10,
    width: 50
  },
  imageWithBorder: {
    borderColor: '#ccc',
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    marginRight: 10,
    width: 50
  },
  likeButton: {
    height: 30,
    width: 30
  },
  likeNumberText: {
    color: '#ccc'
  },
  likeWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 5
  },
  userFullName: {
    color: '#a6a6a6'
  }
});

export default Comment;
