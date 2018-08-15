import { Platform, StyleSheet } from 'react-native';

import { Colors, Metrics } from '../consts';
import { Font } from '../consts';
import { toConstantWidth } from '../utils/PercentageConversion';

export const login = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    pageFooter: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    mainContent: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    congratsText: {
        ...Font.FontFactory({ weight: 'Light' }),
        fontSize: 60,
        color: Colors.white,
        backgroundColor: Colors.transparent,
        alignSelf: 'center'
    },

    congratsSubtitleText: {
        ...Font.FontFactory({ weight: 'Bold' }),
        fontSize: 16,
        color: Colors.white,
        backgroundColor: Colors.transparent,
        alignSelf: 'center'
    },

    dotStyle: {
        backgroundColor: Colors.transparent,
        borderWidth: 1,
        borderColor: Colors.textHighlightColor
    },

    profileName: {
        ...Font.FontFactory({ weight: 'Bold' }),
        fontSize: 32,
        color: Colors.brandPrimaryColor
    },

    profileHeading: {
        ...Font.FontFactory({ weight: 'Light' }),
        fontSize: 20,
        marginTop: 5,
        marginBottom: 15,
        color: Colors.textGrey
    },

    profileInput: {
        ...Font.FontFactory(),
        color: Colors.textHighlightColor,
        width: toConstantWidth(70),
        fontSize: 18,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: Colors.grey
    },

    modalInput: {
        width: toConstantWidth(70),
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },

    marginTop: {
        marginTop: 20
    },

    marginBottom: {
        marginBottom: 20
    },

    marginVertical: {
        marginVertical: 20
    },

    shortIDStyle: {
        ...Font.FontFactory({ weight: 'Light' }),
        fontSize: 72,
        backgroundColor: Colors.transparent,
        color: Colors.white,
        alignSelf: 'center'
    },

    pickerActivator: {
        width: 200,
        borderBottomWidth: 1,
        borderColor: Colors.grey
    },

    pickerActivatorText: {
        ...Font.FontFactory(),
        color: Colors.textHighlightColor,
        width: 200,
        fontSize: 18
    },

    pickerWrapper: {
        position: 'absolute',
        bottom: 0,
        width: toConstantWidth(100),
        height: Metrics.screenHeight * 0.4,
        backgroundColor: Colors.backgroundWhite
    },

    houseIDInput: {
        ...Font.FontFactory(),
        color: Colors.textHighlightColor,
        width: 100,
        fontSize: 24,
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        textAlign: 'center'
    },

    hyperlink: {
        ...Font.FontFactory({ family: 'Nunito' }),
        fontSize: 14,
        color: Colors.brandTertiaryColor,
        textDecorationLine: 'underline'
    },

    poundStyle: {
        ...Font.FontFactory(),
        color: Colors.grey,
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 1
    },

    priceInputWrapper: {
        flexDirection: 'row'
    }
});
