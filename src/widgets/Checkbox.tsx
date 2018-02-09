import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Colors, Font } from '../consts';

interface Props {
    title: string,
    onIconPress?: () => void,
    isChecked: boolean,
    color: string
}

export class Checkbox extends React.PureComponent<Props> {
    render() {
        return (
            <CheckBox
                title={this.props.title} 
                iconType={'material-community'}
                center={true}
                component={TouchableWithoutFeedback}
                containerStyle={{backgroundColor: Colors.transparent, borderWidth: 0}}
                textStyle={{color: this.props.color, fontSize: 18, ...Font.FontFactory({ family: 'Nunito' })}}
                onIconPress={this.props.onIconPress}
                onPress={this.props.onIconPress}
                checkedIcon={'checkbox-marked-circle'}
                uncheckedIcon={'checkbox-blank-circle-outline'}
                checked={this.props.isChecked}
                uncheckedColor={this.props.color}
                checkedColor={this.props.color}
            />
        );
    }
}