import * as React from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';

import { chat, base } from '../../styles';

interface Props {
    navigation: {navigate: (string, {}) => void}
    data: ReadonlyArray<{}>
}

interface State {

}

export class ChatListComponent extends React.Component<Props, State> {
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={ chat.row } onPress={() => this.props.navigation.navigate('ChatDetail', { title: item.name, groupId: item.id })}>
                <View style={ chat.groupRowWrapper }>
                    <View style={ chat.groupAvatarWrapper }>
                        <Avatar  
                            rounded={true} 
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}} />
                    </View>
                    <View style={ chat.groupTextWrapper }>
                        <View style={ chat.groupTitleWrapper }>
                            <Text style={ chat.groupTitle }>{item.name}</Text>
                        </View>
                        <View style={ chat.groupSubtitleWrapper }>
                            <Text style={ chat.groupSubtitle }>{item.lastMessageText}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderSeperator = () => {
        return (
            <View style={ base.listSeperator } />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeperator}
                    keyExtractor={item => item.id}/>
            </View>
        );
    }
}


