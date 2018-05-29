import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import { base } from '../../styles';
import { RectButton } from 'react-native-gesture-handler';
import { group } from '../../styles/Group';
import { toConstantHeight, toConstantFontSize } from '../../utils/PercentageConversion';
import { Group } from '../../types/Entities';

interface Props {
    navigation: { navigate: (string, object) => void };
    data: ReadonlyArray<Group>;
    userID: string;
    username: string;
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

    renderItem = ({ item }: { item: Group }) => {
        let names = item.name.split('|');

        let groupName = names.find((name) => name !== this.props.username);
        return (
            <RectButton
                style={[group.listItem, { height: toConstantHeight(12) }]}
                onPress={() =>
                    this.props.navigation.navigate('ChatDetail', {
                        title: item.name,
                        groupData: item,
                        userID: this.props.userID
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
                    <Text style={group.title}>{groupName}</Text>
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
                    ListEmptyComponent={() => <Text>No Groups</Text>}
                    ItemSeparatorComponent={this.renderSeperator}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}
