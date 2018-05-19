import React from 'react';
import { Platform, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../../consts';
import { group } from '../../styles';

interface Props {
    send: (text: string, images: ImageType[] | ImageType | null) => void;
}

interface State {
    text: string;
    tempImages: ImageType[] | ImageType | null;
}

export class MessageInput extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            tempImages: null
        };
    }

    attach = () => {
        ImagePicker.openPicker({
            multiple: true,
            compressImageMaxHeight: 500,
            compressImageMaxWidth: 500,
            mediaType: 'photo',
            loadingLabelText: 'Processing photos...'
        })
            .then((result) => this.setState({ tempImages: result }))
            .catch((error) => console.log(error));
    };

    send = () => {
        this.props.send(this.state.text, this.state.tempImages);
        this.setState({ text: '' });
    };

    attachButton = (attach) => {
        return (
            <TouchableOpacity onPress={attach} activeOpacity={0.5}>
                <Icon
                    iconStyle={group.iconStyle}
                    name={'plus-circle'}
                    size={Platform.OS === 'ios' ? 36 : 40}
                    color={Colors.brandPrimaryColor}
                />
            </TouchableOpacity>
        );
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
                <View style={group.attachButtonContainer}>{this.attachButton(this.attach)}</View>
                <TextInput
                    onChangeText={(text) => this.setState({ text })}
                    multiline={true}
                    style={group.input}
                    placeholder={'Type your message here'}
                    underlineColorAndroid={Colors.transparent}
                    value={this.state.text}
                />
                <View style={group.sendButtonContainer}>{this.sendButton(this.send)}</View>
            </View>
        );
    }
}
