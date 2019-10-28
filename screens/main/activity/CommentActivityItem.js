import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Colors from '../../../constants/Colors';
import { Icon } from 'expo';

class CommentActivityItem extends React.Component {
  render() {
    const { content, created_at: createdAt, restroom } = this.props.item;
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={[styles.container, { marginTop: this.props.index === 0 ? 10 : 0 }]}>
        <View style={styles.commentWrapper}>
          <Text style={styles.headerWrapper}>
            <Text style={styles.headerText}>{'You\'ve commented on '}</Text>
            <Text style={styles.restroomNameText}>{`${restroom.name} `}</Text>
            <Text style={styles.headerText}>{moment(createdAt).fromNow()}</Text>
          </Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.likeWrapper}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('RestroomComments', { restroom, isFromActivity: true })
            }
            style={styles.open}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon.Ionicons name="md-open" size={22} style={styles.icon} color={'#ccc'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CommentActivityItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  navigation: PropTypes.object,
  getRestroomRatings: PropTypes.func
};

const styles = StyleSheet.create({
  commentWrapper: {
    flex: 1
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
  headerText: {
    color: '#a6a6a6'
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  likeWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10
  },
  open: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    display: 'flex',
    elevation: 1,
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  restroomNameText: {
    color: Colors.mainColor
  }
});

export default CommentActivityItem;
