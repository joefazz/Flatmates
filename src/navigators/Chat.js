import { StackNavigator } from 'react-navigation';

import ChatList from '../containers/Chat/ChatList';
import ChatDetail from '../containers/Chat/ChatDetail';
import { Colors, Font } from '../consts';

const routeConfig = {
    ChatList: {screen: ChatList},
    ChatDetail: {screen: ChatDetail},
};

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
    }
};


export const ChatNavigator = StackNavigator(routeConfig, navConfig);