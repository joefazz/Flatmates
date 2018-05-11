import React from 'react';
import { Platform } from 'react-native';
import { ChildProps, compose, graphql } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';
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
    receivedLoading: boolean;
    profile: ProfileState;
    navigation: { navigate: (route: string, params: { id: string }) => void };
}

interface State {
    receivedApplications: Application[];
}

export class ApplicationList extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Applications',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            receivedApplications: []
        };
    }

    componentDidMount() {
        if (this.props.profile.house) {
            client
                .query<HouseApplicationsQuery>({
                    query: HOUSE_APPLICATIONS_QUERY,
                    variables: { shortID: this.props.profile.house.shortID }
                })
                .then(({ data: { house: { applications } } }) =>
                    this.setState({ receivedApplications: applications })
                );
        }
    }

    render() {
        return (
            <>
                <ApplicationListComponent
                    receivedApplications={this.state.receivedApplications}
                    sentApplications={this.props.user.applications}
                    isFetchingSent={this.props.sentLoading}
                    isFetchingReceived={this.props.receivedLoading}
                    navigation={this.props.navigation}
                />
            </>
        );
    }
}

interface InputProps {
    profile: {
        house: {
            shortID: number;
        };
        id;
    };
}

const mapStateToProps = (state: ReduxState) => ({
    profile: state.profile
});

// const getReceivedApplications = graphql<
//     InputProps,
//     HouseApplicationsQuery,
//     HouseApplicationsQueryVariables,
//     ChildProps<HouseApplicationsQuery>
// >(HOUSE_APPLICATIONS_QUERY, {
//     options: (ownProps) => ({
//         variables: {
//             shortID: ownProps.profile.house.shortID
//         },
//         fetchPolicy: 'network-only'
//     }),
//     props: ({ data: { loading: receivedLoading, house, error: receivedError } }) => ({
//         receivedLoading,
//         house,
//         receivedError
//     })
// });

const getSentApplications = graphql<
    InputProps,
    UserApplicationsQuery,
    UserApplicationsQueryVariables,
    ChildProps<UserApplicationsQuery>
>(USER_APPLICATIONS_QUERY, {
    options: (ownProps) => ({
        variables: {
            id: ownProps.profile.id
        }
    }),
    props: ({ data: { loading: sentLoading, user, error: sentError } }) => ({
        sentLoading,
        user,
        sentError
    })
});

export default compose(connect(mapStateToProps), getSentApplications)(ApplicationList);
