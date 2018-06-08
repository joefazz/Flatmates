import React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {
    toConstantFontSize,
    toConstantWidth,
    toConstantHeight
} from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';
import { Colors } from '../consts';
import { StatRow } from '../widgets/StatRow';
import { Button } from 'react-native-elements';
import { ReduxState } from '../types/ReduxTypes';
import { House as HouseType } from '../types/Entities';

interface Props {
    house: HouseType;
}

interface State {}

export class House extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'My House'
    };

    render() {
        const { house } = this.props;

        if (!house) {
            return (
                <View>
                    <Text>
                        You don't have a house either make one to see what this page looks like or
                        suffer until I think of something to put here xo
                    </Text>
                    <Button
                        title={'RESET DATA BACK TO LOGIN'}
                        containerViewStyle={{ marginTop: 20 }}
                        backgroundColor={Colors.brandPrimaryColor}
                        onPress={() => AsyncStorage.clear(() => this.props.navigation.navigate('Login'))} />
                </View>
            );
        }

        return (
            <View style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}>
                <View style={styles.headingWrapper}>
                    <Text style={styles.heading}>{house.road} - NOT DONE</Text>
                </View>

                <View style={styles.statisticsWrapper}>
                    <StatRow
                        items={[
                            { label: 'House ID', value: house.shortID },
                            { label: 'Free Rooms', value: house.spaces }
                        ]}
                    />
                    <View
                        style={{
                            alignSelf: 'stretch',
                            height: 0.5,
                            backgroundColor: Colors.grey
                        }}
                    />
                    <StatRow
                        items={[
                            { label: 'Applications', value: 23 },
                            { label: 'Post Views', value: 67 }
                        ]}
                    />
                </View>
                <View style={styles.statisticsWrapper}>
                    <StatRow
                        items={[
                            { label: 'Rent Due', value: '25th' },
                            { label: 'Bills Due', value: '23rd' }
                        ]}
                    />
                    <View
                        style={{
                            alignSelf: 'stretch',
                            height: 0.5,
                            backgroundColor: Colors.grey
                        }}
                    />
                    <StatRow
                        items={[
                            { label: 'Rent', value: '£' + String(house.rentPrice) },
                            { label: 'Bills', value: '£' + String(house.billsPrice) }
                        ]}
                    />
                </View>

                {/*house.users.length > 1 ? (
                        <ScrollView
                            contentContainerStyle={profile.preferencesWrapper}
                        >
                            <Text style={profile.aboutLabel}>Flatmates</Text>
                            {house.users.map((flatmate) => {
                                return (
                                    <Text
                                        key={flatmate.name}
                                        style={profile.aboutText}
                                    >
                                        {flatmate.name}
                                    </Text>
                                );
                            })}
                        </ScrollView>
                    ) : (
                        <React.Fragment />
                    )*/}

                <Button
                    title={'RESET DATA BACK TO LOGIN'}
                    containerViewStyle={{ marginTop: 20 }}
                    backgroundColor={Colors.brandPrimaryColor}
                    onPress={() => AsyncStorage.clear(() => this.props.navigation.navigate('Login'))}
                />
                <Button
                    title={'Send Payment Reminder'}
                    containerViewStyle={{
                        position: 'absolute',
                        bottom: 100,
                        left: 0,
                        right: 0,

                        height: 100
                    }}
                    backgroundColor={Colors.brandPrimaryColor}
                    onPress={() => AsyncStorage.clear(() => this.props.navigation.navigate('Login'))}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    house: state.profile.house
});

export default connect(mapStateToProps)(House);

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
        marginTop: 25
    }
});
