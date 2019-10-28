import React, { Component } from 'react';
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

class CommentsList extends Component {
  state = {
    scrollFetchingDisabled: false
  };

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
          style={!this.props.withoutInput && styles.bottomMargin}
          contentContainerStyle={styles.container}
          data={this.props.comments}
          renderItem={comment => <Comment {...comment} />}
          keyExtractor={comment => comment.id.toString()}
          onScroll={this.handleScroll}
          progressViewOffset={1000}
          refreshControl={
            <RefreshControl
              progressViewOffset={0}
              refreshing={this.props.isFetchingComments && !this.props.isFetchingNewComments}
              onRefresh={this.props.reloadComments}
              colors={[Colors.mainColor]}
            />
          }
          ListFooterComponent={this.renderFooter}
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
  withoutInput: PropTypes.any
};

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: 50
  },
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
