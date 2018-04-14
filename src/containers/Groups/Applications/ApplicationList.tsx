import * as React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ApplicationListComponent } from '../../../components/Applications/ApplicationListComponent';
import { Application } from '../../../types/Entities';
import { ApplicationState, ReduxState, ProfileState } from '../../../types/ReduxTypes';
import { getReceivedApplications } from '../../../redux/Routines';

interface Props {
    applications: ApplicationState;
    profile: ProfileState;
}

interface State {
    applications: Array<Application>;
}

export class ApplicationList extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Applications',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={
                    Platform.OS === 'ios'
                        ? focused
                            ? 'ios-filing'
                            : 'ios-filing-outline'
                        : 'md-filing'
                }
                color={tintColor}
                size={32}
            />
        )
    };

    constructor(props) {
        super(props);

        if (props.profile.house) {
            props.getReceivedApplications(props.profile.house.shortId);
        }
    }

    render() {
        return (
            <ApplicationListComponent
                applications={[{ title: 'Hello', data: this.props.applications }]}
            />
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    applications: state.application,
    profile: state.profile
});

const bindActions = (dispatch) => ({
    getReceivedApplications: (houseID: number) => dispatch(getReceivedApplications(houseID))
});

export default connect(mapStateToProps, bindActions)(ApplicationList);
