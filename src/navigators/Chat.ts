import { StackNavigator } from 'react-navigation';

import ChatList from '../containers/Groups/Chat/ChatList';
import ChatDetail from '../containers/Groups/Chat/ChatDetail';

const routeConfig = {
    ChatList: { screen: ChatList },
    ChatDetail: { screen: ChatDetail }
};

const navConfig = {
    headerMode: 'none'
};

export const ChatNavigator = StackNavigator(routeConfig, navConfig);
