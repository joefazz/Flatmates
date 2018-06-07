import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { toConstantHeight } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';
import { Colors } from '../consts';

interface Row {
    label: string;
    value: string | number;
}

interface Props {
    items: Array<Row>;
}
export class StatRow extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.statRow}>
                {this.props.items.map((item, index) => (
                    <>
                        <View style={styles.statSquare}>
                            <Text style={styles.statText}>{item.value}</Text>
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
                    </>
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
        elevation: 1,
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
