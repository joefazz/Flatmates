import { StackNavigator } from 'react-navigation';

import Feed from '../containers/Feed';

const routeConfig = {
    Feed: {screen: Feed},
}

export const FeedNavigator = StackNavigator(routeConfig);