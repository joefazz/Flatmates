import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons'

import { base, profile } from '../styles';
import { FloatingActionButton, EditButton } from '../widgets';
import { ProfileComponent } from '../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../graphql/queries';

export class Profile extends React.Component {
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
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.props.loading) {
            // Remove null properties
            let trimmedData = {};
            Object.keys(newProps.User).map(property => {
                if (newProps.User[property] !== null) {
                    trimmedData[property] = newProps.User[property]
                }
            });
            console.log(trimmedData);
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

const bindActions = (dispatch) => {
    return {
        
    };
}

const userDetailsQuery = graphql(USER_DETAILS_QUERY, {
    options: (ownProps) => ({ variables: { facebookUserId: ownProps.login.get('fbUserId') }}),
    props: ({ data: { loading, User} }) => ({
        loading, User
    })
})

export default compose(
    connect(mapStateToProps, bindActions),
    userDetailsQuery,
)(Profile);


