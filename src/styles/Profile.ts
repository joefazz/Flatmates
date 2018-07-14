import { StyleSheet } from 'react-native';

import { Colors, Font } from '../consts';
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
        fontSize: toConstantFontSize(4.5),
        paddingBottom: 10,
        paddingTop: 0,
    },

    aboutText: {
        fontSize: toConstantFontSize(3.5) > 24 ? 24 : toConstantFontSize(3.5),
        color: Colors.textGrey,
        ...Font.FontFactory({ weight: 'Light' })
    },

    headerAvatar: {
        height: toConstantWidth(34),
        width: toConstantWidth(34),
        borderRadius: toConstantWidth(34) / 2,
        backgroundColor: Colors.transparent,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 1,
            height: 1
        },
        marginVertical: 10,
        marginLeft: 15,
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowColor: Colors.black,
        elevation: 2
    },

    summaryWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: Colors.offWhite,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowColor: Colors.black,
        elevation: 2
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
        shadowColor: Colors.black,
        elevation: 2
    },

    summaryDescriptionWrapper: {
        flex: 2,
        backgroundColor: Colors.offWhite,
        alignItems: 'center',
        justifyContent: 'center'
    },

    summaryDescription: {
        ...FontFactory({ weight: 'Light' }),
        fontSize: 20,
        paddingVertical: 0
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
