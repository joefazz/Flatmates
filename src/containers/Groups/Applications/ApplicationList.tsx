import React from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { ChildProps, compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { ApplicationListComponent } from '../../../components/Applications/ApplicationListComponent';
import { ReduxState, ProfileState } from '../../../types/ReduxTypes';
import { HOUSE_APPLICATIONS_QUERY, USER_APPLICATIONS_QUERY } from '../../../graphql/queries';
import {
    HouseApplicationsQuery,
    UserApplicationsQuery,
    UserApplicationsQueryVariables
} from '../../../graphql/Types';
import { Application } from '../../../types/Entities';
import client from '../../../Client';

interface Props {
    house: {
        applications: Application[];
    };
    user: {
        applications: Application[];
    };
    sentLoading: boolean;
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

    constructor(props) {
        super(props);

        this.state = {
            receivedApplications: [],
            receivedLoading: Boolean(this.props.profile.house && this.props.profile.house.shortID)
        };
    }

    componentDidMount() {
        if (this.props.profile.house && this.props.profile.house.shortID) {
            client
                .query<HouseApplicationsQuery>({
                    query: HOUSE_APPLICATIONS_QUERY,
                    variables: { shortID: this.props.profile.house.shortID },
                    fetchPolicy: 'network-only'
                })
                .then(({ data: { house: { applications } } }) =>
                    this.setState({ receivedApplications: applications, receivedLoading: false })
                )
                .catch((err) => console.log(err));
        }
    }

    render() {
        if (this.state.receivedLoading || this.props.sentLoading) {
            return <ActivityIndicator />;
        }

        return (
            <>
                <ApplicationListComponent
                    receivedApplications={this.state.receivedApplications}
                    sentApplications={this.props.user.applications}
                    showReceived={Boolean(
                        this.props.profile.house && this.props.profile.house.shortID
                    )}
                    isFetchingSent={this.props.sentLoading}
                    isFetchingReceived={this.state.receivedLoading}
                    navigation={this.props.navigation}
                />
            </>
        );
    }
}

interface InputProps {
    login: {
        id: string;
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
