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
        activeTintColor: Platform.OS === 'ios' ? Colors.offWhite : Colors.brandPrimaryColor,
        inactiveTintColor: Colors.textGrey,
        style: {
            backgroundColor: Platform.OS === 'ios' ? Colors.brandPrimaryColor : Colors.offWhite
        },
        pressColor: Colors.definetelyNotAirbnbRed,
        indicatorStyle: {
            backgroundColor:
                Platform.OS === 'ios' ? Colors.brandTertiaryColor : Colors.brandPrimaryColor
        },
        labelStyle: { ...Font.FontFactory({ weight: 'Bold' }) },
        tabStyle: Platform.OS === 'ios' && isIphoneX() ? { paddingTop: 30 } : { paddingTop: 15 }
    },
    navigationOptions: ({ navigation }) => {
        return { tabBarVisible: navigation.state.index === 0 };
    }
};

export const GroupNavigator = createMaterialTopTabNavigator(routeConfig, navConfig);
