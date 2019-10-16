import React from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Comment from './Comment';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CommentsList = props => (
  <View>
    {props.comments.length > 0 ? (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.container}
        data={props.comments}
        renderItem={comment => <Comment {...comment} />}
        keyExtractor={comment => comment.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={props.isFetchingComments}
            onRefresh={props.getRestroomComments}
            colors={[Colors.mainColor]}
          />
        }
      />
    ) : (
      <View style={styles.container}>
        <TouchableOpacity style={styles.emptyListIcon} onPress={props.getRestroomComments}>
          <Ionicons name="ios-chatbubbles" color="#cccccc" size={40} />
          <Text style={styles.emptyListText}>No comments added yet</Text>
          <Text style={styles.emptyListText}>tap to reload</Text>
        </TouchableOpacity>
        {props.isFetchingComments && <ActivityIndicator style={styles.indicator} size="large" />}
      </View>
    )}
  </View>
);

CommentsList.propTypes = {
  comments: PropTypes.array,
  getRestroomComments: PropTypes.func,
  isFetchingComments: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingTop: 10,
    width: Dimensions.get('window').width
  },
  emptyListIcon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  emptyListText: {
    color: '#bfbfbf'
  },
  indicator: {
    marginTop: 10
  },
  list: {
    marginBottom: 50
  }
});

export default CommentsList;
