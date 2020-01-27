import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/UserActions';
import * as Icon from '@expo/vector-icons';

class LeftSliderScreen extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditProfile')}
            style={styles.button}
          >
            <Icon.Ionicons name="md-person" size={24} style={styles.icon} color={'#808080'} />
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyRestrooms')}
            style={styles.button}
          >
            <Icon.Ionicons name="md-albums" size={24} style={styles.icon} color={'#808080'} />
            <Text style={styles.buttonText}>{'My restrooms'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ActivityDrawer')}
            style={styles.button}
          >
            <Icon.Ionicons name="md-trending-up" size={24} style={styles.icon} color={'#808080'} />
            <Text style={styles.buttonText}>{'My activity'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyBookmarks')}
            style={styles.button}
          >
            <Icon.Ionicons name="md-bookmarks" size={24} style={styles.icon} color={'#808080'} />
            <Text style={styles.buttonText}>{'Bookmarked restrooms'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChangePassword')}
            style={styles.button}
          >
            <Icon.Ionicons name="md-lock" size={24} style={styles.icon} color={'#808080'} />
            <Text style={styles.buttonText}>{'Change password'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.logout} style={styles.buttonLogout}>
            <Icon.Ionicons name="md-log-out" size={24} style={styles.icon} color={'#808080'} />
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

LeftSliderScreen.propTypes = {
  logout: PropTypes.func
};

const mapDispatchToProps = {
  logout
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 20
  },
  buttonLogout: {
    alignItems: 'center',
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    width: '100%'
  },
  buttonText: {
    color: '#808080',
    fontSize: 16
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  icon: {
    marginRight: 15
  }
});

export default connect(
  null,
  mapDispatchToProps
)(LeftSliderScreen);
