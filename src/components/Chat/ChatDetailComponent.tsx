import * as React from 'react';
import { FlatList, View, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import randomColor from 'randomcolor';

import { chat } from '../../styles';
import { Message } from './MessageComponent';
import { MessageInput } from './MessageInputComponent';

interface Props {
    data: {id: number, messages: Array<{}>},
    createMessage: ({}) => void
}

interface State {
    usernameColors: any
}

export class ChatDetailComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            usernameColors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        const usernameColors = {};

        // if (nextProps.data.group) {
        //     if (nextProps.data.group.users) {
        //         nextProps.data.group.users.forEach(user =>{
        //             usernameColors[user.username] = this.state.usernameColors[user.username] || randomColor()
        //         });
        //     }

        //     this.setState({ usernameColors })
        // }
    }

    renderItem = ({ item }) => {
        let message = item.message;
        return (
            <Message color={this.state.usernameColors[message.from.username]} isCurrentUser={message.from.id === 1} message={message} />
        );
    } 

    private send(text) {
        this.props.createMessage({groupId: this.props.data.id, userId: 1, text});
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={'position'}
                contentContainerStyle={chat.detailWrapper}
                keyboardVerticalOffset={64}
                style={chat.detailWrapper}>
                    <FlatList
                        data={this.props.data.messages}
                        inverted={true}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}/>
                    <MessageInput send={(text) => this.send(text)}/>
            </KeyboardAvoidingView>
        )
    }
}