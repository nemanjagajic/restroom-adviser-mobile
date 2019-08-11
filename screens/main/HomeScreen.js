import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHeaderLeftNavigator } from '../../helpers';
import { userSelector } from '../../store/selectors/UserSelector';
import HomeMap from '../../components/map/HomeMap';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    const headerRight = (
      <Button
        onPress={() => navigation.navigate('AddRestroomStack')}
        title="Add Restroom"
        color="#FFB300"
      />
    );
    return { ...headerLeftNav, headerRight, title: 'Home' };
  };

  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func
  };

  state = {
    modalVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <HomeMap />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { user: userSelector(state) };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
