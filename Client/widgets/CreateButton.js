import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../consts/index';

export class CreateButton extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ marginRight: 10 }}>
                <Icon name={'ios-add'} size={34} style={{ color: Colors.white }} />
            </TouchableOpacity>
        )
    }
}