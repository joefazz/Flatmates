import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import { chat } from '../../styles';

export class Message extends React.PureComponent {

    render() {
        const { color, message, isCurrentUser } = this.props;
        return (
            <View key={message.id} style={{ flex: 1, flexDirection: 'row' }}>
                {isCurrentUser ?
                    <View style={ chat.messageSpacer }/> : undefined }
                <View style={[ chat.message, isCurrentUser && chat.myMessage ]}>
                    <Text style={[ chat.messageUsername, { color } ]}>{message.from.username}</Text>
                    <Text>{message.text}</Text>
                    <Text style={ chat.messageTime }>{moment(message.createdAt).format('h:mm A')}</Text>
                </View>
                {!isCurrentUser ?
                    <View style={ chat.messageSpacer } /> : undefined}
            </View>
        )
    }
}