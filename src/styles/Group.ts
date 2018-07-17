import { StyleSheet, Platform } from 'react-native';

import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Colors } from '../consts';
import {
    toConstantHeight,
    toConstantWidth,
    toConstantFontSize
} from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';

export const group = StyleSheet.create({
    // GROUP STYLES
    listItem: {
        height: toConstantHeight(10),
        width: toConstantWidth(100),
        backgroundColor: Colors.white,
        alignItems: 'center',
        flexDirection: 'row'
    },

    descWrapper: {
        width: toConstantWidth(70),
        paddingHorizontal: 10,
        justifyContent: 'space-evenly'
    },

    title: {
        fontSize: toConstantFontSize(2.3),
        ...FontFactory(),
        color: Colors.black
    },

    subtitle: {
        fontSize: toConstantFontSize(2),
        ...FontFactory({ weight: 'Light' })
    },

    unreadMarker: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: Colors.definetelyNotAirbnbRed,
        borderWidth: 1,
        borderColor: Colors.translucentDefinetelyNotAirbnbRed
    },

    // DETAIL STYLES
    detailWrapper: {
        alignItems: 'stretch',
        backgroundColor: '#e5ddd5',
        flex: 1,
        flexDirection: 'column'
    },

    // MESSAGE STYLES
    messageSpacer: {
        flex: 0.2
    },

    message: {
        flex: 0.8,
        backgroundColor: 'white',
        borderRadius: 6,
        marginHorizontal: 16,
        marginVertical: 2,
        paddingHorizontal: 8,
        paddingVertical: 6,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    myMessage: {
        backgroundColor: '#FF7A53'
    },

    messageText: {
        fontSize: 15
    },

    messageUsername: {
        color: 'red',
        fontWeight: 'bold',
        paddingBottom: 6
    },

    myMessageTime: {
        marginTop: 5,
        color: Colors.highlightWhite,
        fontSize: 12,
        textAlign: 'right'
    },

    messageTime: {
        marginTop: 5,
        color: Colors.grey,
        fontSize: 12,
        textAlign: 'right'
    },

    // MESSAGE INPUT STYLE
    iconStyle: {
        marginRight: 0
    },

    sendButtonWrapper: {
        ...Platform.select({
            ios: {
                width: 34,
                height: 34,
                borderRadius: 17,
                borderWidth: 1,
                borderColor: Colors.transparent,
                backgroundColor: Colors.brandPrimaryColor
            }
        }),
        alignItems: 'center',
        justifyContent: 'center'
    },

    messageInputContainer: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f1ee',
        borderColor: '#dbdbdb',
        paddingVertical: 3,
        borderTopWidth: 1,
        flexDirection: 'row',
        width: toConstantWidth(100),
        ...ifIphoneX({ paddingBottom: 27 }, { paddingBottom: 5 })
    },

    input: {
        width: toConstantWidth(77),
        backgroundColor: Colors.white,
        ...Platform.select({
            ios: {
                borderColor: '#dbdbdb',
                borderRadius: 15,
                borderWidth: 1,
                color: 'black',
                paddingBottom: 4,
                paddingHorizontal: 8,
                fontSize: 17,
                maxHeight: 200
            },
            android: {
                fontSize: 18,
                borderWidth: 1,
                borderColor: '#dbdbdb',
                borderRadius: 4,
                height: 50,
                paddingHorizontal: 4
            }
        })
    },

    sendButtonContainer: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: toConstantWidth(10)
    },

    attachButtonContainer: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: toConstantWidth(10)
    },

    imagePreviewContainer: {
        marginTop: 10,
        flexDirection: 'row',
        width: toConstantWidth(100),
        backgroundColor: '#f5f1ee',
        paddingVertical: 5
    },

    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        flexWrap: 'wrap'
    }
});
