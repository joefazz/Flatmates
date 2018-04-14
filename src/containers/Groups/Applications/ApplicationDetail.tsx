import * as React from 'react';
import { Text } from 'react-native';

export class ApplicationDetail extends React.Component {
    static navigationOptions = (navigation) => ({
        tabBarVisible: false,
        title: 'Application Detail'
    });
    render() {
        return <Text>Detail page</Text>;
    }
}
