import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHeaderLeftNavigator } from '../../helpers';
import { fetchRestrooms } from '../../store/actions/RestroomActions';
import { restroomsSelector } from '../../store/selectors/RestroomSelector';
import Colors from '../../constants/Colors';
import MapLocations from '../../components/map/MapLocations';
import ButtonCustom from '../../components/shared/button/ButtonCustom';
// import { Ionicons } from '@expo/vector-icons';
// import config from '../../config';
import StarRating from 'react-native-star-rating';

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
    return {
      ...headerLeftNav,
      headerRight,
      title: 'Home',
      headerTintColor: Colors.headerTintColor,
      headerStyle: {
        backgroundColor: '#fff'
      }
    };
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

  handleMarkerPressed = restroom => {
    this.props.navigation.setParams({ restroom });
  };

  clearSelectedRestroom = () => {
    if (this.props.navigation.getParam('restroom') !== null) {
      this.props.navigation.setParams({ restroom: null });
    }
  };

  render() {
    const selectedRestroom = this.props.navigation.getParam('restroom');

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.clearSelectedRestroom}
        activeOpacity={1}
      >
        <MapLocations
          restrooms={this.props.restrooms}
          onCalloutPressed={this.handleCalloutPressed}
          selectedRestroomId={selectedRestroom ? selectedRestroom.id : -1}
          onMarkerPressed={this.handleMarkerPressed}
        />
        {selectedRestroom && (
          <TouchableOpacity style={styles.selectedRestroom} activeOpacity={1}>
            <View style={styles.restroomDetails}>
              <Text style={styles.name}>{selectedRestroom.name}</Text>
              <Text style={styles.location}>{selectedRestroom.location_text}</Text>
              <View style={styles.voteStars}>
                {/*<Text style={styles.voteNumber}>{selectedRestroom.rating.totalRating}</Text>*/}
                <StarRating
                  disabled={true}
                  maxStars={5}
                  // rating={selectedRestroom.rating.totalRating}
                  starSize={18}
                  emptyStarColor={Colors.mainColor}
                  fullStarColor={Colors.mainColor}
                />
                <Text style={styles.numberOfVotes}>
                  {/*{` (${selectedRestroom.rating.numberOfRatings} votes)`}*/}
                </Text>
              </View>
            </View>
            <View style={styles.buttonsWrapper}>
              <ButtonCustom
                title={'Open details'}
                onPress={() => this.openRestroomDetails(selectedRestroom.id)}
                style={styles.buttonOpen}
                textStyle={styles.buttonText}
              />
              <ButtonCustom
                title={'Clear selected'}
                onPress={this.clearSelectedRestroom}
                style={styles.button}
                textStyle={styles.buttonText}
              />
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 5,
    padding: 7,
    zIndex: 1
  },
  buttonHeaderRight: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
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
    marginRight: 5,
    padding: 7,
    zIndex: 1
  },
  buttonText: {
    color: '#999999',
    fontSize: 14
  },
  buttonsWrapper: {
    bottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    position: 'absolute',
    width: Dimensions.get('window').width * 0.95
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  location: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 5
  },
  name: {
    color: '#808080',
    fontSize: 18
  },
  numberOfVotes: {
    color: '#999999',
    fontSize: 12
  },
  restroomDetails: {
    marginLeft: 10,
    marginTop: 5
  },
  selectedRestroom: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    bottom: 5,
    elevation: 3,
    height: Dimensions.get('window').height * 0.2,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: Dimensions.get('window').width * 0.95,
    zIndex: 2
  },
  // voteNumber: {
  //   color: Colors.mainColor,
  //   marginRight: 5
  // },
  voteStars: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
