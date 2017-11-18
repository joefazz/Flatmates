import { StyleSheet } from 'react-native';

import { Colors } from '../consts';

export const login = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    pageFooter: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    
    mainContent: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    
    headingWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    permissionsHeadingText: {
        fontWeight: '600',
        fontSize: 18,
        color: Colors.white,
        margin: 5,
    },
});
