import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';
import poopEmojiIcon from '../../assets/images/poop-emoji.png';

class Comment extends React.Component {
  render() {
    const { content, user } = this.props.item;
    return (
      <View style={styles.container}>
        <Image
          style={user.avatar ? styles.image : styles.imageWithBorder}
          source={user.avatar ? { uri: user.avatar } : poopEmojiIcon}
        />
        <View style={styles.commentWrapper}>
          <Text style={styles.userFullName}>{`${user.first_name}  ${user.last_name}`}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  }
}

Comment.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  commentWrapper: {
    width: Dimensions.get('window').width * 0.7
  },
  container: {
    backgroundColor: '#f7f7f7',
    borderColor: '#d9d9d9',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: '5%',
    marginRight: '5%',
    padding: 10,
    width: Dimensions.get('window').width * 0.9
  },
  content: {
    color: '#666666'
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
  userFullName: {
    color: Colors.mainColor
  }
});

export default Comment;
