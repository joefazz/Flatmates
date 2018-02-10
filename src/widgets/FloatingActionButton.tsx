import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors, Metrics } from '../consts';

interface Props {
    iconName: string
}

export class FloatingActionButton extends React.Component<Props> {
    render() {
        if (Platform.OS === 'ios') {
            return <View />
        }

        if (this.props.children) {
            return (
                <View>
                    <TouchableOpacity activeOpacity={0.8} style={ styles.absoluteWrapper }>
                        <Icon name={this.props.iconName} size={32} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <TouchableOpacity activeOpacity={0.8} style={ styles.absoluteWrapper }>
                    <Icon name={this.props.iconName} size={32} color={Colors.white} />
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    absoluteWrapper: {
        position: 'absolute',
        bottom: Metrics.screenWidth * 0.05,
        right: Metrics.screenWidth * 0.05,
        width: 70,
        height: 70,
        borderRadius: 35,
        elevation: 4,
        backgroundColor: Colors.brandSecondaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
})