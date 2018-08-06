import React from 'react';
import { View, TextInput, Text, StyleSheet, AsyncStorage, Alert, TouchableOpacity, RefreshControl } from 'react-native';
import { EditableStatRow } from '../widgets/EditableStatRow';
import { Button, Avatar } from 'react-native-elements';
import { StatRow } from '../widgets/StatRow';
import { House, User } from '../types/Entities';
import { toConstantWidth, toConstantHeight, toConstantFontSize } from '../utils/PercentageConversion';
import { Colors } from '../consts';
import { FontFactory } from '../consts/font';
import { UpdateHouseMutationVariables, LeaveHouseMutationVariables } from '../graphql/Types';
import { TouchableRect } from '../widgets/TouchableRect';
import { DOMAIN } from '../consts/endpoint';
import { ScrollView } from 'react-native-gesture-handler';
import { profile } from '../styles';

interface Props {
    house: House;
    users: User[];
    road: string;
    userID: string;
    isLoading: boolean;
    refetch: () => void;
    username: string;
    contentEditable: boolean;
    leaveHouse: (params: LeaveHouseMutationVariables) => void;
    updateHouse: (params: UpdateHouseMutationVariables) => void;
    navigation: { navigate: (route: string, params?: any) => void; }
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
                                                    if (house.spaces === 0 && Number(item.value) > 0) {
                                                        Alert.alert('Open Applications', 'Setting the number of spaces to more than 0 means that your house is open to new Flatmates so you will see the Chat screen change. Create a post in the homepage to advertise your space!', [{
                                                            text: 'OK', style: 'default', onPress: () => this.props.updateHouse({
                                                                shortID: house.shortID,
                                                                road: house.road,
                                                                spaces: Number(item.value),
                                                                billsPrice: house.billsPrice,
                                                                rentPrice: house.rentPrice
                                                            })
                                                        }, { text: 'Cancel', style: 'cancel' }]);
                                                    } else if (house.spaces !== 0 && Number(item.value) === 0) {
                                                        Alert.alert('Close Applications', 'Setting the number of spaces to 0 means that your house is closed to accepting new Flatmates so you will see the Chat screen change.', [{
                                                            text: 'OK', style: 'default', onPress: () => this.props.updateHouse({
                                                                shortID: house.shortID,
                                                                road: house.road,
                                                                spaces: Number(item.value),
                                                                billsPrice: house.billsPrice,
                                                                rentPrice: house.rentPrice
                                                            })
                                                        }, { text: 'Cancel', style: 'cancel' }]);
                                                    } else {
                                                        this.props.updateHouse({
                                                            shortID: house.shortID,
                                                            road: house.road,
                                                            spaces: Number(item.value),
                                                            billsPrice: house.billsPrice,
                                                            rentPrice: house.rentPrice
                                                        });
                                                    }
                                                }
                                                break;
                                        }
                                    })
                                }
                            />
                            {house.post &&
                                <>
                                    <View
                                        style={{
                                            alignSelf: 'stretch',
                                            height: 0.5,
                                            backgroundColor: Colors.grey
                                        }}
                                    />
                                    <StatRow
                                        items={house.post && [
                                            { label: 'Applications', value: house.applicationCount },
                                            { label: 'Post Views', value: house.post.viewCount }
                                        ]}
                                    />
                                </>}
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

                    </View>
                </>
            );
        }

        return (
            <>
                <ScrollView style={{ width: toConstantWidth(100), height: toConstantHeight(100) }} refreshControl={<RefreshControl refreshing={this.props.isLoading} onRefresh={() => this.props.refetch()} />}>
                    {this.props.isLoading && !Boolean(this.props.house) ? <View /> :
                        <>
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
                                {house.post &&
                                    <>
                                        <View
                                            style={{
                                                alignSelf: 'stretch',
                                                height: 0.5,
                                                backgroundColor: Colors.grey
                                            }}
                                        />
                                        <StatRow
                                            items={house.post && [
                                                { label: 'Applications', value: house.applicationCount },
                                                { label: 'Post Views', value: house.post.viewCount }
                                            ]}
                                        />
                                    </>}
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

                            {house.users.filter(user => user.id !== this.props.userID).length > 0 && (
                                <>
                                    <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 20, marginLeft: 4, marginTop: 20, color: Colors.brandPrimaryColor, marginBottom: 5 }}>Flatmates</Text>
                                    <View style={{
                                        shadowColor: Colors.grey,
                                        shadowRadius: 2,
                                        shadowOpacity: 0.5,
                                        shadowOffset: {
                                            width: 0,
                                            height: 2
                                        },
                                        elevation: 2
                                    }}>
                                        {house.users.filter(user => user.id !== this.props.userID).map((flatmate, index) => {

                                            return (
                                                <TouchableOpacity key={flatmate.id} onPress={() => this.props.navigation.navigate('UserProfile', { id: flatmate.id, data: flatmate })} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.offWhite, borderBottomWidth: 1, borderColor: Colors.grey, borderTopWidth: index === 0 ? 1 : 0 }}>
                                                    <Avatar containerStyle={{ width: 60, height: 60 }} avatarStyle={{ width: 60, height: 60 }} source={{ uri: flatmate.profilePicture }} />
                                                    <Text
                                                        style={{ ...FontFactory(), flex: 3, fontSize: 20, marginLeft: toConstantWidth(5) }}
                                                    >
                                                        {flatmate.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </>
                            )}

                            <TouchableRect
                                title={'Send Payment Reminder'}
                                backgroundColor={Colors.brandPrimaryColor}
                                buttonStyle={{ width: toConstantWidth(100) }}
                                wrapperStyle={{ borderRadius: 0, marginBottom: 1, marginTop: 20 }}
                                onPress={() => fetch(`${DOMAIN}/PaymentNotification`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ houseID: house.shortID }) })
                                    .then(() => alert('Notification sent!'))
                                    .catch(err => console.log(err))}
                            />
                            <TouchableRect
                                title={'Leave House'}
                                backgroundColor={Colors.brandPrimaryColor}
                                wrapperStyle={{ borderRadius: 0 }}
                                buttonStyle={{ width: toConstantWidth(100) }}
                                onPress={() =>
                                    Alert.alert('Hold Up', "What you're about to do is pretty serious, in order get back into this house you'll have to apply. Are you sure you want to leave?", [{ text: "I'm Sure", onPress: () => this.props.leaveHouse({ id: this.props.userID, houseID: this.props.house.shortID, name: this.props.username }) }, { text: "Oops No Thanks", onPress: () => console.log('heavens') }])
                                }
                            />
                        </>}
                </ScrollView>
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
        padding: 0,
        ...FontFactory({ weight: 'Bold' })
    },
    statisticsWrapper: {
        marginTop: 25,
    }
});
