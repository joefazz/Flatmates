import { Dimensions, Platform, StyleSheet } from 'react-native';

import { Colors, Font } from '../consts';
import { toConstantFontSize, toConstantWidth } from '../utils/PercentageConversion';

export const base = StyleSheet.create({
    fullScreen: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },

    headingWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headingText: {
        ...Font.FontFactory({ family: 'Nunito' }),
        fontSize: toConstantFontSize(3),
        color: Colors.textHighlightColor,
        margin: 5,
    },

    buttonStyle: {
        width: 250,
        backgroundColor: Colors.brandSecondaryColor,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Colors.transparent
    },

    buttonTextStyle: {
        ...Font.FontFactory({ family: 'Nunito' }),
        fontSize: 24,
    },

    labelText: {
        ...Font.FontFactory({ weight: 'Light' }),
        fontSize: 16,
        color: Colors.textHighlightColor,
        alignSelf: 'flex-start',
        marginVertical: 5,
    },

    fullWidthInput: {
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.textHighlightColor,
        width: 270,
        fontSize: 18,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: Colors.grey
    },

    halfWidthInput: {
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.textHighlightColor,
        width: 110,
        fontSize: 18
    },

    content: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center',
    },

    wholePage: {
        flex: 1
    },

    headerWrapper: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    absoluteFill: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },

    listSeperator: {
        height: 1,
        width: toConstantWidth(86),
        backgroundColor: Colors.lineSeperatorColor,
        marginLeft: toConstantWidth(14)
    }
});
