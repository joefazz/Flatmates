import { Dimensions, Platform } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height === 812 ? Platform.OS === 'ios' ? 812 - 78 : Dimensions.get('window').height : Dimensions.get('window').height;
const TotalSize = Math.sqrt((ScreenHeight * ScreenHeight) + (ScreenWidth * ScreenWidth))

const metrics = {
    screenWidth: ScreenWidth,
    screenHeight: ScreenHeight,
    totalSize: TotalSize
}

export default metrics;