import React from 'react';
import { FlatList, StyleSheet, Dimensions, View, Text } from 'react-native';
import Comment from './Comment';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

const CommentsList = props => (
  <View>
    {props.comments.length > 0 ? (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.container}
        data={props.comments}
        renderItem={comment => <Comment {...comment} />}
        keyExtractor={comment => comment.id.toString()}
      />
    ) : (
      <View style={styles.container}>
        <Ionicons name="ios-chatbubbles" color="#bfbfbf" size={40} />
        <Text style={styles.emptyListText}>No comments added yet</Text>
      </View>
    )}
  </View>
);

CommentsList.propTypes = {
  comments: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    width: Dimensions.get('window').width
  },
  emptyListText: {
    color: '#b3b3b3'
  },
  list: {
    marginBottom: 40
  }
});

export default CommentsList;
