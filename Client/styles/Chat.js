import { StyleSheet } from 'react-native';

export const chat = StyleSheet.create({
    // GROUP STYLES
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
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    // DETAIL STYLES
    container: {
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
})
