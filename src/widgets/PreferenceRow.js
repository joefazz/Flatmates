import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Font } from '../consts';

export class PreferenceRow extends React.Component {

    render() {
        return (
            <View style={ styles.wrapper }>
                <Text style={ styles.label }>{this.props.label}</Text>
                <Text style={ styles.value }>{this.props.value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 5,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    label: {
        fontSize: 22,
        color: Colors.brandSecondaryColor,
        ...Font.FontFactory({ family: 'Nunito', weight: 'Light' })
    },

    value: {
        ...Font.FontFactory({ family: 'Nunito', weight: 'Light' }),
        fontSize: 22,
        color: Colors.textGrey,
    }
});