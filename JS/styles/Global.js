import { Dimensions } from 'react-native';

import { Colors } from '../consts';

export const fullScreen = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
};

export const buttonOutline = {
    borderWidth: 1, 
    borderRadius: 3, 
    backgroundColor: 'transparent', 
    borderColor: Colors.white
}