import React from 'react';
import { FlatList, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';

import { base } from '../../styles';
import { RectButton } from 'react-native-gesture-handler';
import { group } from '../../styles/Group';
import {
    toConstantHeight,
    toConstantFontSize,
    toConstantWidth
} from '../../utils/PercentageConversion';
import { Group } from '../../types/Entities';
import { Colors } from '../../consts';
import { FontFactory } from '../../consts/font';

interface Props {
    navigation: { navigate: (string, object) => void };
    data: ReadonlyArray<Group>;
    userID: string;
    username: string;
    refetch: () => void;
    isLoading: boolean;
}

export class ChatListComponent extends React.PureComponent<Props> {
    renderHeader = (chat: Group) => {
        if (chat) {
            return (
                <>
                    <RectButton
                        style={[group.listItem, { height: toConstantHeight(12) }]}
                        onPress={() =>
                            this.props.navigation.navigate('ChatDetail', {
                                title: 'House Chat',
                                groupData: chat,
                                userID: this.props.userID
                            })
                        }
                    >
                        <Avatar
                            rounded={true}
                            source={{
                                uri: chat.house.houseImages[0]
                            }}
                            containerStyle={{
                                width: toConstantWidth(18),
                                height: toConstantWidth(18),
                                marginLeft: 3
                            }}
                            overlayContainerStyle={{ backgroundColor: Colors.transparent }}
                            avatarStyle={{
                                width: toConstantWidth(18),
                                height: toConstantWidth(18),
                                borderRadius: toConstantWidth(9)
                            }}
                        />
                        <View style={group.descWrapper}>
                            <Text style={group.title}>House Chat</Text>
                            <Text style={[group.subtitle, { fontSize: toConstantFontSize(1.8) }]}>
                                {!!chat.messages[0] ? chat.messages[0].text : 'New group created.'}
                            </Text>
                        </View>
                        {/* <View style={true && group.unreadMarker} /> */}
                    </RectButton>
                    {this.renderSeperator()}
                </>
            );
        }

        return <View />;
    };

    renderItem = ({ item }: { item: Group }) => {
        var groupName = '';
        var avatar = '';

        if (!Boolean(item.applicant)) {
            return <View />;
        }

        if (item.applicant.name === this.props.username) {
            groupName = item.house.road;
            avatar = item.house.houseImages[0];
        } else {
            groupName = item.applicant.name;
            avatar = item.applicant.profilePicture;
        }

        return (
            <RectButton
                style={[group.listItem, { height: toConstantHeight(12) }]}
                onPress={() =>
                    this.props.navigation.navigate('ChatDetail', {
                        title: groupName,
                        groupData: item,
                        userID: this.props.userID,
                        approvePermissions: !(item.applicant.name === this.props.username)
                    })
                }
            >
                <Avatar
                    rounded={true}
                    source={{
                        uri: avatar
                    }}
                    containerStyle={{
                        width: toConstantWidth(18),
                        height: toConstantWidth(18),
                        marginLeft: 3
                    }}
                    overlayContainerStyle={{ backgroundColor: Colors.transparent }}
                    avatarStyle={{
                        width: toConstantWidth(18),
                        height: toConstantWidth(18),
                        borderRadius: toConstantWidth(9)
                    }}
                />
                <View style={group.descWrapper}>
                    <Text style={group.title}>{groupName}</Text>
                    <Text numberOfLines={1} style={[group.subtitle, { fontSize: toConstantFontSize(1.8) }]}>
                        {!!item.messages[0] ? item.messages[0].text : 'New group created.'}
                    </Text>
                </View>
                {/* <View style={true && group.unreadMarker} /> */}
            </RectButton>
        );
    };

    renderSeperator = () => {
        return <View style={base.listSeperator} />;
    };

    render() {
        var houseChat = [];
        if (!this.props.isLoading) {
            houseChat = this.props.data.filter(chat => !Boolean(chat.applicant));
        }

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    ListHeaderComponent={() => this.renderHeader(houseChat.length > 0 && houseChat[0])}
                    ListEmptyComponent={() => this.props.isLoading ? <View /> : <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 20, alignSelf: 'center', marginTop: 10 }}>No Chat Groups</Text>}
                    ItemSeparatorComponent={this.renderSeperator}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isLoading}
                            onRefresh={() => this.props.refetch()}
                        />
                    }
                />
            </View>
        );
    }
}
