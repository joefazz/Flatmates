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
};

export const content = {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
};

export const headerWrapper = {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
};

export const absoluteFill = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
};