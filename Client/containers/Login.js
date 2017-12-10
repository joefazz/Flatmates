import React from 'react';
import { View, TouchableOpacity, Text, Image, TouchableHighlight, TextInput, ActivityIndicator, Picker } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { Button, Avatar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { CheckBox } from '../widgets';
import { loginWithFacebook, getUserDataFacebook } from '../redux/Routines';
import { base, login, profile } from '../styles';
import { Colors, Strings } from '../consts';
import { CREATE_USER_MUTATION } from '../graphql/mutations';
import { _responseInfoCallback } from '../utils/FacebookCallback';
import Box from '../../Assets/Joes_sexy_box.png';
import facebook_template from '../../Assets/Man_Silhouette.png';

export let facebookPermissions;

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutCheck: false,
            friendsListCheck: false,
            activityCheck: false,
            likesCheck: false,
            isLookingForHouse: false,
            isLoggingIn: false,
            isLoggedIn: false,
            profile: {},
            minPrice: 300,
            maxPrice: 450,
            minEnabled: false,
            maxEnabled: false,
            genderEnabled: false,
            genderPreference: "No Preference"
        }
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.login.equals(this.props.login)) {
            if (this.state.isLoggingIn && newProps.login.get('loginStatus') === 'Ended') {
                this.setState({ isLoggingIn: false });
                if (newProps.login.get('isLoggedIn')) {
                    this.setState({ isLoggedIn: true, profile: newProps.login.get('profile') });
                }
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

        this.setState({ isLoggingIn: true }, () => this.props.loginWithFacebook());
    }

    render() {
        

        return (
            <Swiper 
                ref={swiper => this.homeSwiper = swiper}
                loop={false} 
                scrollEnabled={false} 
                horizontal={false} 
                dotStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.textHighlightColor}} 
                activeDotColor={Colors.textHighlightColor}>

                <View style={[ login.page, {justifyContent: 'space-around'} ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, { fontSize: 26 } ]}>Welcome to Flatmates</Text>
                        <Text style={[ login.headingText, { fontSize: 18 } ]}>Student living made simple</Text>
                    </View>
                    <View style={[ login.mainContent, { flex: 3 } ]}>
                        <Image style={{ width: 250, height: 250 }} source={Box} /> 
                    </View>
                    <View style={ login.pageFooter }>
                        <Button title={'New Account'} onPress={() => this.homeSwiper.scrollBy(1, true)} buttonStyle={ base.buttonStyle } />
                        <TouchableHighlight onPress={this.loginToFacebook}>
                            <Text style={{ color: '#1ebde7', textDecorationLine: 'underline', marginTop: 10 }}>Already Got an Account? Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={[ login.page, { justifyContent: 'space-around'} ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.headingText }>Are you looking for a house or looking for people to fill a room</Text>
                    </View>
                    <View style={[ login.mainContent, { alignItems: 'center', justifyContent: 'center' } ]}>
                        <Button title={'Looking for a House'} onPress={() => this.setState({ isLookingForHouse: true },() => this.homeSwiper.scrollBy(1, true)) } buttonStyle={[ base.buttonStyle, { marginBottom: 20 } ]} />
                        <Button title={'Looking for People'} onPress={() => this.setState({ isLookingForHouse: true },() => this.homeSwiper.scrollBy(1, true)) } buttonStyle={ base.buttonStyle } />
                    </View>
                </View>

                <View style={[ login.page ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.headingText }>{Strings.permissionsInfo}</Text>
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
                            leftIcon={{ type: 'font-awesome', name: this.state.isLoggedIn ? 'check' : 'facebook-square' }} 
                            onPress={this.state.isLoggedIn ? () => this.homeSwiper.scrollBy(1, true) : this.loginToFacebook}
                            title={this.state.isLoggingIn ? 'Logging In' : this.state.isLoggedIn ? 'Next' : 'Login with Facebook'} 
                            buttonStyle={[ base.buttonStyle, this.state.isLoggedIn ? { backgroundColor: Colors.brandSuccessColor } : { backgroundColor: Colors.facebookBlue }]} />
                    </View>         
                </View>       
                <View style={ login.page }>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.headingText }>Enter information for your profile</Text>
                    </View>
                    <View style={[ login.mainContent, { flex: 4, justifyContent: 'flex-start', alignItems: 'center' } ]}>
                        <Avatar 
                            xlarge={true} 
                            rounded={true} 
                            source={this.state.isLoggedIn ? {uri: this.state.profile.get('imageUrl')} : facebook_template } />
                        <Text style={{ fontSize: 24, marginTop: 5 }}>{this.state.isLoggedIn ? this.state.profile.get('name') : 'John Smith'}</Text>
                        <Text style={[ login.labelText, { marginTop: 20 } ]}>Bio</Text>
                        <TextInput placeholder={'Enter a short description of yourself'}
                            multiline={true}
                            numberOfLines={2}
                            style={{ color: Colors.textHighlightColor, width: 300, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey, }} />
                            {/* social links would be good here */}
                    </View>
                    <View style={ login.pageFooter }>
                        <Button
                            title={'Confirm'}
                            onPress={() => this.homeSwiper.scrollBy(1, true)}
                            buttonStyle={[ base.buttonStyle ]} />
                    </View>
                </View>

                {this.renderHouseOrProfileSetup()}

                <View style={[ login.page, {backgroundColor: Colors.brandSecondaryColor} ]}>
                    <View style={ login.headingWrapper }/>
                    <View style={ login.mainContent }>
                        <Text style={[ login.headingText, { fontSize: 28 } ]}>House ID</Text>
                    </View>
                </View>

            </Swiper>
        );
    }

    renderHouseOrProfileSetup() {
        if (this.state.isLookingForHouse) {
            return (
                <View style={ login.page } key={'Preferences'}>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.headingText }>Enter your preferences for a house</Text>
                    </View>
                    <View style={[ login.mainContent, {justifyContent: 'flex-start'} ]}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={ login.labelText }>Minimum Price (incl. bills)</Text>
                            <TouchableOpacity style={{ width: 200, borderBottomWidth: 1, borderColor: Colors.grey  }} onPress={() => this.setState({ minEnabled: true })}>
                                <Text style={{ color: Colors.textHighlightColor, fontSize: 18 }}>£{this.state.minPrice}</Text>
                            </TouchableOpacity>
                            {this.state.minEnabled ?
                            <Picker
                                enabled={this.state.minEnabled}
                                selectedValue={this.state.minPrice}
                                onValueChange={(itemValue, itemIndex) => this.setState({ minPrice: itemValue },() => setTimeout(() => this.setState({minEnabled: false}), 100))}
                                prompt={'Min Price'}>
                                <Picker.Item label={"£200"} value={200} />
                                <Picker.Item label={"£250"} value={250} />
                                <Picker.Item label={"£300"} value={300} />
                                <Picker.Item label={"£350"} value={350} />
                                <Picker.Item label={"£400"} value={400} />
                            </Picker> : <View/> }
                        </View>
                        
                        <View style={{ marginVertical: 20 }}>
                            <Text style={ login.labelText }>Maximum Price (incl. bills)</Text>
                            <TouchableOpacity style={{ width: 200,borderBottomWidth: 1, borderColor: Colors.grey  }} onPress={() => this.setState({ maxEnabled: true })}>
                                <Text style={{ color: Colors.textHighlightColor, width: 200, fontSize: 18 }}>£{this.state.maxPrice}</Text>
                            </TouchableOpacity>

                            {this.state.maxEnabled ?
                            <Picker
                                enabled={this.state.maxEnabled}
                                selectedValue={this.state.maxPrice}
                                onValueChange={(itemValue, itemIndex) => this.setState({ maxPrice: itemValue },() => setTimeout(() => this.setState({maxEnabled: false}), 100))}
                                prompt={'Max Price'}>
                                <Picker.Item label={"£350"} value={350} />
                                <Picker.Item label={"£400"} value={400} />
                                <Picker.Item label={"£450"} value={450} />
                                <Picker.Item label={"£500"} value={500} />
                                <Picker.Item label={"£550"} value={550} />
                            </Picker> : <View/> }
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={ login.labelText }>Gender Majority</Text>
                            <TouchableOpacity style={{ width: 200,borderBottomWidth: 1, borderColor: Colors.grey  }} onPress={() => this.setState({ genderEnabled: true })}>
                                <Text style={{ color: Colors.textHighlightColor, width: 200, fontSize: 18 }}>{this.state.genderPreference}</Text>
                            </TouchableOpacity>

                            {this.state.genderEnabled ?
                                <Picker
                                    enabled={this.state.genderEnabled}
                                    selectedValue={this.state.genderPreference}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ genderPreference: itemValue },() => setTimeout(() => this.setState({genderEnabled: false}), 100))}
                                    prompt={'Max Price'}>
                                    <Picker.Item label={"Male"} value={"Male"} />
                                    <Picker.Item label={"Female"} value={"Female"} />
                                    <Picker.Item label={"No Preference"} value={"No Preference"} />
                                </Picker> : <View/> }
                        </View>
                        {/* location would be good with with defaulting to current location */}
                    </View>
                    <View style={ login.pageFooter }>
                        <Button title={'Confirm'} buttonStyle={ base.buttonStyle } />
                    </View>
                </View>
            );
        } else {
            return [
                <View style={ login.page } key={'HouseID'}>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.headingText }>Enter your House ID or if you don't have one press 'Create House'</Text>
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
                            buttonStyle={[ base.buttonStyle, { marginBottom: 10 } ]} />
                        <TouchableHighlight>
                            <Text style={{ color: '#1ebde7', textDecorationLine: 'underline' }}>Create House</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                ,
                <View style={ login.page } key={'HouseDetails'}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, { fontSize: 20 } ]}>Enter your house details</Text>
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
                            buttonStyle={ base.buttonStyle} />
                    </View>
                </View>
            ];
        }
    }
}

const mapStateToProps = ( state ) => ({
    login: state.get('login')
});

const bindActions = (dispatch) => {
    return {
        loginWithFacebook: () => dispatch(loginWithFacebook()),
        getUserDataFacebook: () => dispatch(getUserDataFacebook())
    };
}

export default connect(mapStateToProps, bindActions)(Login);
