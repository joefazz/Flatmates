import { createStackNavigator } from 'react-navigation';

import ApplicationList from '../containers/Groups/Applications/ApplicationList';
import ApplicationDetail from '../containers/Groups/Applications/ApplicationDetail';
import { Colors, Font } from '../consts';
import { PostDetail } from '../containers/Feed/PostDetail';
import UserProfile from '../containers/Feed/UserProfile';
import { MapComponent } from '../components/Map/MapComponent';

const routeConfig = {
    ApplicationsList: { screen: ApplicationList },
    ApplicationDetail: { screen: ApplicationDetail },
    PostDetail: { screen: PostDetail },
    UserProfile: { screen: UserProfile },
    MapView: { screen: MapComponent }
};

const navConfig: any = {
    swipeEnabled: false,
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor, paddingTop: 0 }
    }
};

export const ApplicationNavigator = createStackNavigator(routeConfig, navConfig);
