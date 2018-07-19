import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Text, View, StyleSheet, AsyncStorage, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons'
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
import { HeaderButtonIOS } from '../widgets';
import { TextInput } from 'react-native-gesture-handler';
import { EditableStatRow } from '../widgets/EditableStatRow';
import { UPDATE_HOUSE_MUTATION } from '../graphql/mutations';
import { UpdateHouseMutationVariables, HouseDetailQuery, UpdateHouseMutation } from '../graphql/Types';
import { HOUSE_DETAILS_QUERY } from '../graphql/queries';
import { getCoordsFromAddress } from '../utils/localdash';

interface Props {
    house: HouseType;
    navigation: {
        navigate: (route: string) => void;
        setParams: any;
        state: {
            params: {
                contentEditable: boolean;
            }
        }
    };
    updateHouse: (params: UpdateHouseMutationVariables) => UpdateHouseMutation;
    loading: boolean;
}

interface State {
    shortID: number;
    road: string;
}

export class House extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: 'My House',
        headerRight:
            Platform.OS === 'ios' && (
                !!navigation.state &&
                    !!navigation.state.params &&
                    !!navigation.state.params.contentEditable ? (
                        <HeaderButtonIOS
                            text={'Done'}
                            onPress={() => navigation.setParams({ contentEditable: false })}
                        />
                    ) : (
                        <HeaderButtonIOS
                            text={'Edit'}
                            onPress={() => navigation.setParams({ contentEditable: true })}
                        />
                    )
            )
    });

    componentDidUpdate(prevProps: Props) {
        if (prevProps.loading && !this.props.loading) {
            this.setState({ road: this.props.house.road });
        }

        if (prevProps.navigation.state.params) {
            if (prevProps.navigation.state.params.contentEditable && !this.props.navigation.state.params.contentEditable) {
                if (prevProps.house.road !== this.state.road) {

                    getCoordsFromAddress(this.state.road)
                        .then(coords => {
                            this.props.updateHouse({
                                shortID: this.props.house.shortID,
                                road: this.state.road,
                                coords: coords as Array<number>,
                                spaces: this.props.house.spaces,
                                billsPrice: this.props.house.billsPrice,
                                rentPrice: this.props.house.rentPrice
                            });
                        })
                        .catch(err => console.log('problem with coords', err));
                }


            }
        }
    }

    render() {
        const { house } = this.props;

        if (this.props.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }

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
                        onPress={() =>
                            AsyncStorage.clear(() => this.props.navigation.navigate('Login'))
                        }
                    />
                </View>
            );
        }

        if (this.props.navigation.state.params && this.props.navigation.state.params.contentEditable) {
            return (
                <View style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}>
                    <View style={styles.headingWrapper}>
                        <TextInput style={styles.heading} defaultValue={house.road} onChangeText={(text) => this.setState({ road: text })} />
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
                                                    shortID: this.props.house.shortID,
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
                    {Platform.OS === 'android' &&
                        <FloatingAction
                            actions={[{
                                name: 'Edit',
                                icon: <Icon name={this.props.navigation.state &&
                                    this.props.navigation.state.params &&
                                    this.props.navigation.state.params.contentEditable ? 'md-checkmark' : 'md-create'} color={Colors.white} size={25} />
                            }]}
                            color={Colors.brandPrimaryColor}
                            overrideWithAction={true}
                            onPressItem={() => {
                                this.props.navigation.setParams({ contentEditable: !!this.props.navigation.state.params ? !this.props.navigation.state.params.contentEditable : true })
                            }}
                        />
                    }
                </View>
            );
        }

        return (
            <>
                <View style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}>
                    <View style={styles.headingWrapper}>
                        <Text style={styles.heading}>{house.road}</Text>
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
                {
                    Platform.OS === 'android' &&
                    <FloatingAction
                        actions={[{
                            name: 'Edit',
                            icon: <Icon name={this.props.navigation.state &&
                                this.props.navigation.state.params &&
                                this.props.navigation.state.params.contentEditable ? 'md-checkmark' : 'md-create'} color={Colors.white} size={25} />
                        }]}
                        color={Colors.brandPrimaryColor}
                        overrideWithAction={true}
                        onPressItem={() => {
                            this.props.navigation.setParams({ contentEditable: !!this.props.navigation.state.params ? !this.props.navigation.state.params.contentEditable : true })
                        }}
                    />
                }
            </>
        );
    }
}

const getHouseDetailsQuery = graphql(HOUSE_DETAILS_QUERY, {
    options: (ownProps: Props) => ({ variables: { shortID: ownProps.house.shortID }, fetchPolicy: 'network-only' }),

    // @ts-ignore
    props: ({ data: { loading, house } }) => ({
        loading,
        house
    })
})

const updateHouseMutation = graphql(UPDATE_HOUSE_MUTATION, {
    props: ({ mutate }) => ({
        updateHouse: (params: UpdateHouseMutationVariables) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { updateHouse } }) => {
                    const houseData: HouseDetailQuery = store.readQuery({
                        query: HOUSE_DETAILS_QUERY,
                        variables: { shortID: params.shortID }
                    });

                    let data = Object.assign(houseData.house, updateHouse);

                    store.writeQuery({
                        query: HOUSE_DETAILS_QUERY,
                        variables: { shortID: params.shortID },
                        data: { house: data }
                    });
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    updateHouse: {
                        __typename: 'House',
                        shortID: params.shortID,
                        road: params.road,
                        spaces: params.spaces,
                        billsPrice: params.billsPrice,
                        rentPrice: params.rentPrice
                    }
                }
            })
    })
})

const mapStateToProps = (state: ReduxState) => ({
    house: state.profile.house
});

export default compose(connect(mapStateToProps, {}), updateHouseMutation, getHouseDetailsQuery)(House)

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
