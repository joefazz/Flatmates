import * as React from 'react';
import { FlatList, View, Text } from 'react-native';

interface Props {
    data: Array<any>;
}

export class ApplicationListComponent extends React.PureComponent<Props> {
    render() {
        return <FlatList data={this.props.data} renderItem={this.renderItem} />;
    }

    renderItem = ({ item }) => {
        return (
            <View>
                <Text>Applciation {item}</Text>
            </View>
        );
    };
}
