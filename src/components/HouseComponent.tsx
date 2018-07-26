import React from 'react';
import { View, TextInput, Text, StyleSheet, AsyncStorage } from 'react-native';
import { EditableStatRow } from '../widgets/EditableStatRow';
import { Button } from 'react-native-elements';
import { StatRow } from '../widgets/StatRow';
import { House } from '../types/Entities';
import { toConstantWidth, toConstantHeight, toConstantFontSize } from '../utils/PercentageConversion';
import { Colors } from '../consts';
import { FontFactory } from '../consts/font';
import { UpdateHouseMutationVariables } from '../graphql/Types';

interface Props {
    house: House;
    road: string;
    contentEditable: boolean;
    updateHouse: (params: UpdateHouseMutationVariables) => void;
    navigation: { navigate: (route: string) => void; }
    setRoad: (road: string, spaces: number, billsPrice: number, rentPrice: number) => void;
}

export class HouseComponent extends React.Component<Props> {
    render() {
        const { house } = this.props;

        if (this.props.contentEditable) {
            return (
                <>
                    <View style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}>
                        <View style={styles.headingWrapper}>
                            <TextInput style={styles.heading} defaultValue={house.road} onChangeText={(text) => this.props.setRoad(text, house.spaces, house.billsPrice, house.rentPrice)} />
                        </View>

                        <View style={styles.statisticsWrapper}>
                            <EditableStatRow
                                items={[
                                    { label: 'House ID', value: house.shortID, editable: false },
                                    { label: house.spaces === 1 ? 'Free Room' : 'Free Rooms', value: house.spaces, inputType: 'number' }
                                ]}
                                onEndEditing={(items: Array<{ value: string; label: string }>) =>
                                    items.map((item) => {
                                        switch (item.label) {
                                            case house.spaces === 1 ? 'Free Room' : 'Free Rooms':
                                                if (house.spaces !== Number(item.value)) {
                                                    this.props.updateHouse({
                                                        shortID: house.shortID,
                                                        road: house.road,
                                                        spaces: Number(item.value),
                                                        billsPrice: house.billsPrice,
                                                        rentPrice: house.rentPrice
                                                    });
                                                }
                                                break;
                                        }
                                    })
                                }
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
                                    { label: 'Applications', value: house.applicationCount },
                                    { label: 'Post Views', value: house.post.viewCount }
                                ]}
                            />
                        </View>
                        <View style={styles.statisticsWrapper}>
                            <EditableStatRow
                                items={[
                                    { label: 'Rent Due', value: '25th' },
                                    { label: 'Bills Due', value: '23rd' }
                                ]}
                                onEndEditing={(items: Array<{ value: string; label: string }>) =>
                                    items.map((item) => {
                                        switch (item.label) {
                                            case 'Rent Due':
                                                // this.setState({ rentDue: Number(item.value) });
                                                break;
                                            case 'Bills Due':
                                                // this.setState({ billsDue: Number(item.value) });
                                                break;
                                        }
                                    })
                                }
                            />
                            <View
                                style={{
                                    alignSelf: 'stretch',
                                    height: 0.5,
                                    backgroundColor: Colors.grey
                                }}
                            />
                            <EditableStatRow
                                items={[
                                    { label: 'Rent', value: String(house.rentPrice), inputType: 'number' },
                                    { label: 'Bills', value: String(house.billsPrice), inputType: 'number' }
                                ]}
                                onEndEditing={(items: Array<{ value: string; label: string }>) =>
                                    items.map((item) => {
                                        let value = item.value;
                                        value = value.replace('£', '');
                                        switch (item.label) {
                                            case 'Rent':
                                                if (house.rentPrice !== Number(value)) {
                                                    this.props.updateHouse({
                                                        shortID: this.props.house.shortID,
                                                        road: house.road,
                                                        spaces: house.spaces,
                                                        rentPrice: Number(value),
                                                        billsPrice: house.billsPrice
                                                    });
                                                }
                                                break;
                                            case 'Bills':
                                                if (house.billsPrice !== Number(value)) {
                                                    this.props.updateHouse({
                                                        shortID: this.props.house.shortID,
                                                        road: house.road,
                                                        spaces: house.spaces,
                                                        rentPrice: house.rentPrice,
                                                        billsPrice: Number(value),
                                                    });
                                                }
                                                break;
                                        }
                                    }
                                    )}

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
                            onPress={() =>
                                AsyncStorage.clear(() => this.props.navigation.navigate('Login'))
                            }
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
                            onPress={() =>
                                AsyncStorage.clear(() => this.props.navigation.navigate('Login'))
                            }
                        />
                    </View>
                </>
            );
        }

        return (
            <>
                <View style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}>
                    <View style={styles.headingWrapper}>
                        <Text style={styles.heading}>{this.props.road}</Text>
                    </View>

                    <View style={styles.statisticsWrapper}>
                        <StatRow
                            items={[
                                { label: 'House ID', value: house.shortID },
                                { label: house.spaces === 1 ? 'Free Room' : 'Free Rooms', value: house.spaces }
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
                                { label: 'Applications', value: house.applicationCount },
                                { label: 'Post Views', value: house.post.viewCount }
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
                        onPress={() =>
                            AsyncStorage.clear(() => this.props.navigation.navigate('Login'))
                        }
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
                        onPress={() =>
                            AsyncStorage.clear(() => this.props.navigation.navigate('Login'))
                        }
                    />
                </View>
            </>
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
        marginTop: 25
    }
});
