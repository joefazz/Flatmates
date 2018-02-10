import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Platform, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { ProfileComponent } from '../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../graphql/queries';
import { EditButton, FloatingActionButton } from '../widgets';

interface Props  {
    profile: any,
    loading: boolean,
    userDetailsQuery: () => void
};

interface State {
    isLoading: boolean,
    profile: object
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
        if (newProps.loading !== this.props.loading) {
            // Remove null properties
            let trimmedData = {};
            Object.keys(newProps.user).map(property => {
                if (newProps.user[property] !== null) {
                    trimmedData[property] = newProps.user[property];
                }
            });

            if (trimmedData.house) {
                const trimmedusers = trimmedData.house.users.filter(user => {
                    return (user.name !== this.state.profile.get('name'));
                });

                const tempHouse = {};
                Object.keys(trimmedData.house).map((property) => {
                    if (property === 'users') {
                        tempHouse[property] = trimmedusers;
                    } else {
                        tempHouse[property] = trimmedData.house[property];
                    }
                });

                trimmedData.house = tempHouse;
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
                <FloatingActionButton iconName={'edit'} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login'),
    profile: state.get('profile'),
});

const bindActions = () => {
    return {
        
    };
};

const userDetailsQuery = graphql(USER_DETAILS_QUERY, {
    options: (ownProps) => ({ variables: { facebookUserId: ownProps.login.get('fbUserId') }}),
    props: ({ data: { loading, user} }) => ({
        loading, user
    })
});

export default compose(
    connect(mapStateToProps, bindActions),
    userDetailsQuery,
)(Profile);
