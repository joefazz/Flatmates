import React from 'react';
import { Text, View, TouchableHighlight, Modal, TouchableOpacity } from 'react-native';
import { ChildProps, compose, graphql, Query } from 'react-apollo';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import { ApplicationListComponent } from '../../../components/Applications/ApplicationListComponent';
import { ReduxState, ProfileState } from '../../../types/ReduxTypes';
import { HOUSE_APPLICATIONS_QUERY, USER_APPLICATIONS_QUERY } from '../../../graphql/queries';
import {
    UserApplicationsQuery,
    UserApplicationsQueryVariables,
    AddApplicationsMutationVariables,
    AddApplicationsMutation
} from '../../../graphql/Types';
import * as RNIap from 'react-native-iap';
import { Application, House } from '../../../types/Entities';
import { toConstantWidth, toConstantHeight } from '../../../utils/PercentageConversion';
import { Colors } from '../../../consts';
import { FontFactory } from '../../../consts/font';
import { iapSKUs } from '../../../App';
import { ADD_APPLICATIONS_MUTATION } from '../../../graphql/mutations/User/AddApplications';

interface Props {
    house: {
        applications: Application[];
    };
    user: {
        id: string;
        applicationAllowance: number;
        applications: Application[];
    };
    addApplications: (params: AddApplicationsMutationVariables) => void;
    sentLoading: boolean;
    receivedLoading: boolean;
    receivedError: Error;
    sentError: Error;
    profile: ProfileState;
    refetch: () => void;
    navigation: { navigate: (route: string, params: { id: string }) => void };
}

interface State {
    isPurchaseModalAvaliable: boolean;
    productList: any[];
}

export class ApplicationList extends React.Component<Props, State> {
    state = { isPurchaseModalAvaliable: false, productList: [] };

    static navigationOptions = {
        title: 'Applications',
        header: null
    };

    componentDidMount() {
        RNIap.getProducts(iapSKUs).then(res => this.setState({ productList: res.sort((item, next) => Number(item.price) - Number(next.price)) }));
    }

    displayIAP = async () => {
        console.log(this.state.productList)
        this.setState({ isPurchaseModalAvaliable: true });
    }

    purchaseIAP = async (sku: string, amount: number) => {
        try {
            const purchase = await RNIap.buyProduct(sku);

            console.log(purchase);
            await RNIap.validateReceiptIos({ 'receipt-data': purchase.transactionReceipt }, true);

            const result = await this.props.addApplications({ id: this.props.user.id, newAllowance: this.props.user.applicationAllowance + amount });

            console.log(result);

            // await RNIap.consumePurchase(purchase.purchaseToken);
        } catch (err) {
            alert(err);
        }
    }

