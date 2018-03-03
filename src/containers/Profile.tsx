import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Platform, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
    UserDetailQuery,
    UserDetailQueryVariables
} from '../graphql/Types';

import { ProfileComponent } from '../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../graphql/queries';
import { EditButton } from '../widgets';

interface Props  {
    profile: { get?: (key: string) => object, merge?: (newState: object) => object }
    login: any,
    loading: boolean,
    userDetailsQuery: () => void
};

interface State {
    isLoading: boolean,
    profile: { get?: (key: string) => object, merge?: (newState: object) => object }
}

export class Profile extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerRight: Platform.OS === 'ios' ? <EditButton onPress={() => navigation.navigate('EditProfile')} /> : null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-person' : 'ios-person-outline' : 'md-person'} color={tintColor} size={32} />
        )
    })

    constructor(props) {
        super(props);

        this.state = {
            profile: props.profile,
            isLoading: props.loading,
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.props.loading && newProps.user) {
            // Remove null properties
            const trimmedData: { house?: { users: Array<any> } } = {};

            Object.keys(newProps.user).map((property) => {
                if (newProps.user[property] !== null) {
                    trimmedData[property] = newProps.user[property];
                }
            });

            if (trimmedData.house) {
                const trimmedusers = trimmedData.house.users.filter((user) => {
                    return (user.name !== this.state.profile.get('name'));
                });

                const tempHouse: { users?: Array<any> } = {};
                Object.keys(trimmedData.house).map((property) => {
                    tempHouse[property] = property === 'users' ? trimmedusers : trimmedData.house[property];
                });

                trimmedData.house = tempHouse as { users: Array<any> };
            }

            this.setState({
                isLoading: newProps.loading,
                profile: this.state.profile.merge(trimmedData)
            });
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={'light-content'} />
                <ProfileComponent {...this.state} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login'),
    profile: state.get('profile'),
});

const bindActions = () => {
    return {};
};

const userDetailsQuery = graphql(USER_DETAILS_QUERY, {
    options: (ownProps: Props) => ({ variables: { facebookUserId: ownProps.login.get('fbUserId') }}),

    // @ts-ignore
    props: ({ data: { loading, user } }) => ({
        loading, user
    })
});

export default compose(
    connect(mapStateToProps, bindActions),
    userDetailsQuery,
)(Profile);
