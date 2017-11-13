import { StackNavigator } from 'react-navigation';

import Chat from '../containers/Chat';

const routeConfig = {
    ChatList: {screen: Chat},
}

export const ChatNavigator = StackNavigator(routeConfig);