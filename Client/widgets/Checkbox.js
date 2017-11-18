import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Colors } from '../consts';

export default class Checkbox extends React.Component {
    render() {
        return <CheckBox 
            title={this.props.title} 
            iconType={'material-community'}
            center={true}
            component={TouchableWithoutFeedback}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            textStyle={{color: this.props.color, fontSize: 18}}
            onIconPress={this.props.onIconPress}
            onPress={this.props.onIconPress}
            checkedIcon={'checkbox-marked-circle'}
            uncheckedIcon={'checkbox-blank-circle-outline'}
            checked={this.props.isChecked} 
            uncheckedColor={this.props.color}
            checkedColor={this.props.color} />
    }
}