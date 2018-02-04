import React, {Fragment} from 'react';
import { Text, StyleSheet } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, Colors } from '../consts';
import { toConstantWidth, toConstantHeight } from '../utils/PercentageConversion';

type Props = {
    underlayColor: any,
    buttonStyle: {},
    title: string,
    onPress: () => mixed,
    iconName: string
}

export class TouchableRect extends React.Component<Props> {

    render() {
        return (
            <RectButton underlayColor={this.props.underlayColor} style={[this.props.buttonStyle, styles.buttonContentWrapper]} onPress={this.props.onPress}>
                {this.props.icon ?
                    <Icon name={this.props.iconName} style={styles.iconStyle} size={26}/> :
                    <Fragment /> 
                }
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </RectButton>
        );
    }
}

const styles = StyleSheet.create({
    buttonContentWrapper: {
        width: toConstantWidth(66.5),
        height: toConstantHeight(7.5),
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'space-around'
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