import * as React from 'react';
import { FlatList, KeyboardAvoidingView, Text, Platform, View } from 'react-native';
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

    private send = (text) => {
        this.props.createMessage({
            playerIDs: this.props.data.groupInfo.users.map((user) => user.playerId),
            senderID: this.props.userID,
            text: text.trim(),
            senderName: this.props.data.groupInfo.users.find(
                (user) => user.id === this.props.userID
            ).name,
            groupID: this.props.data.groupInfo.id,
            images: [],
            groupName: this.props.data.groupInfo.name
        });
    };
}
