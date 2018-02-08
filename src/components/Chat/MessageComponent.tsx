import * as moment from 'moment';
import * as React from 'react';
import { Text, View } from 'react-native';

import { chat } from '../../styles';

interface Props {
    color: string,
    message: {id: number, text: string, createdAt: number, from: {username: string}},
    isCurrentUser: boolean
}

export class Message extends React.PureComponent<Props> {

    render() {
        const { color, message, isCurrentUser } = this.props;
        return (
            <View key={message.id} style={{ flex: 1, flexDirection: 'row', marginVertical: 2 }}>
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