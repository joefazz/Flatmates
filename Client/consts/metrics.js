import { Dimensions, Platform } from 'react-native';

export default metrics = {
    screenWidth: Dimensions.get('screen').width,
    screenHeight: Dimensions.get('screen').height === 812 ? 812 - 78 : Dimensions.get('screen').height
}