import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { toConstantFontSize } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';
import { Colors } from '../consts';
import { StatRow } from '../widgets/StatRow';

interface Props {}

interface State {}

export default class House extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'My House'
    };

    render() {
        return (
            <View>
                <View style={styles.headingWrapper}>
                    <Text style={styles.heading}>De Beauvoir Road</Text>
                </View>
                <View style={styles.statisticsWrapper}>
                    <StatRow first={['23', 'Applications']} second={['67', 'Post Views']} />
                    <View
                        style={{
                            alignSelf: 'stretch',
                            height: 0.5,
                            backgroundColor: Colors.grey
                        }}
                    />
                    <StatRow first={['£430', 'Rent']} second={['£33', 'Bills']} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headingWrapper: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: Colors.offWhite,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 2
    },
    heading: {
        fontSize: toConstantFontSize(2.5),
        ...FontFactory({ weight: 'Bold' })
    },
    statisticsWrapper: {
        marginTop: 25,
        alignSelf: 'stretch',
        backgroundColor: Colors.offWhite,
        shadowColor: Colors.grey,
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
});
