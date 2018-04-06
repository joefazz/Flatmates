import * as React from 'react';
import { Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class ApplicationList extends React.Component {
    static navigationOptions = {
        title: 'Applications',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={
                    Platform.OS === 'ios'
                        ? focused ? 'ios-filing' : 'ios-filing-outline'
                        : 'md-filing'
                }
                color={tintColor}
                size={32}
            />
        )
    };

    render() {
        return <Text>No Applications</Text>;
    }
}
