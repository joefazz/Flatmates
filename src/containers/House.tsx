import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Platform } from 'react-native';
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
import { TextInput } from '../../node_modules/react-native-gesture-handler';
import { EditableStatRow } from '../widgets/EditableStatRow';

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
}

interface State {
    road: string;
    billsPrice: number;
    rentPrice: number;
    spaces: number;
    study
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
                                { label: 'Free Rooms', value: house.spaces }
                            ]}
                            onEndEditing={(items: Array<{ value: string; label: string }>) =>
                                items.map((item) => {
                                    switch (item.label) {
                                        case 'Free Rooms':
                                            this.setState({ spaces: Number(item.value) });
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
                                { label: 'Applications', value: 23 },
                                { label: 'Post Views', value: 67 }
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
                                { label: 'Rent', value: '£' + String(house.rentPrice) },
                                { label: 'Bills', value: '£' + String(house.billsPrice) }
                            ]}
                            onEndEditing={(items: Array<{ value: string; label: string }>) =>
                                items.map((item) => {
                                    switch (item.label) {
                                        case 'Rent':
                                            this.setState({ rentPrice: Number(item.value) });
                                            break;
                                        case 'Bills':
                                            this.setState({ billsPrice: Number(item.value) });
                                            break;
                                    }
                                })
                            }
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
}

const mapStateToProps = (state: ReduxState) => ({
    house: state.profile.house
});

// @ts-ignore
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
