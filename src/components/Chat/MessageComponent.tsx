import moment from 'moment';
import * as React from 'react';
import { Text, View } from 'react-native';

import { group } from '../../styles';
import { Message } from '../../types/Entities';

interface Props {
    color: string;
    message: Message;
    isCurrentUser: boolean;
}

export class MessageComponent extends React.PureComponent<Props> {
    render() {
        const { color, message, isCurrentUser } = this.props;
        return (
            <View key={message.id} style={{ flex: 1, flexDirection: 'row', marginVertical: 2 }}>
                {isCurrentUser ? <View style={group.messageSpacer} /> : undefined}
                <View style={[group.message, isCurrentUser && group.myMessage]}>
                    <Text style={[group.messageUsername, { color }]}>{message.from.name}</Text>
                    <Text>{message.text}</Text>
                    <Text style={group.messageTime}>
                        {moment(message.createdAt).format('h:mm A')}
                    </Text>
                </View>
                {!isCurrentUser ? <View style={group.messageSpacer} /> : undefined}
            </View>
        );
    }
}
