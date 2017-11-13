import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Facebook } from 'expo';
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-elements';
import { CheckBox } from '../widgets';

import { loginWithFacebook } from '../redux/Routines';
import { baseStyle, login } from '../styles';
import { Colors, Strings } from '../consts';

export let facebookPermissions;

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutCheck: false,
            friendsListCheck: false,
            activityCheck: false,
            likesCheck: false,
        }
    }

    loginToFacebook = () => {
        facebookPermissions = ['public_profile', 'email'];

        if (this.state.friendsListCheck) {
            facebookPermissions.push('user_friends')
        }

        if (this.state.aboutCheck) {
            facebookPermissions.push('user_about_me', 'user_birthday', 'user_religion_politics');
        } 

        if (this.state.activityCheck) {
            facebookPermissions.push('user_actions.books', 'user_actions.fitness', 'user_actions.music', 'user_actions.news')
        }

        if (this.state.likesCheck) {
            facebookPermissions.push('user_likes');
        }

        this.props.loginWithFacebook();
    }

    render() {
        return (
            <Swiper loop={false} dotStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.white}} activeDotColor={Colors.white}>
                <View style={{...login.page, backgroundColor: Colors.brandPrimaryColor}}>
                    <Text>Welcome to Flatmates</Text>
                </View>

                <View style={{...login.page, backgroundColor: Colors.brandPrimaryColor}}>
                    <View style={{...login.headingWrapper}}>
                        <Text style={{...login.permissionsHeadingText}}>{Strings.permissionsInfo}</Text>
                    </View>
                    <View style={{...login.mainContent}}>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'About Me'} 
                                color={Colors.white}
                                onIconPress={() => this.setState({ aboutCheck: !this.state.aboutCheck })}
                                isChecked={this.state.aboutCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Activities'} 
                                color={Colors.white}
                                onIconPress={() => this.setState({ activityCheck: !this.state.activityCheck })}
                                isChecked={this.state.activityCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Friends List'} 
                                color={Colors.white}
                                onIconPress={() => this.setState({ friendsListCheck: !this.state.friendsListCheck })}
                                isChecked={this.state.friendsListCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Liked Pages'} 
                                color={Colors.white}
                                onIconPress={() => this.setState({ likesCheck: !this.state.likesCheck })}
                                onPress={this.onPress}
                                isChecked={this.state.likesCheck} />
                        </View>
                    </View>
                    <View style={{...login.pageFooter}}>
                        <Button 
                            leftIcon={{ type: 'font-awesome', name: 'facebook-square' }} 
                            large={true} 
                            onPress={this.loginToFacebook}
                            title={'Login with Facebook'} 
                            buttonStyle={{...baseStyle.buttonOutline, backgroundColor: Colors.facebookBlue}} />
                    </View>                
                </View>
            </Swiper>
        );
    }
}

const mapStateToProps = (state) => ({

});

const bindActions = (dispatch) => {
    return {
        loginWithFacebook: () => dispatch(loginWithFacebook())
    };
}

export default connect(mapStateToProps, bindActions)(Login);