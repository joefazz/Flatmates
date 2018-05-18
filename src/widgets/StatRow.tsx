import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { toConstantHeight } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';
import { Colors } from '../consts';

interface Props {
    first: Array<string>;
    second: Array<string>;
}
export class StatRow extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.statRow}>
                <View style={styles.statSquare}>
                    <Text style={styles.statText}>{this.props.first[0]}</Text>
                    <Text style={styles.statTitle}>{this.props.first[1]}</Text>
                </View>
                <View
                    style={{
                        alignSelf: 'stretch',
                        width: 1,
                        backgroundColor: Colors.grey
                    }}
                />
                <View style={styles.statSquare}>
                    <Text style={styles.statText}>{this.props.second[0]}</Text>
                    <Text style={styles.statTitle}>{this.props.second[1]}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statRow: {
        height: toConstantHeight(10),
        flexDirection: 'row'
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
