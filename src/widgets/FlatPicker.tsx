import React from 'react';

import Pickerise from 'react-native-pickerise';
import { feed } from '../styles';
import { Colors } from '../consts';
import { FontFactory } from '../consts/font';
import { toConstantFontSize, toConstantHeight } from '../utils/PercentageConversion';

interface Item {
    section?: boolean;
    label: string;
}

interface Props {
    items: Array<Item>;
    onChange: (Item) => void;
    selectStyle?: any;
    selectTextStyle?: any;
    initialValue: string;
}

export class FlatPicker extends React.PureComponent<Props> {
    render() {
        return (
            <Pickerise
                selectStyle={this.props.selectStyle ? this.props.selectStyle : feed.filterItem}
                sectionStyle={{
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    borderBottomWidth: 0,
                    padding: 0,
                    marginTop: toConstantHeight(1.5)
                }}
                sectionTextStyle={{
                    color: Colors.brandSecondaryColor,
                    ...FontFactory({ weight: 'Bold' }),
                    fontSize: toConstantFontSize(3.5)
                }}
                itemStyle={{
                    marginTop: toConstantHeight(0.8),
                    borderBottomWidth: 0,
                    padding: 0,
                    paddingVertical: toConstantHeight(1),
                    alignSelf: 'flex-start'
                }}
                itemTextStyle={{
                    alignSelf: 'flex-start',
                    color: Colors.brandSecondaryColor,
                    fontSize: toConstantFontSize(2.5),
                    ...FontFactory({ weight: 'Light' })
                }}
                overlayStyle={{
                    backgroundColor: Colors.white,
                    alignItems: 'flex-start'
                }}
                cancelTextStyle={{
                    color: Colors.brandSecondaryColor,
                    ...FontFactory(),
                    fontSize: toConstantFontSize(3),
                    height: toConstantHeight(5)
                }}
                initValue={this.props.initialValue}
                selectTextStyle={
                    this.props.selectTextStyle ? this.props.selectTextStyle : feed.filterItemText
                }
                onChange={this.props.onChange}
                items={this.props.items}
            />
        );
    }
}
