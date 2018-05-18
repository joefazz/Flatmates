import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import { FeedNavigator } from './Feed';
import { ProfileNavigator } from './Profile';
import { HouseNavigator } from './House';
import { GroupNavigator } from './Groups';
import Icon from 'react-native-vector-icons/Ionicons';

const routeConfig = {
    Feed: { screen: FeedNavigator },
    Profile: { screen: ProfileNavigator },
    Group: { screen: GroupNavigator },
    House: { screen: HouseNavigator }
};

enum Routes {
    Feed = 'Feed',
    Profile = 'Profile',
    Group = 'Group',
    House = 'House'
}

const navConfig = {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;

            switch (routeName) {
                case Routes.Feed:
                    iconName =
                        Platform.OS === 'ios'
                            ? `ios-paper${focused ? '' : '-outline'}`
                            : 'md-paper';
                    break;
                case Routes.Profile:
                    iconName =
                        Platform.OS === 'ios'
                            ? `ios-person${focused ? '' : '-outline'}`
                            : 'md-person';
                    break;
                case Routes.Group:
                    iconName =
                        Platform.OS === 'ios'
                            ? `ios-notifications${focused ? '' : '-outline'}`
                            : 'md-notifications';
                    break;

                case Routes.House:
                    iconName =
                        Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home';

                    break;

                default:
                    break;
            }

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons

            return <Icon name={iconName} size={32} color={tintColor} />;
        }
    }),
    swipeEnabled: false,
    animationEnabled: Platform.OS === 'android' ? true : false,
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: Colors.brandPrimaryColor,
        inactiveTintColor: Colors.grey,
        showLabel: false,

        labelStyle: { ...Font.FontFactory({ family: 'Nunito' }) },
        ...Platform.select({
            android: {
                showLabel: false,
                showIcon: true,
                style: {
                    backgroundColor: Colors.white
                },
                indicatorStyle: {
                    backgroundColor: Colors.brandPrimaryColor
                },
                pressColor: Colors.brandPrimaryColor
            }
        })
    }
};

export const HomeNavigator = createBottomTabNavigator(routeConfig, navConfig);
