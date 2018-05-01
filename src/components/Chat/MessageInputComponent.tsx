import * as React from 'react';
import { Platform, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../../consts';
import { group } from '../../styles';

interface Props {
    send: (string) => void;
}

interface State {
    text: string;
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

    sendButton = (send) => {
        return (
            <TouchableHighlight style={group.sendButtonWrapper} onPress={send}>
                <Icon
                    iconStyle={group.iconStyle}
                    name={'send'}
                    size={Platform.OS === 'ios' ? 20 : 26}
                    color={Platform.OS === 'ios' ? Colors.white : Colors.brandPrimaryColor}
                    style={group.sendButton}
                />
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <View style={group.messageInputContainer}>
                <View style={group.inputContainer}>
                    <TextInput
                        ref={(ref) => (this.textInput = ref)}
                        onChangeText={(text) => this.setState({ text })}
                        multiline={true}
                        style={group.input}
                        placeholder={'Type your message here'}
                        returnKeyType={'send'}
                        underlineColorAndroid={Colors.transparent}
                        onSubmitEditing={() => this.send()}
                    />
                </View>
                <View style={group.sendButtonContainer}>{this.sendButton(this.send)}</View>
            </View>
        );
    }
}
