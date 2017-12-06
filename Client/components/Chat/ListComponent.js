import React from 'react';
import { FlatList, TouchableHighlight, View, ActivityIndicator } from 'react-native';
import { Avatar, Text } from 'react-native-elements';

import { chat, base } from '../../styles';

export class ChatListComponent extends React.Component {
    renderItem = ({ item }) => {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('ChatDetail', { title: item.name, groupId: item.id })}>
                <View style={ chat.groupRowWrapper }>
                    <View style={ chat.groupAvatarWrapper }>
                        <Avatar  
                            rounded={true} 
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}} />
                    </View>
                    <View style={ chat.groupTitleWrapper }>
                        <Text h4>{item.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    renderSeperator = () => {
        return (
            <View style={ base.listSeperator } />
        )
    }

    render() {
        const { loading, user } = this.props.data;

        if (loading) {
            return (    
                <View style={{justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={user.house}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeperator}
                    keyExtractor={item => item.id}/>
            </View>
        );
    }
}

