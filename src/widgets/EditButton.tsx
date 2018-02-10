import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Colors } from '../consts';

interface Props {
    onPress: () => void
}

export class EditButton extends React.PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 17, color: Colors.white }}>Edit</Text>
            </TouchableOpacity>
        )
    }
}