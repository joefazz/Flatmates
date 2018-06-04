import { createMaterialTopTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { ChatNavigator } from './Chat';
import { ApplicationNavigator } from './Applications';
import { Colors, Font } from '../consts';

const routeConfig = {
    Chat: { screen: ChatNavigator },
    Applications: { screen: ApplicationNavigator }
};

const navConfig = {
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: Colors.brandPrimaryColor,
        inactiveTintColor: Colors.textGrey,
        style: { backgroundColor: Colors.offWhite },
        pressColor: Colors.definetelyNotAirbnbRed,
        indicatorStyle: { backgroundColor: Colors.brandPrimaryColor },
        labelStyle: { ...Font.FontFactory({ weight: 'Bold' }) },
        tabStyle: Platform.OS === 'ios' && isIphoneX() ? { marginTop: 30 } : { marginTop: 10 }
    },
    navigationOptions: ({ navigation }) => {
        return { tabBarVisible: navigation.state.index === 0 };
    }
};

export const GroupNavigator = createMaterialTopTabNavigator(routeConfig, navConfig);
