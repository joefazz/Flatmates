import * as React from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {}

interface State {}

export default class Settings extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Settings',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={
                    Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home'
                }
                color={tintColor}
                size={29}
            />
        )
    };
    render() {
        return (
            <View>
                <StatusBar barStyle={'dark-content'} />
                <Text>Settings Screen</Text>
            </View>
        );
    }
}
