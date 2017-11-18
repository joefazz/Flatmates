import React from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Text } from 'react-native-elements';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons'

import { chat, base } from '../styles';

export const Data = _.times(50, i => ({
    id: i,
    name: 'Group ' + i,
}));

export class Chat extends React.Component {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-text' : 'ios-text-outline'} color={tintColor} size={32} />
        )
    }

    renderItem = ({ item }) => {
        return (
            <TouchableHighlight onPress={() => console.log('Group pressed')}>
                <View style={{...chat.groupRowWrapper}}>
                    <View style={{...chat.groupAvatarWrapper}}>
                        <Avatar  
                            rounded={true} 
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}} />
                    </View>
                    <View style={{...chat.groupTitleWrapper}}>
                        <Text h4>{item.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={Data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const bindActions = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, bindActions)(Chat)