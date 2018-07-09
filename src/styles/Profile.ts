import { StyleSheet } from 'react-native';

import { Colors, Font, Metrics } from '../consts';
import { toConstantFontSize, toConstantWidth } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';

export const profile = StyleSheet.create({
    headerPanel: {
        flex: 1
    },

    headerTextWrapper: {
        paddingLeft: 10,
        backgroundColor: Colors.highlightWhite,
        shadowOffset: {
            height: 4,
            width: 0
        },
        shadowColor: Colors.grey,
        shadowOpacity: 0.6,
        elevation: 3,
        shadowRadius: 4
    },

    headerText: {
        ...Font.FontFactory({ weight: 'Bold' }),
        color: Colors.black,
        fontSize: toConstantFontSize(6) > 45 ? 32 : toConstantFontSize(6),
        paddingBottom: 10
    },

    aboutText: {
        fontSize: toConstantFontSize(3.5) > 24 ? 24 : toConstantFontSize(3.5),
        color: Colors.textGrey,
        ...Font.FontFactory({ weight: 'Light' })
    },

    headerAvatar: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: Colors.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowColor: Colors.black
    },

    summaryWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: Colors.offWhite,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowColor: Colors.black
    },

    statWrapper: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowColor: Colors.black
    },

    summaryDescriptionWrapper: {
        flex: 2,
        backgroundColor: Colors.offWhite,
        alignItems: 'center',
        justifyContent: 'center'
    },

    summaryDescription: {
        ...FontFactory({ weight: 'Light' }),
        fontSize: 20
    },

    aboutLabel: {
        fontSize: 15,
        color: Colors.brandPrimaryColor,
        ...Font.FontFactory({ weight: 'Light' })
    },

    ageGenderWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    preferencesWrapper: {
        alignItems: 'stretch',
        borderTopWidth: 1,
        borderColor: Colors.grey
    },

    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
