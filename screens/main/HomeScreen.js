import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHeaderLeftNavigator } from '../../helpers';
import { fetchRestrooms } from '../../store/actions/RestroomActions';
import { restroomsSelector } from '../../store/selectors/RestroomSelector';
import Colors from '../../constants/Colors';
import MapLocations from '../../components/map/MapLocations';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    const headerRight = (
      <TouchableOpacity
        onPress={() => navigation.navigate('SetRestroomInfo')}
        style={styles.buttonHeaderRight}
      >
        <Text style={styles.buttonHeaderRightText}>Add restroom</Text>
      </TouchableOpacity>
    );
    return { ...headerLeftNav, headerRight, title: 'Home' };
  };

  componentDidMount() {
    this.props.fetchRestrooms();
  }

  handleCalloutPressed = restroom => {
    this.props.navigation.navigate('RestroomDetails', { restroom });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapLocations
          restrooms={this.props.restrooms}
          onCalloutPressed={this.handleCalloutPressed}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  restrooms: restroomsSelector(state)
});

const mapDispatchToProps = {
  fetchRestrooms
};

HomeScreen.propTypes = {
  fetchRestrooms: PropTypes.func,
  navigation: PropTypes.object,
  logout: PropTypes.func,
  restrooms: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  buttonHeaderRight: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 5,
    display: 'flex',
    marginRight: 10,
    padding: 7,
    width: 110
  },
  buttonHeaderRightText: {
    color: '#fff'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
