import { StyleSheet } from 'react-native';

import { Colors } from '../consts';
import { toConstantHeight, toConstantWidth, toConstantFontSize } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';

export const feed = StyleSheet.create({
    card: {
        height: toConstantHeight(36),
        width: toConstantWidth(90), 
        marginVertical: 10,    
    },

    filterWrapper: {
        shadowOffset: {
            height: 1
        },
        shadowOpacity: 0.7,
        shadowRadius: 4,
        shadowColor: Colors.grey,
        alignItems: 'center', 
        backgroundColor: Colors.offWhite
    },

    filterContainer: { 
        backgroundColor: Colors.offWhite, 
    },

    filterItem: { 
        width: toConstantWidth(90), 
        marginTop: 5,
        borderColor: Colors.airbnbRed,
        borderRadius: 20, 
        borderWidth: 1.5, 
        height: toConstantHeight(5), 
        justifyContent: 'center',
        paddingHorizontal: toConstantWidth(3) 
    },

    expandBar: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.airbnbRed,
        shadowOffset: {
            height: 1
        },
        flexDirection: 'row',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowColor: Colors.grey,
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
    }
});