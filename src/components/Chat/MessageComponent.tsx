import moment from 'moment';
import React from 'react';
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native';

import { group } from '../../styles';
import { Message } from '../../types/Entities';
import { toConstantWidth } from '../../utils/PercentageConversion';
import { Colors } from '../../consts';
import { ImageViewer } from '../../../node_modules/react-native-image-zoom-viewer';

interface Props {
    color: string;
    message: Message;
    images: string[];
    isCurrentUser: boolean;
    navigation: {
        state: {
            params: {
                messages: Array<string>;
                userID: string;
            };
        };
        push: (route, params) => void;
    }
}

interface State {
    isModalVisible: boolean;
}

export class MessageComponent extends React.Component<Props, State> {
    state = {
        isModalVisible: false
    };

    render() {
        const { color, message, isCurrentUser } = this.props;

        if (this.state.isModalVisible) {
            return (
                <Modal animationType="slide">
                    <ImageViewer
                        imageUrls={this.props.images.map(image => ({ url: image }))}
                        enableSwipeDown={true}
                        onSwipeDown={() => this.setState({ isModalVisible: false })}
                        saveToLocalByLongPress={true}
                    />
                </Modal>
            )
        }

        if (message.text === '' && this.props.images.length === 1) {
            return (
                <View key={message.id} style={{ flex: 1, flexDirection: 'row', marginVertical: 2 }}>
                    {isCurrentUser ? <View style={group.messageSpacer} /> : undefined}
                    <View style={[group.message, isCurrentUser && group.myMessage]}>
                        {!isCurrentUser && (
                            <Text style={[group.messageUsername, { color }]}>{message.from.name}</Text>
                        )}
                        <View style={group.imageContainer}>
                            {this.props.images.map(image => (
                                <TouchableOpacity key={image} onPress={() => this.setState({ isModalVisible: true })}>
                                    <Image source={{ uri: image }} style={{ width: toConstantWidth(69.5), height: 150, borderRadius: 3 }} />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={isCurrentUser ? group.myMessageTime : group.messageTime}>
                            {moment(message.createdAt).format('h:mm A')}
                        </Text>
                    </View>
                    {!isCurrentUser ? <View style={group.messageSpacer} /> : undefined}
                </View >
            )
        }

        return (
            <View key={message.id} style={{ flex: 1, flexDirection: 'row', marginVertical: 2 }}>
                {isCurrentUser ? <View style={group.messageSpacer} /> : undefined}
                <View style={[group.message, isCurrentUser && group.myMessage]}>
                    {!isCurrentUser && (
                        <Text style={[group.messageUsername, { color }]}>{message.from.name}</Text>
                    )}
                    <Text style={group.messageText}>{message.text}</Text>
                    {this.props.images.length > 0 &&
                        <View style={[group.imageContainer, { marginTop: 10 }]}>
                            {this.props.images.map(image => (
                                <TouchableOpacity key={image} onPress={() => this.setState({ isModalVisible: true })}>
                                    <Image source={{ uri: image }} style={{ width: 70, height: 70, borderWidth: 1, borderColor: Colors.white }} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    }
                    <Text style={isCurrentUser ? group.myMessageTime : group.messageTime}>
                        {moment(message.createdAt).format('h:mm A')}
                    </Text>
                </View>
                {!isCurrentUser ? <View style={group.messageSpacer} /> : undefined}
            </View >
        );
    }
}
