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
        justifyContent: 'center'
    },

    headingText: {
        ...Font.FontFactory({ family: 'Nunito' }),
        fontSize: toConstantFontSize(3),
        color: Colors.textHighlightColor,
        margin: 5
    },

    headingTitle: {
        ...Font.FontFactory({ weight: 'Bold', family: 'Nunito' }),
        color: Colors.textHighlightColor,
        fontSize: 24
    },

    headingSubtitle: {
        ...Font.FontFactory({ weight: 'Light', family: 'Nunito' }),
        color: Colors.textHighlightColor,
        fontSize: 18
    },

    buttonStyle: {
        width: 250,
        backgroundColor: Colors.brandPrimaryColor,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Colors.transparent
    },

    buttonTextStyle: {
        ...Font.FontFactory({ family: 'Nunito' }),
        fontSize: 24
    },

    labelText: {
        ...Font.FontFactory({ weight: 'Light' }),
        fontSize: 16,
        color: Colors.textHighlightColor,
        alignSelf: 'flex-start',

        marginTop: 5,
        marginLeft: Platform.OS === 'android' ? 4 : 0
    },

    pickerLabelText: {
        ...Font.FontFactory({ weight: 'Light' }),
        fontSize: 16,
        color: Colors.textHighlightColor,
        alignSelf: 'flex-start',

        marginTop: 5
    },

    fullWidthInput: {
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.textHighlightColor,
        width: toConstantWidth(80) + 20,
        fontSize: toConstantFontSize(2.5) > 18 ? 18 : toConstantFontSize(2.5),
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: Colors.grey
    },

    halfWidthInput: {
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.textHighlightColor,
        width: toConstantWidth(40),
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: Colors.grey,
        fontSize: toConstantFontSize(2.5) > 18 ? 18 : toConstantFontSize(2.5)
    },

    halfWidthWrapper: {
        marginTop: Platform.OS === 'android' ? 13.1 : 0,
        width: toConstantWidth(39),
        borderBottomWidth: 1,
        borderColor: Colors.grey
    },

    content: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center'
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
        width: toConstantWidth(100),
        backgroundColor: Colors.lineSeperatorColor
    }
});
