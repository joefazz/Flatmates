import React from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { Text, View, AsyncStorage, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../consts';
import { Button } from 'react-native-elements';
import { ReduxState } from '../types/ReduxTypes';
import { House as HouseType } from '../types/Entities';
import { HeaderButtonIOS } from '../widgets';
import { UPDATE_HOUSE_MUTATION } from '../graphql/mutations';
import { UpdateHouseMutationVariables, HouseDetailQuery, UpdateHouseMutation } from '../graphql/Types';
import { HOUSE_DETAILS_QUERY } from '../graphql/queries';
import { getCoordsFromAddress } from '../utils/localdash';
import { HouseComponent } from '../components/HouseComponent';

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
    road: string;
    spaces: number;
    billsPrice: number;
    rentPrice: number;
}

export class House extends React.Component<Props, State> {
    state = { road: '', spaces: 0, billsPrice: 0, rentPrice: 0 };

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
        if (prevProps.navigation.state.params) {
            if (prevProps.navigation.state.params.contentEditable && !this.props.navigation.state.params.contentEditable) {
                if (this.state.road !== '') {
                    getCoordsFromAddress(this.state.road)
                        .then(coords => {
                            this.props.updateHouse({
                                shortID: this.props.house.shortID,
                                road: this.state.road,
                                coords: coords as Array<number>,
                                spaces: this.state.spaces,
                                billsPrice: this.state.billsPrice,
                                rentPrice: this.state.rentPrice
                            });
                        }).then(() => this.setState({ road: '' }))
                        .catch(err => console.log('problem with coords', err));
                }


            }
        }
    }

    setRoad = (road: string, spaces: number, billsPrice: number, rentPrice: number) => {
        this.setState({ road, spaces, billsPrice, rentPrice })
    }

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

        return (
            <Query
                query={HOUSE_DETAILS_QUERY}
                variables={{ shortID: house.shortID }}
                fetchPolicy={'cache-and-network'}
            >
                {({ data: { house }, loading, error }) => {
                    if (loading && !house) {
                        return <ActivityIndicator />;
                    }

                    if (error) {
                        return <Text>{error.message}</Text>
                    }

                    return (
                        <>
                            <HouseComponent
                                updateHouse={this.props.updateHouse}
                                house={house}
                                road={this.state.road === '' ? house.road : this.state.road}
                                setRoad={this.setRoad}
                                navigation={this.props.navigation}
                                contentEditable={this.props.navigation.state.params && this.props.navigation.state.params.contentEditable} />
                            {
                                Platform.OS === 'android' &&
                                <FloatingAction
                                    actions={[{
                                        name: 'Edit',
                                        icon: <Icon name={
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
                    )
                }}
            </Query>
        )
    }
}

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

export default compose(connect(mapStateToProps, {}), updateHouseMutation)(House)
