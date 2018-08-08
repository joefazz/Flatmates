import React from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '../consts';
import { FontFactory } from '../consts/font';
import { toConstantWidth } from '../utils/PercentageConversion';

interface Props {
    message: string;
    onPress: () => void;
}
export const ErrorToast = (props: Props) => (
    <View style={{ width: toConstantWidth(100), marginBottom: 10, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', elevation: 2, shadowColor: Colors.black, shadowOpacity: 0.4, shadowRadius: 2, shadowOffset: { height: 1, width: 0 } }}>
        <Icon name={'warning'} raised={true} reverse={true} size={20} color={Colors.brandWarningColor} containerStyle={{ marginRight: 10 }} />
        <View marginTop={20} marginRight={20}>
            <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 16 }}>{props.message}</Text>
            <Button title={'Tap to Retry'} onPress={() => props.onPress()} />
        </View>
    </View>
);