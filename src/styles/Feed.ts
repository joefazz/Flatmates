import { StyleSheet } from 'react-native';

import { Colors } from '../consts';
import { FontFactory } from '../consts/font';
import { toConstantFontSize, toConstantHeight, toConstantWidth } from '../utils/PercentageConversion';

export const feed = StyleSheet.create({
    // Create Styles
    descriptionInput: {
        width: toConstantWidth(85),
        height: toConstantHeight(25),
        paddingHorizontal: 5,
        backgroundColor: Colors.offWhite,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 3,
        ...FontFactory()
    },

    // List styles
    card: {
        height: toConstantHeight(36),
        width: toConstantWidth(90),
        marginVertical: 10,
    },

    filterWrapper: {
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowOpacity: 0.7,
        shadowRadius: 4,
        shadowColor: Colors.grey,
        elevation: 2,
        alignItems: 'center',
        backgroundColor: Colors.offWhite
    },

    // Filter styles
    filterContainer: {
        backgroundColor: Colors.offWhite,
    },

    filterItem: {
        marginTop: 5,
        borderColor: Colors.airbnbRed,
        borderRadius: 20,
        borderWidth: 1.5,
        height: toConstantHeight(5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: toConstantWidth(3)
    },

    expandBar: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.airbnbRed,
        shadowOffset: {
            height: 1,
            width: 0
        },
        flexDirection: 'row',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowColor: Colors.grey,
        elevation: 2
    },

    expandText: {
        color: Colors.highlightWhite,
        marginLeft: toConstantWidth(2),
        fontSize: toConstantFontSize(2),
        ...FontFactory({weight: 'Bold', family: 'Nunito'})
    },

    filterItemText: {
        color: Colors.airbnbRed,
        ...FontFactory({weight: 'Bold', family: 'Nunito'})
    },

    createCard: {
        width: toConstantWidth(90),
        marginVertical: 10,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: Colors.highlightWhite,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: Colors.grey,
        shadowRadius: 2,
        shadowOpacity: 0.7,
        height: toConstantHeight(30),
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.brandSecondaryColor, borderStyle: 'dashed'
    },

    swiper: {
        width: toConstantWidth(90),
    },

    image: {
        width: toConstantWidth(90),
        height: toConstantHeight(30)
    },

    content: {
        flex: 2
    },

    // Detail Styles
    detailImage: {
        height: toConstantHeight(30)
    },

    swiperButtonWrapperStyle: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    leftRightButtonStyle: {
        ...FontFactory({weight: 'Light'}),
        fontSize: toConstantFontSize(9),
        color: Colors.brandSecondaryColor
    },

    magnifierWrapper: {
        width: 40,
        height: 40,
        backgroundColor: Colors.offWhite,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: {
            height: 2,
            width: 1
        },
        shadowColor: Colors.grey,
        shadowRadius: 2,
        shadowOpacity: 0.7,
        elevation: 2
    },

    detailContentWrapper: {
        backgroundColor: Colors.white,
    },

    roadDateWrapper: {
        padding: toConstantFontSize(1)
    },

    roadText: {
        ...FontFactory({ weight: 'Light' }),
        fontSize: toConstantFontSize(3.5),
        color: Colors.brandTertiaryColor
    },

    dateText: {
        ...FontFactory(),
        fontSize: toConstantFontSize(2),
        color: Colors.black
    },

    spacesText: {
        ...FontFactory(),
        fontSize: toConstantFontSize(2),
        color: Colors.black,
    },

    descriptionWrapper: {
        backgroundColor: Colors.white,
        width: toConstantWidth(100),
        padding: toConstantFontSize(1),
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 5,
        shadowOpacity: 0.7,
        elevation: 2
    },

    descriptionText: {
        ...FontFactory({ weight: 'Bold' }),
        color: Colors.black,
        fontSize: toConstantFontSize(2)
    },

    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    priceItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        backgroundColor: Colors.brandSecondaryColor
    },

    priceText: {
        ...FontFactory({ weight: 'Bold' }),
        color: Colors.highlightWhite,
        fontSize: toConstantFontSize(2.3)
    },

    userRow: {
        flexDirection: 'row',
        paddingVertical: toConstantHeight(1),
        backgroundColor: Colors.white,
        width: toConstantWidth(100),
        shadowOffset: {
            height: 0,
            width: 0
        },
        shadowColor: Colors.grey,
        shadowRadius: 5,
        shadowOpacity: 0.7,
        elevation: 2,
    },

    avatarWrapper: {
        flex: 1,
        paddingHorizontal: toConstantWidth(2),
        alignItems: 'center',
        justifyContent: 'center'
    },

    userDetailsWrapper: {
        flex: 5,
        justifyContent: 'center',
        paddingRight: toConstantWidth(2)
    },

    labelText: {
        ...FontFactory({ weight: 'Bold'}),
        color: Colors.brandSecondaryColor,
        fontSize: toConstantFontSize(2.5),
        paddingHorizontal: toConstantFontSize(1)
    },

    userNameText: {
        ...FontFactory({ weight: 'Bold' }),
        fontSize: toConstantFontSize(2.2),
        color: Colors.black
    },

    userInfoText: {
        ...FontFactory(),
        fontSize: toConstantFontSize(1.7),
        color: Colors.black
    }

});