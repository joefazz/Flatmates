import React from 'react';
import { FlatList, KeyboardAvoidingView, Text, Platform, View, RefreshControl, TouchableOpacity } from 'react-native';
import randomColor from 'randomcolor';

import { group } from '../../styles';
import { Message, Group } from '../../types/Entities';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { MessageComponent } from './MessageComponent';
import { MessageInput } from './MessageInputComponent';
import { CreateMessageMutationVariables } from '../../graphql/Types';
import { DOMAIN } from '../../consts/endpoint';
import { FontFactory } from '../../consts/font';
import { Colors } from '../../consts';

interface Props {
    subscribeToNewMessages: () => void;
    data: { messages: Array<Message>; groupInfo: Group };
    userID: string;
    isLoading: boolean;
    username: string;
    refetch: () => void;
    fetchMoreMessages: any;
    navigation: {
        state: {
            params: {
                messages: Array<string>;
                groupData: Group;
                userID: string;
            };
        };
        push: (route, params) => void;
    }
    createMessage: (params: CreateMessageMutationVariables & { houseID: number; }) => void;
}

const initialState = {
    usernameColors: {},
    modalVisible: false
};

type State = Readonly<typeof initialState>;

export class ChatDetailComponent extends React.Component<Props, State> {
    readonly state: State = initialState;
    messageList: any;

    componentDidMount() {
        this.props.subscribeToNewMessages();

        const usernameColors: object = {};
        const groupData = this.props.data.groupInfo;
        const users = groupData.house.users.concat(groupData.applicant);
        if (groupData) {
            if (users) {
                users.forEach((user) => {
                    usernameColors[user.name] =
                        this.state.usernameColors[user.name] || randomColor({ luminosity: 'dark' });
                });
            }

            this.setState({ usernameColors });
        }
    }

    render() {
        const messages = this.props.data.messages.slice().reverse();

        return Platform.OS === 'ios' ? (
            <KeyboardAvoidingView
                behavior={'position'}
                contentContainerStyle={group.detailWrapper}
                keyboardVerticalOffset={64}
                style={group.detailWrapper}
            >
                <FlatList
                    ref={(ref) => (this.messageList = ref)}
                    data={messages}
                    inverted={true}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => String(item.id)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isLoading}
                            onRefresh={() => this.props.refetch()}
                        />
                    }
                    // ListEmptyComponent={() => this.props.isLoading ? <View /> : <Text>No Messages in Group</Text>}
                    ListFooterComponent={this.renderFooter}
                />
                <MessageInput send={this.send} />
            </KeyboardAvoidingView>
        ) : (

                <View style={group.detailWrapper}>
                    <FlatList
                        ref={(ref) => (this.messageList = ref)}
                        data={messages}
                        inverted={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isLoading}
                                onRefresh={() => this.props.refetch()}
                            />
                        }
                        renderItem={this.renderItem}
                        keyExtractor={(item) => String(item.id)}
                        // ListEmptyComponent={() => this.props.isLoading ? <View /> : <Text>No Messages in Group</Text>}
                        ListFooterComponent={this.renderFooter}
                    />
                    <MessageInput send={this.send} />
                </View>

            );
    }

    private renderFooter = () => {
        if (this.props.isLoading) {
            return <View />;
        }

        if (this.props.data.messages.length % 25 === 0) {
            return (
                <TouchableOpacity style={{ marginVertical: 10, padding: 7, borderWidth: 1, borderRadius: 3, borderColor: Colors.definetelyNotAirbnbRed, alignSelf: 'center' }} onPress={() => this.props.fetchMoreMessages()}>
                    <Text style={{ ...FontFactory(), fontSize: 16, color: Colors.definetelyNotAirbnbRed }}>Fetch more messages</Text>
                </TouchableOpacity>
            );
        }

        return <Text style={{ ...FontFactory(), alignSelf: 'center', marginVertical: 10, fontSize: 16, color: Colors.definetelyNotAirbnbRed }}>No more messages!</Text>;

    };

    private renderItem = ({ item }: { item: Message }) => {
        const { from } = item;

        return (
            <MessageComponent
                navigation={this.props.navigation}
                color={this.state.usernameColors[from.name]}
                isCurrentUser={from.id === this.props.userID}
                message={item}
                images={item.images}
            />
        );
    };

    private send = async (text: string, attachment: ImageType[]) => {
        var imageAttachment: string[] = [];

        if (attachment.length > 0) {
            imageAttachment = await Promise.all(
                attachment.map(async (image) => {
                    const formData = new FormData();

                    const lastIndex = image.path.lastIndexOf('/') + 1;

                    const data = {
                        uri: image.path,
                        name: image.path.slice(lastIndex),
                        type: image.mime
                    };

                    formData.append('data', data);

                    const options = {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    };

                    const response = await fetch(`${DOMAIN}/upload`, options)
                        .then((res) => res.json())
                        .then((json) => json)
                        .catch((error) => console.log(error));

                    return response.url;
                })
            );
        }

        const allUsers = this.props.data.groupInfo.house.users.concat([
            this.props.data.groupInfo.applicant
        ]);

        var senderName = allUsers.find((user) => user.id === this.props.userID).name;

        this.props.createMessage({
            senderID: this.props.userID,
            text: text.trim(),
            senderName: allUsers.find((user) => user.id === this.props.userID).name,
            groupID: this.props.data.groupInfo.id,
            images: imageAttachment,
            houseID: this.props.data.groupInfo.house.shortID,
            groupName: `${this.props.data.groupInfo.house.road}|${senderName}`
        });
    };
}
