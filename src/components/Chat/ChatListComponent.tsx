import * as React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import { base } from '../../styles';
import { RectButton } from 'react-native-gesture-handler';
import { group } from '../../styles/Group';
import { toConstantHeight, toConstantFontSize } from '../../utils/PercentageConversion';

interface Props {
    navigation: { navigate: (string, object) => void };
    data: ReadonlyArray<object>;
}

export class ChatListComponent extends React.PureComponent<Props> {
    renderHeader = () => {
        return (
            <>
                <RectButton
                    style={[group.listItem, { height: toConstantHeight(12) }]}
                    onPress={() =>
                        this.props.navigation.navigate('ChatDetail', {
                            title: 'De Beauvoir',
                            groupId: '123'
                        })
                    }
                >
                    <Avatar
                        rounded={true}
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
                        }}
                        large={true}
                    />
                    <View style={group.descWrapper}>
                        <Text style={group.title}>De Beauvoir Road</Text>
                        <Text style={[group.subtitle, { fontSize: toConstantFontSize(1.8) }]}>
                            If you can send the bills that'd be sound
                        </Text>
                    </View>
                    <View style={true && group.unreadMarker} />
                </RectButton>
                {this.renderSeperator()}
            </>
        );
    };

    renderItem = ({ item }) => {
        return (
            <RectButton
                style={[group.listItem, { height: toConstantHeight(12) }]}
                onPress={() =>
                    this.props.navigation.navigate('ChatDetail', {
                        title: item.name,
                        groupId: item.id
                    })
                }
            >
                <Avatar
                    rounded={true}
                    source={{
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
                    }}
                    large={true}
                />
                <View style={group.descWrapper}>
                    <Text style={group.title}>{item.name}</Text>
                    <Text style={[group.subtitle, { fontSize: toConstantFontSize(1.8) }]}>
                        {item.lastMessage || 'New group created.'}
                    </Text>
                </View>
                <View style={true && group.unreadMarker} />
            </RectButton>
        );
    };

    renderSeperator = () => {
        return <View style={base.listSeperator} />;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                    ListEmptyComponent={() => <Text>No Groups</Text>}
                    ItemSeparatorComponent={this.renderSeperator}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}
