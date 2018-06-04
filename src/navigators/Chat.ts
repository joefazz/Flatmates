import { createStackNavigator } from 'react-navigation';

import ChatList from '../containers/Groups/Chat/ChatList';
import ChatDetail from '../containers/Groups/Chat/ChatDetail';
import { Colors, Font } from '../consts';

const routeConfig = {
    ChatList: { screen: ChatList },
    ChatDetail: { screen: ChatDetail }
};

const navConfig: any = {
    swipeEnabled: false,
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor },
        tabBarVisible: false
    }
};

export const ChatNavigator = createStackNavigator(routeConfig, navConfig);
