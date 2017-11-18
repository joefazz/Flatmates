import React from 'react';
import { FlatList, View } from 'react-native';

import { Message } from './MessageComponent';
export class ChatDetailComponent extends React.Component {

    renderItem = ({ item }) => {
        return (
            <Message color={item.color} isCurrentUser={item.isCurrentUser} message={item.message} />
        );
    } 

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}/>
            </View>
        )
    }
}