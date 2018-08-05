import React from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { Text, View, Platform, ActivityIndicator } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import { connect } from 'react-redux';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../consts';
import { ReduxState } from '../types/ReduxTypes';
import { House as HouseType } from '../types/Entities';
import { HeaderButtonIOS, PostCard } from '../widgets';
import { UPDATE_HOUSE_MUTATION } from '../graphql/mutations';
import { UpdateHouseMutationVariables, HouseDetailQuery, UpdateHouseMutation, LeaveHouseMutationVariables } from '../graphql/Types';
import { HOUSE_DETAILS_QUERY, POST_LIST_QUERY } from '../graphql/queries';
import { getCoordsFromAddress } from '../utils/localdash';
import { HouseComponent } from '../components/HouseComponent';
import { FontFactory } from '../consts/font';
import { toConstantFontSize } from '../utils/PercentageConversion';
import { leaveHouse } from '../redux/Routines';

interface Props {
    house: HouseType;
    userID: string;
    username: string;
    navigation: {
        navigate: (route: string, params: any) => void;
        setParams: any;
        state: {
            params: {
                contentEditable: boolean;
            }
        }
    };
    updateHouse: (params: UpdateHouseMutationVariables) => UpdateHouseMutation;
    leaveHouse: (params: LeaveHouseMutationVariables) => void;
    loading: boolean;
}

interface State {
    road: string;
    spaces: number;
    centerCoordinate: number[];
    billsPrice: number;
    rentPrice: number;
    houseViewerInfo?: HouseType;
}

export class House extends React.Component<Props, State> {
    state = { road: '', spaces: 0, billsPrice: 0, rentPrice: 0, centerCoordinate: [-0.9418, 51.4414], houseViewerInfo: null };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params && navigation.state.params.userHasHouse ? 'My House' : 'House Finder',
        headerRight:
            Platform.OS === 'ios' && (
                !!navigation.state &&
                    !!navigation.state.params &&
                    navigation.state.params.userHasHouse ? (!!navigation.state.params.contentEditable ? (
                        <HeaderButtonIOS
                            text={'Done'}
                            onPress={() => navigation.setParams({ contentEditable: false })}
                        />
                    ) : (
                            <HeaderButtonIOS
                                text={'Edit'}
                                onPress={() => navigation.setParams({ contentEditable: true })}
                            />
                        ))
                    : <View />
            )
    });

    componentDidMount() {
        this.props.navigation.setParams({ userHasHouse: Boolean(this.props.house) });
    }

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

    leaveHouse = (params: LeaveHouseMutationVariables) => {
        this.props.leaveHouse(params);
        this.props.navigation.setParams({ userHasHouse: false });
    }

    renderAnnotation(post) {
        const { createdBy: house } = post;
        return (
            <Mapbox.PointAnnotation key={String(house.shortID)} id={String(house.shortID)} title={`${house.spaces === 1 ? 'A space' : `${house.spaces} spaces`} on ${house.road}`} coordinate={house.coords} onSelected={(feature) => this.setState({ centerCoordinate: feature.geometry.coordinates, houseViewerInfo: post })}>

                <Mapbox.Callout title={`${house.spaces === 1 ? 'A space' : `${house.spaces} spaces`} on ${house.road}`} />
            </Mapbox.PointAnnotation>
        );
    }

    setRoad = (road: string, spaces: number, billsPrice: number, rentPrice: number) => {
        this.setState({ road, spaces, billsPrice, rentPrice })
    }

    render() {
        const { house } = this.props;

        if (!house) {
            return (
                <Query query={POST_LIST_QUERY} variables={{ take: 100 }} fetchPolicy={'cache-and-network'}>
                    {({ data }, loading, error) => {

                        return (
                            <>
                                <View style={{ flex: 1, backgroundColor: Colors.offWhite, borderBottomColor: Colors.grey, borderBottomWidth: 1, justifyContent: 'center' }}>
                                    {!!this.state.houseViewerInfo ? (
                                        <PostCard
                                            direction={'horizontal'}
                                            onPress={() => this.props.navigation.navigate('PostDetail', { data: this.state.houseViewerInfo, isReadOnly: false })}
                                            createdDate={this.state.houseViewerInfo.createdAt}
                                            price={this.state.houseViewerInfo.createdBy.billsPrice + this.state.houseViewerInfo.createdBy.rentPrice}
                                            spaces={this.state.houseViewerInfo.createdBy.spaces}
                                            title={this.state.houseViewerInfo.createdBy.road}
                                            images={this.state.houseViewerInfo.createdBy.houseImages} />
                                    ) : <Text style={{ ...FontFactory({ weight: 'Bold' }), alignSelf: 'center', fontSize: toConstantFontSize(2.5), color: Colors.brandPrimaryColor }}>Select a pin to see info on that road!</Text>}
                                </View>
                                <Mapbox.MapView
                                    style={{ flex: 6 }}
                                    zoomLevel={12}
                                    styleURL={Mapbox.StyleURL.Street}
                                    logoEnabled={false}
                                    centerCoordinate={this.state.centerCoordinate}
                                >
                                    {!loading && data.allPosts && data.allPosts.map(post => this.renderAnnotation(post))}
                                </Mapbox.MapView>
                            </>
                        );
                    }}
                </Query>
            );
        }

        return (
            <Query
                query={HOUSE_DETAILS_QUERY}
                variables={{ shortID: house.shortID }}
                fetchPolicy={'cache-and-network'}
            >
                {({ data: { house: houseData }, loading, error }) => {
                    if (loading) {
                        return <ActivityIndicator />;
                    }

                    if (error) {
                        return <Text>{error.message}</Text>;
                    }

                    console.log(houseData);
                    return (
                        <>
                            <HouseComponent
                                updateHouse={this.props.updateHouse}
                                house={houseData}
                                userID={this.props.userID}
                                username={this.props.username}
                                users={houseData.users}
                                leaveHouse={this.leaveHouse}
                                road={this.state.road === '' ? houseData.road : this.state.road}
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
});

const mapStateToProps = (state: ReduxState) => ({
    house: state.profile.house,
    userID: state.login.id,
    username: state.profile.name
});

const bindActions = (dispatch) => ({
    leaveHouse: (params: LeaveHouseMutationVariables) => dispatch(leaveHouse(params))
});

export default compose(connect(mapStateToProps, bindActions), updateHouseMutation)(House)
