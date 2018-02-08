import * as React from 'react';
import { TextInput, View, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { chat } from '../../styles';
import { Colors } from '../../consts';

interface Props {
    send: (string) => void
}

interface State {
    text: string
}

export class MessageInput extends React.Component<Props, State> {
    textInput: any;

    constructor(props) {
        super(props);

        this.send = this.send.bind(this);
    }

    send() {
        this.props.send(this.state.text);
        this.textInput.clear();
        this.textInput.blur();
    }

    sendButton = send => {
        return (
            <TouchableHighlight style={chat.sendButtonWrapper} onPress={send}>
                <Icon
                    iconStyle={chat.iconStyle}
                    name={"send"}
                    size={Platform.OS === 'ios' ? 20 : 26}
                    color={Platform.OS === 'ios' ? Colors.white : Colors.brandSecondaryColor}
                    style={chat.sendButton}
                    />
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={chat.messageInputContainer}>
                <View style={chat.inputContainer}>
                    <TextInput
                        ref={ref => this.textInput = ref}
                        onChangeText={(text) => this.setState({ text })}
                        multiline={true}
                        style={chat.input}
                        placeholder={'Type your message here'}
                        returnKeyType={'send'}
                        underlineColorAndroid={Colors.transparent}
                        onSubmitEditing={() => this.send()}
                    />
                </View>
                <View style={chat.sendButtonContainer}>
                    {this.sendButton(this.send)}
                </View>
            </View>
        )
    }
}