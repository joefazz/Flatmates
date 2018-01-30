import { StyleSheet } from 'react-native';

import { Metrics, Colors } from '../consts';
import { toConstantHeight, toConstantWidth } from '../utils/PercentageConversion';

export const feed = StyleSheet.create({
    card: {
        height: toConstantHeight(36),
        width: toConstantWidth(90), 
        marginVertical: 10,    
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
    }
});