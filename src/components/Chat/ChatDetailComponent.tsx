import * as React from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';

import { chat } from '../../styles';
import { Message } from './MessageComponent';
import { MessageInput } from './MessageInputComponent';

interface Props {
    data: Array<object>;
    id: number;
    createMessage: (object) => void;
}

const initialState = {
    usernameColors: {}
};

type State = Readonly<typeof initialState>;

export class ChatDetailComponent extends React.Component<Props, State> {
    readonly state: State = initialState;

    componentWillReceiveProps(nextProps) {
        const usernameColors: object = {};

        // if (nextProps.data.group) {
        //     if (nextProps.data.group.users) {
        //         nextProps.data.group.users.forEach(user =>{
        //             usernameColors[user.username] = this.state.usernameColors[user.username] || randomColor()
        //         });
        //     }

        //     this.setState({ usernameColors })
        // }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={'position'}
                contentContainerStyle={chat.detailWrapper}
                keyboardVerticalOffset={64}
                style={chat.detailWrapper}
            >
                <FlatList
                    data={this.props.data}
                    inverted={true}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                />
                <MessageInput send={(text) => this.send(text)} />
            </KeyboardAvoidingView>
        );
    }

    private renderItem = ({ item }) => {
        const message = item.message;
        return (
            <Message
                color={this.state.usernameColors[message.from.username]}
                isCurrentUser={message.from.id === 1}
                message={message}
            />
        );
    };

    private send(text) {
        this.props.createMessage({ groupId: this.props.id, userId: 1, text });
    }
}
