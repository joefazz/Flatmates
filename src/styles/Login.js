import { StyleSheet, Platform } from 'react-native';

import { Colors, Metrics } from '../consts';
import { Font } from '../consts';
import { toConstantFontSize } from '../utils/PercentageConversion';

export const login = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    pageFooter: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    
    mainContent: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    congratsText: {
        ...Font.FontFactory({ family: 'Nunito', weight: 'Light' }),
        fontSize: 60,
        color: Colors.white,
        backgroundColor: Colors.transparent,
        alignSelf: 'center',
    },

    congratsSubtitleText: {
        ...Font.FontFactory({ family: 'Nunito', weight: 'Bold' }),
        fontSize: 16,
        color: Colors.white,
        backgroundColor: Colors.transparent,
        alignSelf: 'center',
    },

    dotStyle: {
        backgroundColor: Colors.transparent, 
        borderWidth: 1, 
        borderColor: Colors.textHighlightColor
    },

    profileName: { 
        ...Font.FontFactory({ family: 'Nunito', weight: 'Bold' }),
        fontSize: 32, 
        color: Colors.brandSecondaryColor 
    },

    profileHeading: {
        ...Font.FontFactory({ family: 'Nunito', weight: 'Light' }),
        fontSize: 20, 
        marginTop: 5, 
        marginBottom: 15, 
        color: Colors.textGrey
    },

    profileInput: { 
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.textHighlightColor, 
        width: 300, 
        fontSize: 18, 
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0, 
        borderColor: Colors.grey 
    },

    marginTop: {
        marginTop: 20,
    },

    marginBottom: {
        marginBottom: 20,
    },

    marginVertical: {
        marginVertical: 20,
    },

    shortIDStyle: {
        ...Font.FontFactory({ family: 'Nunito', weight: 'Light' }),
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
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.textHighlightColor, 
        width: 200, 
        fontSize: 18
    },

    pickerWrapper: { 
        position: 'absolute', 
        bottom: 0, 
        right: 0, 
        left: 0, 
        width: Metrics.screenWidth, 
        height: Metrics.screenHeight * 0.4, 
        backgroundColor: Colors.backgroundWhite 
    },

    houseIDInput: {
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.textHighlightColor, 
        width: 75, 
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
        ...Font.FontFactory({ family: 'Nunito' }),
        color: Colors.grey, 
        fontSize: 18 
    },

    priceInputWrapper: {
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: Colors.grey
    }        
});
