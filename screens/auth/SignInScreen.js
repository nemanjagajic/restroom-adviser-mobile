import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login, facebookLogin, googleLogin } from '../../store/actions/UserActions';
import { SignInForm } from '../../components/auth/SignInForm';
import { signInErrorSelector } from '../../store/selectors/ErrorSelector';
import ButtonCustom from '../../components/shared/button/ButtonCustom';

class SignInScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Sign in',
    headerTintColor: '#e6e6e6',
    headerTransparent: true
  };

  static propTypes = {
    navigation: PropTypes.object,
    login: PropTypes.func,
    facebookLogin: PropTypes.func,
    googleLogin: PropTypes.func,
    signInError: PropTypes.bool
  };

  onSubmit = signInData => {
    this.props.login(signInData);
  };

  goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  render() {
    const { signInError, facebookLogin, googleLogin } = this.props;

    return (
      <View style={styles.container}>
        <SignInForm onSubmit={this.onSubmit} signInError={signInError} />

        <ButtonCustom
          title={'Log in with Facebook'}
          style={styles.button}
          textStyle={styles.white}
          onPress={facebookLogin}
        />
        <ButtonCustom
          title={'Log in with Google'}
          style={styles.button}
          textStyle={styles.white}
          onPress={googleLogin}
        />
        <ButtonCustom
          title={'Sign up'}
          style={styles.button}
          textStyle={styles.white}
          onPress={this.goToSignUp}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    signInError: signInErrorSelector(state)
  };
};

const mapDispatchToProps = {
  login,
  facebookLogin,
  googleLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#404040',
    borderColor: '#595959',
    borderRadius: 20,
    borderWidth: 1,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    margin: 5,
    width: 300
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#333333',
    flex: 1,
    paddingBottom: 20
  },
  white: {
    color: '#FFF'
  }
});
