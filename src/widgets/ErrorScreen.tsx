import React from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '../consts';
import { FontFactory } from '../consts/font';

interface Props {
    message: string;
    onPress: () => void;
}
export const ErrorScreen = (props: Props) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={'warning'} raised={true} size={32} color={Colors.brandWarningColor} containerStyle={{ marginBottom: 20 }} />
        <Text style={{ ...FontFactory({ weight: 'Bold' }) }}>{props.message}</Text>
        <Button title={'Retry'} onPress={() => props.onPress()} />
    </View>
);