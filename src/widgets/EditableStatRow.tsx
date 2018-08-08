import React from 'react';
import { StyleSheet, View, Text, TextInput, Switch, Platform } from 'react-native';
import { toConstantHeight } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';
import { Colors } from '../consts';
import { FlatPicker } from './FlatPicker';

interface Row {
    label: string;
    value: string | number | boolean;
    editable?: boolean;
    inputType?: 'text' | 'multi' | 'switch' | 'number';
    multiOptions?: Array<{ label: string }>;
}

interface Props {
    items: Array<Row>;
    onEndEditing: (items: Array<Row>) => void;
}

interface State {
    items: Array<Row>;
}

export class EditableStatRow extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items
        };
    }

    componentWillUnmount() {
        this.props.onEndEditing(this.state.items);
    }

    render() {
        return (
            <View style={styles.statRow}>
                {this.props.items.map((item, index) => (
                    <React.Fragment key={index}>
                        <View key={index} style={styles.statSquare}>
                            {item.inputType === 'switch' && (
                                <Switch
                                    onTintColor={Colors.grey}
                                    thumbTintColor={Colors.brandPrimaryColor}
                                    tintColor={Colors.grey}
                                    onValueChange={(val) => {
                                        let items = this.state.items;
                                        items[index].value = val;
                                        this.setState({ items });
                                    }}
                                    value={item.value as boolean}
                                />)}
                            {item.inputType === 'multi' && (
                                <FlatPicker
                                    items={[
                                        {
                                            section: true,
                                            label: item.label
                                        },
                                        ...item.multiOptions
                                    ]}
                                    selectStyle={{ borderWidth: 0, padding: 0 }}
                                    selectTextStyle={styles.statText}
                                    onChange={(val) => {
                                        let items = this.state.items;
                                        items[index].value = val.label;
                                        this.setState({ items });
                                    }}
                                    initialValue={item.value as string}
                                />
                            )}
                            {(item.inputType === 'text' || item.inputType === 'number' || item.inputType === undefined) &&
                                <TextInput
                                    key={index}
                                    style={styles.statText}
                                    defaultValue={String(item.value)}
                                    underlineColorAndroid={Colors.transparent}
                                    keyboardType={item.inputType === 'number' ? 'numeric' : 'default'}
                                    editable={item.editable === false ? false : true}
                                    onChangeText={(text) => {
                                        let items = this.state.items;
                                        items[index].value = text;
                                        this.setState({ items });
                                    }}
                                />
                            }
                            <Text style={styles.statTitle}>{item.label}</Text>
                        </View>
                        {index === this.props.items.length - 1 ? (
                            <View />
                        ) : (
                                <View
                                    style={{
                                        alignSelf: 'stretch',
                                        width: 1,
                                        backgroundColor: Colors.grey
                                    }}
                                />
                            )}
                    </React.Fragment>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statRow: {
        height: toConstantHeight(10),
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: Colors.offWhite,
        shadowColor: Colors.grey,
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 2
    },
    statSquare: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statText: {
        color: Colors.brandTertiaryColor,
        fontSize: 18,
        paddingVertical: 0,
        width: 100,
        textAlign: 'center',
        alignItems: 'center',
        margin: 0,
        ...FontFactory({ weight: 'Bold' })
    },
    statTitle: {
        color: Colors.brandTertiaryColor,
        fontSize: 16,
        marginTop: Platform.OS === 'android' ? -2 : 0,
        ...FontFactory()
    }
});
