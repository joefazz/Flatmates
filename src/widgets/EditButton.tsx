import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Colors, Font } from '../consts';

export class EditButton extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 17, color: Colors.white }}>Edit</Text>
            </TouchableOpacity>
        )
    }
}