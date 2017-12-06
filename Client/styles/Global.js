import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from '../consts';

export const base = StyleSheet.create({
    fullScreen: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    
    buttonOutline: {
        borderWidth: 1, 
        borderRadius: 3, 
        backgroundColor: 'transparent', 
        borderColor: 'transparent'
    },

    buttonStyle: {
        width: 250
    },
    
    content: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center',
    },
    
    headerWrapper: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    absoluteFill: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    
    listSeperator: {
        height: 1,
        width: "86%",
        backgroundColor: Colors.lineSeperatorColor,
        marginLeft: "14%"
    }
});


