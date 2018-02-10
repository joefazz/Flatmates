import { StyleSheet } from 'react-native';

import { Colors, Font, Metrics } from '../consts';

export const profile = StyleSheet.create({
    headerPanel: {
        flex: 1,
        maxHeight: 400
    },

    headerTextWrapper: {
        height: Metrics.screenHeight * 0.15,
        paddingBottom: 5,
        backgroundColor: Colors.highlightWhite,
        shadowOffset: {
            height: 4,
            width: 0
        },
        shadowColor: Colors.grey,
        shadowOpacity: 0.6,
        elevation: 3,
        shadowRadius: 4,
    },

    headerText: {
        ...Font.FontFactory({ weight: 'Bold' }),
        color: Colors.black,
        paddingLeft: 10,
    },

    headerAvatar: {
        height: Metrics.screenHeight * 0.21,
        paddingTop: Metrics.screenHeight * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
    },

    interactableWrapper: {
        minHeight: 1000,
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

        padding: Metrics.screenWidth * 0.035,
        alignItems: 'stretch',
        backgroundColor: Colors.highlightWhite
    },

    aboutLabel: {
        fontSize: 15,
        color: Colors.brandSecondaryColor,
        ...Font.FontFactory({ weight: 'Light' }),
        alignSelf: 'flex-start'
    },

    aboutText: {
        fontSize: 22,
        color: Colors.textGrey,
        ...Font.FontFactory({ weight: 'Light' }),
    },

    ageGenderWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    preferencesWrapper: {
        marginTop: 10,
        justifyContent: 'space-between'
    },

    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
