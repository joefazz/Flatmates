import { StackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import ChatDetail from '../containers/Chat/ChatDetail';
import ChatList from '../containers/Chat/ChatList';

const routeConfig = {
    ChatList: {screen: ChatList},
    ChatDetail: {screen: ChatDetail},
};

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandPrimaryColor},
    }
};

export const ChatNavigator = StackNavigator(routeConfig, navConfig);