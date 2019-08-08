import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { logout } from '../../../store/actions/UserActions';
import PropTypes from 'prop-types';

class FeedsHome extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func
  };

  _signOutAsync = async () => {
    this.props.logout();
  };

  render() {
    return (
      <View>
        <Text>Feeds Home</Text>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const mapDispatchToProps = {
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(FeedsHome);
