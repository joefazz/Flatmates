import React from 'react';
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
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    send = () => {
        this.props.send(this.state.text);
        this.setState({ text: '' });
    };

    sendButton = (send) => {
        return (
            <TouchableHighlight
                style={[
                    group.sendButtonWrapper,
                    this.state.text.length === 0 &&
                        Platform.OS === 'ios' && { backgroundColor: Colors.grey }
                ]}
                onPress={send}
                underlayColor={Colors.definetelyNotAirbnbRed}
                disabled={this.state.text.length === 0}
            >
                <Icon
                    iconStyle={group.iconStyle}
                    name={'send'}
                    size={Platform.OS === 'ios' ? 20 : 26}
                    color={
                        Platform.OS === 'ios'
                            ? Colors.white
                            : this.state.text.length === 0
                                ? Colors.grey
                                : Colors.brandPrimaryColor
                    }
                />
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <View style={group.messageInputContainer}>
                <View style={group.inputContainer}>
                    <TextInput
                        onChangeText={(text) => this.setState({ text })}
                        multiline={true}
                        style={group.input}
                        placeholder={'Type your message here'}
                        underlineColorAndroid={Colors.transparent}
                        value={this.state.text}
                    />
                </View>
                <View style={group.sendButtonContainer}>{this.sendButton(this.send)}</View>
            </View>
        );
    }
}
