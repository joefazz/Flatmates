import { StyleSheet, Platform } from 'react-native';

import { Colors } from '../consts';

export const chat = StyleSheet.create({
    // GROUP STYLES
    row: {
        marginVertical: 5,
    },
        
    groupTextWrapper: {
        flex: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    groupRowWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    
    groupAvatarWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    groupTitleWrapper: {
        flex: 3,
    },

    groupSubtitleWrapper: {
        flex: 1,
    },

    groupTitle: {
        fontSize: 20
    },

    groupSubtitle: {
        fontSize: 16,
        fontWeight: '300'
    },

    // DETAIL STYLES
    detailWrapper: {
        alignItems: 'stretch',
        backgroundColor: '#e5ddd5',
        flex: 1,
        flexDirection: 'column',
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
        shadowOffset: {
            height: 1,
        },
    },

    myMessage: {
        backgroundColor: '#dcf8c6',
    },

    messageUsername: {
        color: 'red',
        fontWeight: 'bold',
        paddingBottom: 12,
    },

    messageTime: {
        color: '#8c8c8c',
        fontSize: 11,
        textAlign: 'right',
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
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'transparent',
                backgroundColor: Colors.brandSecondaryColor,
            },
        })
    },

    messageInputContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#f5f1ee',
        borderColor: '#dbdbdb',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingBottom: 20 // iPhone X padding required
    },

    inputContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },

    input: {
        ...Platform.select({
            ios: {
                backgroundColor: 'white',
                borderColor: '#dbdbdb',
                borderRadius: 15,
                borderWidth: 1,
                color: 'black',
                height: 32,
                paddingHorizontal: 8,
            },
            android: {
                fontSize: 18,
                borderWidth: 1,
                borderColor: '#dbdbdb',
                borderRadius: 4,
                height: 50,
                paddingHorizontal: 8
            }
        })
    },

    sendButtonContainer: {
        paddingRight: 12,
        alignSelf: 'center',
    },
})
