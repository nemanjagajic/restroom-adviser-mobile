import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const FeedItem = props => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        { marginTop: props.isFirst ? 20 : 0, marginBottom: props.isLast ? 50 : 10 }
      ]}
    >
      <Text>{props.restroom.id}</Text>
    </View>
  );
};

FeedItem.propTypes = {
  restroom: PropTypes.object,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderColor: '#e6e6e6',
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width * 0.9
  }
});

export default FeedItem;
