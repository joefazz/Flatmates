import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Font } from '../consts';

interface Props {
    label: string,
    value: string
}

export class PreferenceRow extends React.PureComponent<Props> {

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
        ...Font.FontFactory({ weight: 'Light' })
    },

    value: {
        ...Font.FontFactory({ weight: 'Light' }),
        fontSize: 22,
        color: Colors.textGrey,
    }
});