    renderPaymentModal = () => {
        return (
            <Modal visible={this.state.isPurchaseModalAvaliable} animationType={'slide'} transparent={true}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: isIphoneX() ? toConstantHeight(15) : toConstantHeight(7) }}>
                    <TouchableOpacity style={{ backgroundColor: Colors.grey, paddingVertical: 10, borderRadius: 13, marginBottom: 20, shadowOffset: { width: 1, height: 2 }, shadowColor: Colors.black, shadowOpacity: 0.5, shadowRadius: 1, elevation: 4 }} onPress={() => this.setState({ isPurchaseModalAvaliable: false })}>
                        <Text style={{ width: toConstantWidth(90), textAlign: 'center', color: Colors.brandErrorColor, ...FontFactory({ weight: 'Bold' }), fontSize: 16 }}>Cancel Purchase</Text>
                    </TouchableOpacity>
                    <View style={{ height: toConstantHeight(30), width: toConstantWidth(90), alignItems: 'center', backgroundColor: Colors.reallyLight, shadowOffset: { width: 0, height: 0 }, shadowColor: Colors.grey, shadowOpacity: 1, shadowRadius: 5, elevation: 4, borderRadius: 13 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 18, marginHorizontal: 30, textAlign: 'center', color: Colors.brandPrimaryColor }}>How many applications would you like to buy?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, borderBottomRightRadius: 13, borderBottomLeftRadius: 13, backgroundColor: Colors.brandSecondaryColor }}>
                            {this.state.productList.map((product, index) => (
                                <TouchableHighlight
                                    key={product.productId}
                                    underlayColor={Colors.brandTertiaryColor}
                                    onPress={() => this.purchaseIAP(product.productId, product.title.substring(0, product.title.indexOf(' ')))}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRightWidth: index !== this.state.productList.length - 1 ? 1 : 0,
                                        borderColor: Colors.white,
                                        borderBottomLeftRadius: index === 0 ? 13 : 0,
                                        borderBottomRightRadius: index === this.state.productList.length - 1 ? 13 : 0
                                    }}>
                                    <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 18, color: Colors.white, textAlign: 'center' }}>{product.title.substring(0, product.title.indexOf(' '))} more{"\n"}for{"\n"}{product.localizedPrice}</Text>
                                </TouchableHighlight>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        let showRecieved = Boolean(this.props.profile.house && this.props.profile.house.shortID);

        if (!showRecieved) {
            return (
                <>
                    {this.renderPaymentModal()}
                    <TouchableHighlight underlayColor={Colors.translucentDefinetelyNotAirbnbRed} onPress={() => this.displayIAP()} style={{ width: toConstantWidth(100), height: toConstantHeight(7), backgroundColor: Colors.brandErrorColor, alignItems: 'center', justifyContent: 'center' }}>
                        <>
                            <Text style={{ fontSize: 16, color: Colors.white, ...FontFactory() }}>{this.props.sentLoading ? 'Fetching Remaining Applications' : `${this.props.user.applicationAllowance === 1 ? 'Application' : 'Applications'} Remaining`}</Text>
                            <Text style={{ fontSize: 14, color: Colors.white, ...FontFactory({ weight: 'Bold' }) }}>Tap to buy more!</Text>
                        </>
                    </TouchableHighlight>
                    <ApplicationListComponent
                        sentApplications={!!this.props.user ? this.props.user.applications.filter(app => app.isActive) : []}
                        receivedApplications={[]}
                        isLoadingSent={this.props.sentLoading}
                        showReceived={showRecieved}
                        hasHouse={false}
                        navigation={this.props.navigation}
                        refetchSent={this.props.refetch}
                    />
                </>
            );
        } else {
            return (
                <Query
                    query={HOUSE_APPLICATIONS_QUERY}
                    variables={{ shortID: this.props.profile.house.shortID }}
                    fetchPolicy={'cache-and-network'}
                >
                    {({ loading, error, data: { house }, refetch }) => {
                        if (error) {
                            console.log(error);
                        }


                        return (
                            <>
                                {this.renderPaymentModal()}
                                <TouchableHighlight underlayColor={Colors.translucentDefinetelyNotAirbnbRed} onPress={() => this.displayIAP()} style={{ width: toConstantWidth(100), height: toConstantHeight(7), backgroundColor: Colors.brandErrorColor, alignItems: 'center', justifyContent: 'center' }}>
                                    <>
                                        <Text style={{ fontSize: 16, color: Colors.white, ...FontFactory() }}>{this.props.sentLoading ? 'Fetching Remaining Applications' : `${this.props.user.applicationAllowance} Applications Remaining`}</Text>
                                        <Text style={{ fontSize: 14, color: Colors.white, ...FontFactory({ weight: 'Bold' }) }}>Tap to buy more!</Text>
                                    </>
                                </TouchableHighlight>
                                <ApplicationListComponent
                                    receivedApplications={!!house ? house.applications.filter(app => app.isActive) : []}
                                    isLoadingReceived={loading}
                                    sentApplications={!!this.props.user ? this.props.user.applications.filter(app => app.isActive) : []}
                                    isLoadingSent={this.props.sentLoading}
                                    showReceived={!!house && house.applications.filter(app => app.isActive).length > 0}
                                    hasHouse={!!house}
                                    refetchReceived={refetch}
                                    refetchSent={this.props.refetch}
                                    navigation={this.props.navigation}
                                />
                            </>
                        );
                    }}
                </Query>
            );
        }
    }
}

interface InputProps {
    login: {
        id: string;
    };
    profile: {
        house: House;
    };
}

const mapStateToProps = (state: ReduxState) => ({
    login: state.login,
    profile: state.profile
});

const addMoreApplications = graphql(ADD_APPLICATIONS_MUTATION, {
    props: ({ mutate }) => ({
        addApplications: (params: AddApplicationsMutationVariables) => mutate({
            variables: { ...params },
            update: (store, { data: { addApplications } }: { data: AddApplicationsMutation }) => {
                const userData: UserApplicationsQuery = store.readQuery({
                    query: USER_APPLICATIONS_QUERY,
                    variables: { id: params.id }
                });

                const data = Object.assign(userData, addApplications);

                store.writeQuery({
                    query: USER_APPLICATIONS_QUERY,
                    variables: { id: params.id },
                    data
                });
            },
            optimisticResponse: {
                __typename: 'Mutation',
                addApplications: {
                    __typename: 'User',
                    id: params.id, // don't know id yet, but it doesn't matter
                    applicationAllowance: params.newAllowance
                }
            }
        })
    })
});

const getSentApplications = graphql<
    InputProps,
    UserApplicationsQuery,
    UserApplicationsQueryVariables,
    ChildProps<UserApplicationsQuery>
    >(USER_APPLICATIONS_QUERY, {
        options: (ownProps) => ({
            variables: {
                id: ownProps.login.id
            },
            fetchPolicy: 'cache-and-network'
        }),
        props: ({ data: { loading: sentLoading, user, error: sentError, refetch } }) => ({
            sentLoading,
            user,
            sentError,
            refetch
        })
    });

export default compose(connect(mapStateToProps), getSentApplications)(ApplicationList);
