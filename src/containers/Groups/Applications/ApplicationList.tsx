import React from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import { ChildProps, compose, graphql, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { ApplicationListComponent } from '../../../components/Applications/ApplicationListComponent';
import { ReduxState, ProfileState } from '../../../types/ReduxTypes';
import { HOUSE_APPLICATIONS_QUERY, USER_APPLICATIONS_QUERY } from '../../../graphql/queries';
import {
    HouseApplicationsQuery,
    UserApplicationsQuery,
    UserApplicationsQueryVariables,
    HouseApplicationsQueryVariables
} from '../../../graphql/Types';
import { Application, House } from '../../../types/Entities';
import client from '../../../Client';
import { toConstantWidth, toConstantHeight } from '../../../utils/PercentageConversion';
import { Colors } from '../../../consts';
import { FontFactory } from '../../../consts/font';

interface Props {
    house: {
        applications: Application[];
    };
    user: {
        applicationAllowance: number;
        applications: Application[];
    };
    sentLoading: boolean;
    receivedLoading: boolean;
    receivedError: Error;
    sentError: Error;
    profile: ProfileState;
    refetch: () => void;
    navigation: { navigate: (route: string, params: { id: string }) => void };
}

interface State {
    receivedApplications: Application[];
    receivedLoading: boolean;
}

export class ApplicationList extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Applications',
        header: null
    };

    render() {

        let showRecieved = Boolean(this.props.profile.house && this.props.profile.house.shortID);

        if (!showRecieved) {
            return (
                <>
                    <View style={{ width: toConstantWidth(100), height: toConstantHeight(7), backgroundColor: Colors.brandErrorColor, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: Colors.white, ...FontFactory() }}>{this.props.sentLoading ? 'Fetching Remaining Applications' : `${this.props.user.applicationAllowance} Applications Remaining`}</Text>
                        <Text style={{ fontSize: 14, color: Colors.white, ...FontFactory({ weight: 'Bold' }) }}>Tap to buy more!</Text>
                    </View>
                    <ApplicationListComponent
                        sentApplications={!!this.props.user ? this.props.user.applications : []}
                        isLoadingSent={this.props.sentLoading}
                        showReceived={showRecieved}
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
                    fetchPolicy={'network-only'}
                >
                    {({ loading, error, data: { house }, refetch }) => {
                        if (error) {
                            console.log(error);
                        }


                        return (
                            <>
                                <View style={{ width: toConstantWidth(100), height: toConstantHeight(7), backgroundColor: Colors.brandErrorColor, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: Colors.white, ...FontFactory() }}>{this.props.sentLoading ? 'Fetching Remaining Applications' : `${this.props.user.applicationAllowance} Applications Remaining`}</Text>
                                    <Text style={{ fontSize: 14, color: Colors.white, ...FontFactory({ weight: 'Bold' }) }}>Tap to buy more!</Text>
                                </View>
                                <ApplicationListComponent
                                    receivedApplications={house.applications}
                                    isLoadingReceived={loading}
                                    sentApplications={!!this.props.user ? this.props.user.applications : []}
                                    isLoadingSent={this.props.sentLoading}
                                    showReceived={showRecieved}
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

export default compose(connect(mapStateToProps), getSentApplications)(ApplicationList);
