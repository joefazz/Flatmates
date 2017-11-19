import React from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import randomColor from 'randomcolor';

import { chat } from '../../styles';
import { Message } from './MessageComponent';

export class ChatDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameColors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        const usernameColors = {};

        if (nextProps.data.group) {
            if (nextProps.data.group.users) {
                nextProps.data.group.users.forEach(user =>{
                    usernameColors[user.username] = this.state.usernameColors[user.username] || randomColor()
                });
            }

            this.setState({ usernameColors })
        }
    }

    renderItem = ({ item: message }) => {
        return (
            <Message color={this.state.usernameColors[message.from.username]} isCurrentUser={message.from.id === 1} message={message} />
        );
    } 

    render() {
        const { loading, group } = this.props.data;

        if (loading) {
            return (
                <View style={{justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={ chat.detailWrapper }>
                <FlatList
                    data={group.messages.slice().reverse()}
                    inverted={true}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}/>
            </View>
        )
    }
}