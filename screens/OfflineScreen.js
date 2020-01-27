import React, { PureComponent } from 'react';
import { View, Text, BackHandler } from 'react-native';

class OfflineScreen extends PureComponent {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View>
        <Text>{'Please check your Internet connection'}</Text>
      </View>
    );
  }
}
export default OfflineScreen;
