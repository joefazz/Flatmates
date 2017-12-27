import { StyleSheet } from 'react-native';

import { Metrics, Colors } from '../consts';

export const feed = StyleSheet.create({
    card: {
        height: Metrics.screenHeight * 0.4,
        width: Metrics.screenWidth * 0.9, 
        marginVertical: 10,    
    },
});