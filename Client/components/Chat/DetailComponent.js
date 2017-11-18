import React from 'react';
import { FlatList, View } from 'react-native';

import { chat } from '../../styles';
import { Message } from './MessageComponent';

export class ChatDetailComponent extends React.Component {

    renderItem = ({ item }) => {
        return (
            <Message color={item.color} isCurrentUser={item.isCurrentUser} message={item.message} />
        );
    } 

    render() {
        return (
            <View style={ chat.detailWrapper }>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.message.id}/>
            </View>
        )
    }
}