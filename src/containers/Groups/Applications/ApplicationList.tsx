import * as React from 'react';
import { Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ApplicationListComponent } from '../../../components/Applications/ApplicationListComponent';
import { ApplicationState, ReduxState, ProfileState } from '../../../types/ReduxTypes';
import { getReceivedApplications } from '../../../redux/Routines';

interface Props {
    applications: ApplicationState;
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

    constructor(props) {
        super(props);

        if (props.profile.house) {
            props.getReceivedApplications(props.profile.house.shortID);
        }
    }

    render() {
        console.log(this.props.navigation);
        return (
            <>
                <StatusBar barStyle={'dark-content'} />
                <ApplicationListComponent
                    receivedApplications={this.props.applications.received}
                    sentApplications={this.props.applications.sent}
                    isFetchingSent={this.props.applications.isFetchingSentApplications}
                    isFetchingReceived={this.props.applications.isFetchingReceivedApplications}
                    navigation={this.props.navigation}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    applications: state.applications,
    profile: state.profile
});

const bindActions = (dispatch) => ({
    getReceivedApplications: (houseID: number) => dispatch(getReceivedApplications(houseID))
});

export default connect(mapStateToProps, bindActions)(ApplicationList);
