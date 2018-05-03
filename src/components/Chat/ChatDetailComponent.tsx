import * as React from 'react';
import { FlatList, KeyboardAvoidingView, Text } from 'react-native';
import randomColor from 'randomcolor';

import { group } from '../../styles';
import { Message, Group } from '../../types/Entities';

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

    componentWillReceiveProps(nextProps) {
        const usernameColors: object = {};

        if (nextProps.data.groupInfo) {
            if (nextProps.data.groupInfo.users) {
                nextProps.data.groupInfo.users.forEach((user) => {
                    usernameColors[user.username] =
                        this.state.usernameColors[user.username] || randomColor();
                });
            }

            this.setState({ usernameColors });
        }
    }

    render() {
        console.log(this.props);
        return (
            <KeyboardAvoidingView
                behavior={'position'}
                contentContainerStyle={group.detailWrapper}
                keyboardVerticalOffset={64}
                style={group.detailWrapper}
            >
                <FlatList
                    data={this.props.data.messages}
                    inverted={true}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => <Text>No Messages in Group</Text>}
                />
                <MessageInput send={this.send} />
            </KeyboardAvoidingView>
        );
    }

    private renderItem = ({ item }) => {
        const message = item.message;
        return (
            <MessageComponent
                color={this.state.usernameColors[message.from.username]}
                isCurrentUser={message.from.id === 1}
                message={message}
            />
        );
    };

    private send = (text) => {
        this.props.createMessage({
            playerIDs: this.props.data.groupInfo.users.map((user) => user.playerId),
            senderID: this.props.userID,
            text,
            senderName: this.props.data.groupInfo.users.find(
                (user) => user.id === this.props.userID
            ).name,
            groupID: this.props.data.groupInfo.id,
            images: [],
            groupName: this.props.data.groupInfo.name
        });
    };
}
