import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHeaderLeftNavigator } from '../../helpers';
import { fetchRestrooms } from '../../store/actions/RestroomActions';
import { restroomsSelector } from '../../store/selectors/RestroomSelector';
import Colors from '../../constants/Colors';
import MapLocations from '../../components/map/MapLocations';
import ButtonCustom from '../../components/shared/button/ButtonCustom';

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

  openRestroomDetails = restroomId => {
    const restroom = this.props.restrooms.find(restroom => restroom.id === restroomId);
    this.props.navigation.navigate('RestroomDetails', { restroom });
  };

  render() {
    const selectedRestroomId = this.props.navigation.getParam('selectedRestroomId');

    return (
      <View style={styles.container}>
        {selectedRestroomId && (
          <View style={styles.buttonsWrapper}>
            <ButtonCustom
              title={'Clear selected'}
              onPress={() => this.props.navigation.setParams({ selectedRestroomId: null })}
              style={styles.button}
              textStyle={styles.buttonText}
            />
            <ButtonCustom
              title={'Open selected'}
              onPress={() => this.openRestroomDetails(selectedRestroomId)}
              style={styles.buttonOpen}
              textStyle={styles.buttonText}
            />
          </View>
        )}
        <MapLocations
          restrooms={this.props.restrooms}
          onCalloutPressed={this.handleCalloutPressed}
          selectedRestroomId={selectedRestroomId}
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
  button: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    zIndex: 1
  },
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
  buttonOpen: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    zIndex: 1
  },
  buttonText: {
    color: '#808080',
    fontSize: 14
  },
  buttonsWrapper: {
    position: 'absolute',
    right: 10,
    top: 15
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
