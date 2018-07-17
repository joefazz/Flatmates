import React from 'react';
import { Platform, TextInput, TouchableHighlight, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../../consts';
import { group } from '../../styles';
import { toConstantFontSize } from '../../utils/PercentageConversion';

interface Props {
    send: (text: string, images: ImageType[] | ImageType | null) => void;
}

interface State {
    text: string;
    tempImages: ImageType[];
    removeImageToggle: boolean;
}

export class MessageInput extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            tempImages: [],
            removeImageToggle: false
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
            // @ts-ignore
            .then((result) => this.setState({ tempImages: Array.isArray(this.state.tempImages) ? this.state.tempImages.concat(result) : result }))
            .catch((error) => console.log(error));
    };

    removeImage = (index) => {
        let clone = this.state.tempImages;
        clone.splice(index, 1);
        this.setState({ tempImages: clone });
    }

    send = () => {
        this.props.send(this.state.text, this.state.tempImages);
        this.setState({ text: '', tempImages: [] });
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
        let isDisabled = this.state.text.length === 0 && this.state.tempImages.length === 0;
        return (
            <TouchableHighlight
                style={[
                    group.sendButtonWrapper,
                    isDisabled &&
                    Platform.OS === 'ios' && { backgroundColor: Colors.grey }
                ]}
                onPress={send}
                underlayColor={Colors.definetelyNotAirbnbRed}
                disabled={isDisabled}
            >
                <Icon
                    iconStyle={group.iconStyle}
                    name={'send'}
                    size={Platform.OS === 'ios' ? 20 : 26}
                    color={
                        Platform.OS === 'ios'
                            ? Colors.white
                            : isDisabled
                                ? Colors.grey
                                : Colors.brandPrimaryColor
                    }
                />
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <>
                {this.state.tempImages && this.state.tempImages.length > 0 &&
                    <View style={group.imagePreviewContainer}>
                        <ScrollView
                            style={{ paddingHorizontal: 5 }}
                            horizontal={true}
                        >
                            {this.state.tempImages.map((image, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={{ marginRight: 4 }}
                                            onPress={() =>
                                                this.setState({
                                                    removeImageToggle: !this.state.removeImageToggle
                                                })
                                            }
                                        >
                                            <Image
                                                source={{ uri: image.path }}
                                                style={{ width: 90, height: 90, borderRadius: 3 }}
                                                resizeMode={'cover'}
                                            />
                                        </TouchableOpacity>
                                        {this.state.removeImageToggle ? (
                                            <TouchableOpacity
                                                style={{ position: 'absolute', right: 4, top: 0 }}
                                                onPress={() => this.removeImage(index)}
                                            >
                                                <Icon
                                                    name={'times-circle'}
                                                    size={
                                                        toConstantFontSize(2.5) > 18
                                                            ? 18
                                                            : toConstantFontSize(2.5)
                                                    }
                                                    style={{ color: Colors.brandTertiaryColor }}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                                <React.Fragment />
                                            )}
                                    </View>
                                );
                            })}
                            <TouchableOpacity
                                style={{
                                    width: 90,
                                    height: 90,
                                    borderWidth: 1,
                                    borderColor: Colors.brandPrimaryColor,
                                    borderStyle: 'dashed',
                                    borderRadius: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => this.attach()}
                            >
                                <Icon
                                    name={'plus'}
                                    size={toConstantFontSize(4)}
                                    style={{ color: Colors.brandPrimaryColor }}
                                />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>}
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
            </>
        );
    }
}
