import * as React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ApplicationListComponent } from '../../../components/Applications/ApplicationListComponent';
import { Application } from '../../../types/Entities';
import { ApplicationState } from '../../../types/ReduxTypes';

interface Props {
    applications: ApplicationState;
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
                        ? focused ? 'ios-filing' : 'ios-filing-outline'
                        : 'md-filing'
                }
                color={tintColor}
                size={32}
            />
        )
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ApplicationListComponent
                applications={[{ title: 'Hello', data: this.props.applications }]}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    applications: state.applications
});

const bindActions = () => {
    return {};
};

export default connect(mapStateToProps, bindActions)(ApplicationList);
