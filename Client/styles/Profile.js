import { StyleSheet } from 'react-native';

import { Font, Colors, Metrics } from '../consts';

export const profile = StyleSheet.create({
    headerPanel: {
        flex: 1,
        maxHeight: 400
    },

    headerTextWrapper: {
        height: Metrics.screenHeight * 0.15,
        paddingLeft: 10,
        paddingBottom: 5,
        backgroundColor: Colors.highlightWhite,
        shadowOffset: {
            height: 4,
        },
        shadowColor: Colors.grey,
        shadowOpacity: 0.6,
        elevation: 3,
        shadowRadius: 4,
    },

    headerText: {
        ...Font.FontFactory({ family: 'Nunito', weight: 'Bold' }),
        color: Colors.black
    },

    headerAvatar: {
        height: Metrics.screenHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    interactableWrapper: {
    },

    contentWrapper: {
        marginHorizontal: 10,
        marginBottom: 15,
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 3,
        borderRadius: 3,

        paddingHorizontal: 20,
        paddingTop: 15,
        alignItems: 'stretch',
        backgroundColor: Colors.highlightWhite
    },

    aboutLabel: {
        fontSize: 15,
        color: Colors.brandSecondaryColor,
        ...Font.FontFactory({ family: 'Nunito', weight: 'Light' }),
        alignSelf: 'flex-start'
    },

    aboutText: {
        fontSize: 22,
        color: Colors.textGrey,
        ...Font.FontFactory({ family: 'Nunito', weight: 'Light' }),
    },

    ageGenderWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    preferencesWrapper: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-between'
    },

    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

