import * as React from 'react';
import { Platform } from 'react-native';
import { ChildProps, compose, graphql } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ApplicationListComponent } from '../../../components/Applications/ApplicationListComponent';
import { ReduxState, ProfileState } from '../../../types/ReduxTypes';
import { HOUSE_APPLICATIONS_QUERY, USER_APPLICATIONS_QUERY } from '../../../graphql/queries';
import {
    HouseApplicationsQuery,
    HouseApplicationsQueryVariables,
    UserApplicationsQuery,
    UserApplicationsQueryVariables
} from '../../../graphql/Types';
import { Application } from '../../../types/Entities';

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

export class ApplicationList extends React.Component<Props> {
    static navigationOptions = {
        title: 'Applications',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={
                    Platform.OS === 'ios'
                        ? focused
                            ? 'ios-notifications'
                            : 'ios-notifications-outline'
                        : 'md-notifications'
                }
                color={tintColor}
                size={32}
            />
        ),
        header: null
    };

    render() {
        return (
            <>
                <ApplicationListComponent
                    receivedApplications={this.props.house.applications}
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

const getReceivedApplications = graphql<
    InputProps,
    HouseApplicationsQuery,
    HouseApplicationsQueryVariables,
    ChildProps<HouseApplicationsQuery>
>(HOUSE_APPLICATIONS_QUERY, {
    options: (ownProps) => ({
        variables: {
            shortID: ownProps.profile.house.shortID
        },
        fetchPolicy: 'network-only'
    }),
    props: ({ data: { loading: receivedLoading, house, error: receivedError } }) => ({
        receivedLoading,
        house,
        receivedError
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
            id: ownProps.profile.id
        }
    }),
    props: ({ data: { loading: sentLoading, user, error: sentError } }) => ({
        sentLoading,
        user,
        sentError
    })
});

export default compose(connect(mapStateToProps), getReceivedApplications, getSentApplications)(
    ApplicationList
);
