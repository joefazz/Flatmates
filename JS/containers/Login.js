import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Facebook } from 'expo';
import { loginWithFacebook } from '../redux/routines';

import { Numbers, Config } from '../consts';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.facebookOptions = {
            permissions: Config.FACEBOOK_PERMISSIONS,
            behaviour: 'default' // TO CHANGE ON EJECT MAYBE?
        };
    }

    componentDidMount() {
        this.props.loginWithFacebook();
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Login test</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login').toJS()
});

const bindAction = (dispatch) => {
    return {
        loginWithFacebook: () => dispatch(loginWithFacebook())
    };
}

export default connect(mapStateToProps, bindAction)(Login);