import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../consts';

interface Props {
    onPress: () => void;
}

export class CreateButton extends React.Component<Props> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ marginRight: 10 }}>
                <Icon name={'ios-add'} size={33} style={{ color: Colors.white }} />
            </TouchableOpacity>
        );
    }
}
