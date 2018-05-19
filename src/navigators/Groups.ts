import { createMaterialTopTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { ChatNavigator } from './Chat';
import { ApplicationNavigator } from './Applications';
import { Colors, Font } from '../consts';

const routeConfig = {
    Chat: { screen: ChatNavigator },
    Applications: { screen: ApplicationNavigator }
};

const navConfig = {
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: Colors.brandPrimaryColor,
        inactiveTintColor: Colors.textGrey,
        style: { backgroundColor: Colors.offWhite },
        pressColor: Colors.definetelyNotAirbnbRed,
        indicatorStyle: { backgroundColor: Colors.brandPrimaryColor },
        labelStyle: { ...Font.FontFactory({ weight: 'Bold' }) },
        tabStyle: Platform.OS === 'ios' && { marginTop: 10 }
    },
    navigationOptions: ({ navigation }) => {
        return { tabBarVisible: navigation.state.index === 0 };
    }
};

export const GroupNavigator = createMaterialTopTabNavigator(routeConfig, navConfig);
