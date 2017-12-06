import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableHighlight, TextInput } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-elements';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import * as Animatable from 'react-native-animatable';

import { CheckBox } from '../widgets';
import { loginWithFacebook } from '../redux/Routines';
import { base, login } from '../styles';
import { Colors, Strings } from '../consts';
import { CREATE_USER_MUTATION } from '../graphql/mutations';
import { _responseInfoCallback } from '../utils/FacebookCallback';
import Box from '../../Assets/Joes_sexy_box.png';

export let facebookPermissions;

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutCheck: false,
            friendsListCheck: false,
            activityCheck: false,
            likesCheck: false,
            flag: false,
        }
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.login.equals(this.props.login)) {
            if (newProps.login.get('loginStatus') === 'Ended' && newProps.login.get('fbAccessToken') !== '' && !this.state.flag) {
                this.getDataFromFacebook();
                this.setState({ flag: true })
            }
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

    getDataFromFacebook = () => {
        console.log('Getting facebook data');
        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: this.props.login.get('fbAccessToken'),
                parameters: {
                    fields: {
                        string: 'email,name,about,picture'
                    }
                }
            },
            (error, result) => {
                if (error) {
                    console.log('Error fetching data: ');
                    console.log(error);
                } else {
                    console.log('Success fetching data');
                    console.log(result);

                    this.props.createUser({ 
                        name: result.name, 
                        email: result.email, 
                        facebookUserId: result.id,
                        imageUrl: result.picture.data.url
                    });
                    this.props.navigation.navigate('Home');
                }
            }
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    render() {
        return (
            <Swiper loop={false} dotStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.textHighlightColor}} activeDotColor={Colors.textHighlightColor}>
                <View style={[ login.page, {justifyContent: 'space-around'} ]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={[ login.permissionsHeadingText, { fontSize: 26 } ]}>Welcome to Flatmates</Text>
                        <Text style={[ login.permissionsHeadingText, { fontSize: 18 }]}>Student living made simple</Text>
                    </View>
                    <Image style={{ width: 250, height: 250 }} source={Box} /> 
                </View>

                <View style={[ login.page, { justifyContent: 'space-around'} ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.permissionsHeadingText }>Are you looking for a house or looking for people to fill a room</Text>
                    </View>
                    <View style={[ login.mainContent, { alignItems: 'center', justifyContent: 'center' } ]}>
                        <Button title={'Looking for a House'} buttonStyle={[ base.buttonOutline, base.buttonStyle, { backgroundColor: Colors.brandSecondaryColor, marginBottom: 20 } ]} />
                        <Button title={'Looking for People'} buttonStyle={[ base.buttonOutline, base.buttonStyle, { backgroundColor: Colors.brandSecondaryColor } ]} />
                    </View>
                </View>

                <View style={[ login.page ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.permissionsHeadingText }>{Strings.permissionsInfo}</Text>
                    </View>
                    <View style={ login.mainContent }>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'About Me'} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ aboutCheck: !this.state.aboutCheck })}
                                isChecked={this.state.aboutCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Activities'} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ activityCheck: !this.state.activityCheck })}
                                isChecked={this.state.activityCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Friends List'} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ friendsListCheck: !this.state.friendsListCheck })}
                                isChecked={this.state.friendsListCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Liked Pages'} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ likesCheck: !this.state.likesCheck })}
                                onPress={this.onPress}
                                isChecked={this.state.likesCheck} />
                        </View>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button 
                            leftIcon={{ type: 'font-awesome', name: 'facebook-square' }} 
                            onPress={this.loginToFacebook}
                            title={'Login with Facebook'} 
                            buttonStyle={[ base.buttonOutline, base.buttonStyle, { backgroundColor: Colors.facebookBlue }]} />
                    </View>         
                </View>       
                <View style={ login.page }>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.permissionsHeadingText }>Enter your House ID or if you don't have one press 'Create House'</Text>
                    </View>
                    <View style={ login.mainContent }>
                        <TextInput placeholder={'1234'} 
                            keyboardType={'number-pad'} 
                            underlineColorAndroid={'transparent'}
                            maxLength={4}
                            style={{ color: Colors.textHighlightColor, width: 75, fontSize: 24, borderBottomWidth: 1, borderColor: Colors.grey, textAlign: 'center' }}/>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button
                            title={'Confirm'}
                            buttonStyle={[ base.buttonOutline, base.buttonStyle, { backgroundColor: Colors.brandSecondaryColor, marginBottom: 10 } ]} />
                        <TouchableHighlight>
                            <Text style={{ color: '#1ebde7', textDecorationLine: 'underline' }}>Create House</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={ login.page }>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.permissionsHeadingText, { fontSize: 20 } ]}>Enter your house details</Text>
                    </View>
                    <View style={[ login.mainContent, {justifyContent: 'flex-start'} ]}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={ login.labelText }>Road Name</Text>
                            <TextInput placeholder={'Fake Street'}
                                style={{ color: Colors.textHighlightColor, width: 200, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey }} />
                        </View>
                        
                        <View style={{ marginVertical: 20 }}>
                            <Text style={ login.labelText }>Rent Per Month</Text>
                            <TextInput placeholder={'£430.00'}
                                style={{ color: Colors.textHighlightColor, width: 200, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey }} />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={ login.labelText }>Bills Per Month</Text>
                            <TextInput placeholder={'£23.00'}
                                style={{ color: Colors.textHighlightColor, width: 200, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey }} />
                        </View>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button
                            title={'Confirm'}
                            buttonStyle={[ base.buttonOutline, base.buttonStyle, { backgroundColor: Colors.brandSecondaryColor } ]} />
                    </View>
                </View>
                <View style={[ login.page, {backgroundColor: Colors.brandSecondaryColor} ]}>
                    <View style={ login.headingWrapper }/>
                    <View style={ login.mainContent }>
                        <Text style={[ login.permissionsHeadingText, { fontSize: 28 } ]}>House ID</Text>
                    </View>
                </View>
            </Swiper>
        );
    }
}

const mapStateToProps = ( state ) => ({
    login: state.get('login')
});

const bindActions = (dispatch) => {
    return {
        loginWithFacebook: () => dispatch(loginWithFacebook())
    };
}

const createUserMutation = graphql(CREATE_USER_MUTATION, {
    props: ({ mutate }) => ({
        createUser: ({ name, facebookUserId, email, imageUrl }) =>
            mutate({
                variables: { name, facebookUserId, email, imageUrl },
            }),
    })
});

export default compose(
    createUserMutation,
    connect(mapStateToProps, bindActions),
)(Login)
