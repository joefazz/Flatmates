import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../consts/index';
import { toConstantFontSize } from '../utils/PercentageConversion';

export class CreateButton extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={ this.props.goBack } style={{ marginLeft: 10 }}>
                <Icon name={ 'ios-arrow-back' } size={ toConstantFontSize(4.7) } style={{ color: Colors.white }} />
            </TouchableOpacity>
        )
    }
}