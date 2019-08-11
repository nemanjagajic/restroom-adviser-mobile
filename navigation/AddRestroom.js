import { createStackNavigator } from 'react-navigation';
import PickRestroomLocation from '../screens/main/restrooms/addRestroom/PickRestroomLocation';
import SetRestroomInfo from '../screens/main/restrooms/addRestroom/SetRestroomInfo';

const AddRestroomStack = createStackNavigator(
  {
    SetRestroomInfo,
    PickRestroomLocation
  },
  {
    initialRouteName: 'SetRestroomInfo',
    navigationOptions: {
      header: null
    }
  }
);

export default AddRestroomStack;
