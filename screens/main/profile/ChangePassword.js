import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ChangePasswordForm } from '../../../components/profile/ChangePasswordForm';
import { changePassword } from '../../../store/actions/UserActions';
import { changePasswordErrorSelector } from '../../../store/selectors/ErrorSelector';
import Colors from '../../../constants/Colors';

class ChangePassword extends Component {
  static navigationOptions = {
    headerTitle: 'Change password',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: '#fff'
    }
  };

  static propTypes = {
    navigation: PropTypes.object,
    changePassword: PropTypes.func,
    invalidOldPasswordError: PropTypes.bool
  };

  handleSubmit = changePasswordData => {
    this.props.changePassword(changePasswordData);
  };

  render() {
    const { invalidOldPasswordError } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid>
          <ChangePasswordForm
            onSubmit={this.handleSubmit}
            invalidOldPasswordError={invalidOldPasswordError}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { invalidOldPasswordError: changePasswordErrorSelector(state) };
};

const mapDispatchToProps = { changePassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  }
});
