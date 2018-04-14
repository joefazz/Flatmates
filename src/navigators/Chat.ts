import { StackNavigator } from 'react-navigation';

import ChatList from '../containers/Groups/Chat/ChatList';
import ChatDetail from '../containers/Groups/Chat/ChatDetail';
import { Colors, Font } from '../consts';

const routeConfig = {
    ChatList: { screen: ChatList },
    ChatDetail: { screen: ChatDetail }
};

const navConfig: any = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor }
    }
};

export const ChatNavigator = StackNavigator(routeConfig, navConfig);
