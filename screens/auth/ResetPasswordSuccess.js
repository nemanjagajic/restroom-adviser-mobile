import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ResetPasswordSuccess extends PureComponent {
  static navigationOptions = null;

  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid>
          <Text>{'Your password has been successfully reseted'}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text>{'Ok'}</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ResetPasswordSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
