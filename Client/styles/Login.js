import { StyleSheet } from 'react-native';

import { Colors, Metrics } from '../consts';
import { Font } from '../consts';

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
    
    headingWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    headingText: {
        fontFamily: Font.FONT_FAMILY,
        fontSize: 18,
        color: Colors.textHighlightColor,
        margin: 5,
    },

    labelText: {
        fontFamily: Font.FONT_FAMILY,
        fontSize: 16,
        color: Colors.textHighlightColor,
        alignSelf: 'flex-start',
        fontWeight: '200',
        marginVertical: 5,
    },

    congratsText: {
        fontFamily: Font.FONT_FAMILY,
        fontSize: 60,
        color: Colors.white,
        fontWeight: '300',
        backgroundColor: 'transparent',
        alignSelf: 'center',
    },

    congratsSubtitleText: {
        fontFamily: Font.FONT_FAMILY,
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        alignSelf: 'center',
    },

    dotStyle: {
        backgroundColor: 'transparent', 
        borderWidth: 1, 
        borderColor: Colors.textHighlightColor
    },

    profileName: { 
        fontFamily: Font.FONT_FAMILY,
        fontSize: 32, 
        fontWeight: 'bold', 
        color: Colors.brandSecondaryColor 
    },

    profileHeading: {
        fontFamily: Font.FONT_FAMILY,
        fontSize: 20, 
        marginTop: 5, 
        marginBottom: 15, 
        fontWeight: '300', 
        color: Colors.textGrey
    },

    profileInput: { 
        fontFamily: Font.FONT_FAMILY,
        color: Colors.textHighlightColor, 
        width: 300, 
        fontSize: 18, 
        borderBottomWidth: 1, 
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
        fontFamily: Font.FONT_FAMILY,
        fontSize: 72, 
        fontWeight: '100', 
        backgroundColor: 'transparent', 
        color: Colors.white, 
        alignSelf: 'center'
    },

    pickerActivator: { 
        width: 200, 
        borderBottomWidth: 1, 
        borderColor: Colors.grey  
    },

    pickerActivatorText: {
        fontFamily: Font.FONT_FAMILY,
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
        fontFamily: Font.FONT_FAMILY,
        color: Colors.textHighlightColor, 
        width: 75, 
        fontSize: 24, 
        borderBottomWidth: 1, 
        borderColor: Colors.grey, 
        textAlign: 'center'
    },

    hyperlink: { 
        fontFamily: Font.FONT_FAMILY,
        fontSize: 14,
        color: Colors.brandTertiaryColor, 
        textDecorationLine: 'underline' 
    },

    houseDetailFullWidthInput: {
        fontFamily: Font.FONT_FAMILY,
        color: Colors.textHighlightColor, 
        width: 270, 
        fontSize: 18, 
        borderBottomWidth: 1, 
        borderColor: Colors.grey
    },

    houseDetailHalfWidthInput: { 
        fontFamily: Font.FONT_FAMILY,
        color: Colors.textHighlightColor, 
        width: 110, 
        fontSize: 18 
    },

    poundStyle: {
        fontFamily: Font.FONT_FAMILY,
        color: Colors.textHighlightColor, 
        fontSize: 18 
    },

    priceInputWrapper: {
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: Colors.grey
    }        
});
