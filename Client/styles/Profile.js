import { StyleSheet } from 'react-native';

import { Font, Colors } from '../consts';

export const profile = StyleSheet.create({
    headerPanel: {
        flex: 1,
        maxHeight: 400
    },

    headerTextWrapper: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 5,
        backgroundColor: Colors.highlightWhite,
        shadowOffset: {
            height: 4,
        },
        shadowColor: Colors.grey,
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },

    headerText: {
        fontFamily: Font.FONT_FAMILY,
        fontWeight: 'bold',
    },

    headerAvatar: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    contentWrapper: {
        flex: 1, 
        marginHorizontal: 10,
        marginBottom: 10,
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 3,
        borderRadius: 3,

        
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: Colors.highlightWhite
    },

    aboutLabel: {
        fontSize: 15,
        fontWeight: '300',
        color: Colors.brandSecondaryColor,
        fontFamily: Font.FONT_FAMILY,
        alignSelf: 'flex-start'
    },

    aboutText: {
        fontSize: 22,
        color: Colors.textGrey,
        fontFamily: Font.FONT_FAMILY,
        fontWeight: '200'
    },

    ageGenderWrapper: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    preferencesWrapper: {
        marginTop: 20,
    },

    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

