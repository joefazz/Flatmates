import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, Colors } from '../consts';
import { toConstantWidth, toConstantHeight } from '../utils/PercentageConversion';

interface Props  {
    underlayColor: any,
    buttonStyle: {backgroundColor: any},
    wrapperStyle: {},
    title: string,
    onPress: () => void,
    iconName: string,
    backgroundColor: string,
}

export class TouchableRect extends React.Component<Props> {

    render() {
        // The wrapping view is neccessary otherwise border radius doesn't work on android for some reason
        return (
            <View style={[styles.borderWrapper, this.props.wrapperStyle, {backgroundColor: this.props.backgroundColor}]}>
                <RectButton underlayColor={this.props.underlayColor} style={[this.props.buttonStyle, styles.buttonContentWrapper, {backgroundColor: this.props.backgroundColor}]} onPress={this.props.onPress}>
                    {this.props.iconName ?
                        <Icon name={this.props.iconName} style={[styles.iconStyle, {marginRight: 10}]} size={26}/> :
                        <React.Fragment /> 
                    }
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </RectButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    borderWrapper: {
        padding: 1,
        borderRadius: 3,
    },

    buttonContentWrapper: {
        width: toConstantWidth(66.4),
        height: toConstantHeight(7.4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconStyle: {
        color: Colors.white
    },

    textStyle: {
        color: Colors.white,
        fontSize: 20, 
        ...Font.FontFactory({ family: 'Nunito' }),
    }

});