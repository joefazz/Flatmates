import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Facebook } from 'expo';
import Swiper from 'react-native-swiper';
import { CheckBox } from 'react-native-elements'

import { loginWithFacebook } from '../redux/routines';
import * as login from '../styles/Login';
import { Numbers, Config } from '../consts';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.facebookOptions = {
            permissions: Config.FACEBOOK_PERMISSIONS,
            behaviour: 'default' // TO CHANGE ON EJECT MAYBE?
        };
    }

    loginToFacebook = () => {
        this.props.loginWithFacebook();
    }

    changePermissions = (newValue) => {

    }

    render() {
        return (
            <Swiper>
                <View style={{...login.page}}>
                    <Text>Welcome to Flatmates</Text>
                </View>

                <View style={{...login.page}}>
                    <Text>What permissions would you like to provide, the more permissions
                        you allow, the more similar flatmates we can find for you:</Text>
                    <View style={{...login.permissionsWrapper}}>
                        <CheckBox title={'Religious and Political Values'} />
                    </View>
                </View>

                <View style={{...login.page}}>
                    <TouchableOpacity onPress={this.loginToFacebook}>
                        <Text>
                            Login with Facebook
                        </Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
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