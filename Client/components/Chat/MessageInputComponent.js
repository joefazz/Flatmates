import React from 'react';
import { TextInput, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { chat } from '../../styles';
import { Colors } from '../../consts';

const sendButton = send => {
    return (
        <TouchableHighlight style={chat.sendButtonWrapper} onPress={send}>
            <Icon
                iconStyle={chat.iconStyle}
                name={"send"}
                size={20}
                color={Colors.white}
                style={chat.sendButton}
                />
        </TouchableHighlight>
    )
}

export class MessageInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.send = this.send.bind(this);
    }

    send() {
        this.props.send(this.state.text);
        this.textInput.clear();
        this.textInput.blur();
    }

    render() {
        return (
            <View style={chat.messageInputContainer}>
                <View style={chat.inputContainer}>
                    <TextInput
                        ref={ref => this.textInput = ref}
                        onChangeText={(text) => this.setState({ text })}
                        style={chat.input}
                        placeholder={'Type your message here'}
                        returnKeyType={'send'}
                        onSubmitEditing={() => this.send()}
                    />
                </View>
                <View style={chat.sendButtonContainer}>
                    {sendButton(this.send)}
                </View>
            </View>
        )
    }
}