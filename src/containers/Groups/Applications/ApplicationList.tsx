import React from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Modal,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
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
import { Application, House } from '../../../types/Entities';
import { toConstantWidth, toConstantHeight } from '../../../utils/PercentageConversion';
import { Colors } from '../../../consts';
import { FontFactory } from '../../../consts/font';
import { ErrorScreen } from '../../../widgets/ErrorScreen';
import { ErrorToast } from '../../../widgets/ErrorToast';

interface Props {
    house: {
        applications: Application[];
    };
    user: {
        id: string;
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
    isPurchasingModalAvaliable: boolean;
    productList: any[];
    purchasingStatus: string;
}

export class ApplicationList extends React.Component<Props, State> {
    state = {
        isPurchaseModalAvaliable: false,
        productList: [],
        isPurchasingModalAvaliable: false,
        purchasingStatus: ''
    };

    static navigationOptions = {
        title: 'Applications',
        header: null
    };

    render() {
        let showRecieved = Boolean(this.props.profile.house && this.props.profile.house.shortID);

        if (!showRecieved) {
            if (this.props.sentError && !Boolean(this.props.user)) {
                return (
                    <ErrorScreen
                        message={this.props.sentError.message}
                        onPress={this.props.refetch}
                    />
                );
            }

            return (
                <>
                    {this.props.sentError && (
                        <ErrorToast
                            message={this.props.sentError.message}
                            onPress={this.props.refetch}
                        />
                    )}
                    <ApplicationListComponent
                        sentApplications={
                            !!this.props.user
                                ? this.props.user.applications.filter((app) => app.isActive)
                                : []
                        }
                        receivedApplications={[]}
                        inactiveApplications={
                            !!this.props.user
                                ? this.props.user.applications.filter((app) => !app.isActive)
                                : []
                        }
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
                        var inactiveApplications = [];
                        if (!!this.props.user) {
                            if (
                                this.props.user.applications.filter((app) => !app.isActive)
                                    .length === 0 &&
                                !loading
                            ) {
                                inactiveApplications = house.applications.filter(
                                    (app) => !app.isActive
                                );
                            } else if (!loading) {
                                inactiveApplications = this.props.user.applications
                                    .filter((app) => !app.isActive)
                                    .concat(house.applications.filter((app) => !app.isActive));
                            }
                        }

                        function refetchAll() {
                            this.props.refetch();
                            refetch();
                        }

                        if (error || this.props.sentError) {
                            return (
                                <ErrorScreen
                                    message={error.message || this.props.sentError.message}
                                    onPress={refetchAll}
                                />
                            );
                        }

                        return (
                            <>
                                {error ||
                                    (this.props.sentError && (
                                        <ErrorToast
                                            message={error.message || this.props.sentError.message}
                                            onPress={refetchAll}
                                        />
                                    ))}
                                <ApplicationListComponent
                                    receivedApplications={
                                        !!house
                                            ? house.applications.filter((app) => app.isActive)
                                            : []
                                    }
                                    isLoadingReceived={loading}
                                    sentApplications={
                                        !!this.props.user
                                            ? this.props.user.applications.filter(
                                                  (app) => app.isActive
                                              )
                                            : []
                                    }
                                    inactiveApplications={inactiveApplications}
                                    isLoadingSent={this.props.sentLoading}
                                    showReceived={true}
                                    hasHouse={!!house}
                                    houseID={!!house && house.shortID}
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

export default compose(
    connect(mapStateToProps),
    getSentApplications
)(ApplicationList);
