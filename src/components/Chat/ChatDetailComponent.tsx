import React from 'react';
import { FlatList, KeyboardAvoidingView, Text, Platform, View } from 'react-native';
import randomColor from 'randomcolor';

import { group } from '../../styles';
import { Message, Group } from '../../types/Entities';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { MessageComponent } from './MessageComponent';
import { MessageInput } from './MessageInputComponent';
import { CreateMessageMutationVariables } from '../../graphql/Types';

interface Props {
    data: { messages: Array<Message>; groupInfo: Group };
    userID: string;
    createMessage: (params: CreateMessageMutationVariables) => void;
}

const initialState = {
    usernameColors: {}
};

type State = Readonly<typeof initialState>;

export class ChatDetailComponent extends React.Component<Props, State> {
    readonly state: State = initialState;
    messageList: any;

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const usernameColors: object = {};

        if (nextProps.data.groupInfo) {
            if (nextProps.data.groupInfo.users) {
                nextProps.data.groupInfo.users.forEach((user) => {
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
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => <Text>No Messages in Group</Text>}
                />
                <MessageInput send={this.send} />
            </KeyboardAvoidingView>
        ) : (
            <View style={group.detailWrapper}>
                <FlatList
                    ref={(ref) => (this.messageList = ref)}
                    data={messages}
                    inverted={true}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => <Text>No Messages in Group</Text>}
                />
                <MessageInput send={this.send} />
            </View>
        );
    }

    private renderItem = ({ item }: { item: Message }) => {
        const { from } = item;
        return (
            <MessageComponent
                color={this.state.usernameColors[from.name]}
                isCurrentUser={from.id === this.props.userID}
                message={item}
            />
        );
    };

    private send = async (text: string, attachment: ImageType[] | ImageType | null) => {
        var imageAttachment: string[];

        if (attachment) {
            if (Array.isArray(attachment)) {
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

                        const response = await fetch(
                            'https://flatmates-server.azurewebsites.net/upload',
                            options
                        )
                            .then((res) => res.json())
                            .then((json) => json)
                            .catch((error) => console.log(error));

                        return response.url;
                    })
                );
            } else {
                const formData = new FormData();

                const lastIndex = attachment.path.lastIndexOf('/') + 1;

                const data = {
                    uri: attachment.path,
                    name: attachment.path.slice(lastIndex),
                    type: attachment.mime
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

                const response = await fetch(
                    'https://flatmates-server.azurewebsites.net/upload',
                    options
                )
                    .then((res) => res.json())
                    .then((json) => json)
                    .catch((error) => console.log(error));

                imageAttachment = [response.url];
            }
        }

        this.props.createMessage({
            playerIDs: this.props.data.groupInfo.users.map((user) => user.playerId),
            senderID: this.props.userID,
            text: text.trim(),
            senderName: this.props.data.groupInfo.users.find(
                (user) => user.id === this.props.userID
            ).name,
            groupID: this.props.data.groupInfo.id,
            images: imageAttachment,
            groupName: this.props.data.groupInfo.name
        });
    };
}
