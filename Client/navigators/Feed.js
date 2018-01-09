import { StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import Feed from '../containers/Feed/Feed';
import FeedDetail from '../containers/Feed/Detail'
import { Colors, Font } from '../consts';

const routeConfig = {
    Feed: { screen: Feed },
    FeedDetail: { screen: FeedDetail}
    
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
        headerMode: Platform.OS === 'android' ? 'none' : 'float'
    }
}

export const FeedNavigator = StackNavigator(routeConfig, navConfig);