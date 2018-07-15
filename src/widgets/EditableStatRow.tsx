import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { toConstantHeight } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';
import { Colors } from '../consts';

interface Row {
    label: string;
    value: string | number;
    editable?: boolean;
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
                        <View key={index} style={styles.statSquare} >
                            <TextInput
                                key={index}
                                style={styles.statText}
                                defaultValue={String(item.value)}
                                underlineColorAndroid={Colors.transparent}
                                editable={item.editable === false ? false : true}
                                onChangeText={(text) => {
                                    let items = this.state.items;
                                    items[index].value = text;
                                    this.setState({ items });
                                }}
                            />
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
        ...FontFactory({ weight: 'Bold' })
    },
    statTitle: {
        color: Colors.brandTertiaryColor,
        fontSize: 16,
        ...FontFactory()
    }
});
