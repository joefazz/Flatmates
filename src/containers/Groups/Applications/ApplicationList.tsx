import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
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

interface Props {
    house: {
        applications: Application[];
    };
    user: {
        applications: Application[];
    };
    sentLoading: boolean;
    receivedLoading: boolean;
    receivedError: Error;
    sentError: Error;
    profile: ProfileState;
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
        if (this.props.sentLoading || this.props.user === undefined) {
            return <ActivityIndicator />;
        }

        let showRecieved = Boolean(this.props.profile.house && this.props.profile.house.shortID);

        if (!showRecieved) {
            return (
                <ApplicationListComponent
                    sentApplications={this.props.user.applications}
                    isFetchingSent={this.props.sentLoading}
                    showReceived={showRecieved}
                    navigation={this.props.navigation}
                />
            );
        } else {
            return (
                <Query
                    query={HOUSE_APPLICATIONS_QUERY}
                    variables={{ shortID: this.props.profile.house.shortID }}
                    fetchPolicy={'network-only'}
                >
                    {({ loading, error, data: { house } }) => {
                        if (error) {
                            console.log(error);
                        }

                        if (loading) {
                            return <ActivityIndicator />;
                        }

                        return (
                            <ApplicationListComponent
                                receivedApplications={house.applications}
                                isFetchingReceived={loading}
                                sentApplications={this.props.user.applications}
                                isFetchingSent={this.props.sentLoading}
                                showReceived={showRecieved}
                                navigation={this.props.navigation}
                            />
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
        fetchPolicy: 'network-only'
    }),
    props: ({ data: { loading: sentLoading, user, error: sentError } }) => ({
        sentLoading,
        user,
        sentError
    })
});

export default compose(connect(mapStateToProps), getSentApplications)(ApplicationList);
