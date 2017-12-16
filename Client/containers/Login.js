import React from 'react';
import { View, TouchableOpacity, Text, Image, TouchableHighlight, TextInput, ActivityIndicator, Picker, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Swiper from 'react-native-swiper';
import { Button, Avatar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { CheckBox } from '../widgets';
import { loginWithFacebook, getUserDataFacebook } from '../redux/Routines';
import { base, login, profile } from '../styles';
import { Colors, Strings, Metrics } from '../consts';
import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION, UPDATE_USER_CREATE_HOUSE_MUTATION } from '../graphql/mutations';
import Box from '../../Assets/Joes_sexy_box.png';
import OpenBox from '../../Assets/Designs/Flatmates_Open_Box.png';
import facebook_template from '../../Assets/Man_Silhouette.png';
import { ConvertBirthdayToAge } from '../utils/BirthdayToAge';

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
            bio: '',
            course: '',
            minPrice: 300,
            maxPrice: 450,
            minEnabled: false,
            maxEnabled: false,
            genderEnabled: false,
            genderPreference: 'No Preference',
            
            shortId: 1,
            road: 'Road Street',
            rentPrice: 200,
            billsPrice: 30,
            spaces: 3,
        }
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.login.equals(this.props.login)) {
            if (this.state.isLoggingIn && newProps.login.get('loginStatus') === 'Ended') {
                this.setState({ isLoggingIn: false });
                if (newProps.login.get('isLoggedIn')) {
                    this.setState({ isLoggedIn: true, profile: newProps.login.get('profile'), userId: newProps.login.get('id') });
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

    completeUserSetup = () => {
        this.props.updateUser(
            this.state.userId, 
            this.state.bio, 
            this.state.course, 
            this.state.minPrice, 
            this.state.maxPrice, 
            this.state.genderPreference
        );

        this.homeSwiper.scrollBy(1, true);
    }

    completeNewHouseSetup = () => {
        // for short id what should happen is should query all houses for their ids and then generate a number that isn't in the array
        this.setState({ shortId: 1234 })
        this.props.updateUserCreateHouse(
            this.state.userId,
            this.state.bio,
            this.state.course,
            this.state.shortId,
            this.state.road,
            Math.round(this.state.rentPrice),
            Math.round(this.state.billsPrice),
            parseInt(this.state.spaces)
        );

        this.homeSwiper.scrollBy(1, true);
    }

    completeJoiningHouseSetup = () => {
        
    }

    render() {
        return (
            <Swiper 
                ref={swiper => this.homeSwiper = swiper}
                loop={false} 
                scrollEnabled={false} 
                dotStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.textHighlightColor}} 
                activeDotColor={Colors.textHighlightColor}>

                <View style={[ login.page, {justifyContent: 'space-around'} ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, { fontSize: 26 } ]}>Welcome to Flatmates</Text>
                        <Text style={[ login.headingText, { fontSize: 18, fontWeight: '300' } ]}>Student living made simple</Text>
                    </View>
                    <View style={[ login.mainContent, { flex: 3 } ]}>
                        <Image style={{ width: 250, height: 250 }} source={Box} /> 
                    </View>
                    <View style={ login.pageFooter }>
                        <Button title={'Sign Up'} onPress={() => this.homeSwiper.scrollBy(1, true)} buttonStyle={ base.buttonStyle } />
                        <TouchableHighlight onPress={this.loginToFacebook}>
                            <Text style={{ color: '#1ebde7', textDecorationLine: 'underline', marginTop: 10 }}>Already Got an Account? Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={[ login.page, { justifyContent: 'space-around'} ]}>
                    <View style={[ login.mainContent, { alignItems: 'center', justifyContent: 'center' } ]}>
                        <Text style={ [login.headingText, {fontSize: 24, marginBottom: 20}] }>Are you...</Text>
                        <Button title={'Looking for a House'} onPress={() => this.setState({ isLookingForHouse: true },() => this.homeSwiper.scrollBy(1, true)) } buttonStyle={[ base.buttonStyle, { marginBottom: 10 } ]} />
                        <Button title={'Looking for People'} onPress={() => this.setState({ isLookingForHouse: false },() => this.homeSwiper.scrollBy(1, true)) } buttonStyle={ base.buttonStyle } />
                    </View>
                </View>

                <View style={[ login.page ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, {fontWeight: 'bold', fontSize: 24} ]}>What would you like to share?</Text>
                        <Text style={[ login.headingText, {fontSize: 16, fontWeight: '300'} ]}>This helps us find the right Flatmates for you</Text>
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
                            title={this.state.isLoggingIn ? 'Logging In...' : this.state.isLoggedIn ? 'Next' : 'Login with Facebook'} 
                            buttonStyle={[ base.buttonStyle, this.state.isLoggedIn ? { backgroundColor: Colors.brandSuccessColor } : { backgroundColor: Colors.facebookBlue }]} />
                    </View>         
                </View>       
                <View style={ login.page }>
                    
                    <View style={[ login.mainContent, { flex: 4, alignItems: 'center', justifyContent: 'flex-start', marginTop: 48 } ]}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: Colors.brandSecondaryColor }}>{this.state.isLoggedIn ? this.state.profile.get('name') : 'John Smith'}</Text>
                        {this.state.isLoggedIn ?          
                            <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 15, fontWeight: '300', color: Colors.textGrey }}>{ConvertBirthdayToAge(this.state.profile.get('birthday'))} / {this.state.profile.get('gender')} / University of Reading</Text>     
                            : <View/>}      
                        <Avatar 
                            xlarge={true} 
                            rounded={true} 
                            source={this.state.isLoggedIn ? {uri: this.state.profile.get('imageUrl')} : facebook_template } />
                        <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={ 50 }>
                            <View style={{ marginTop: 20 }}>
                                <Text style={[ login.labelText ]}>About Me</Text>
                                <TextInput placeholder={'Enter a short description of yourself'}
                                    maxLength={60}
                                    returnKeyType={'next'}
                                    blurOnSubmit={ false }
                                    onSubmitEditing={() => this.courseInput.focus()}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text) => this.setState({ bio: text })}
                                    style={{ color: Colors.textHighlightColor, width: 300, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey, }} />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={[ login.labelText ]}>Course</Text>
                                <TextInput placeholder={'Enter the name of your course'}
                                    ref={input => this.courseInput = input}
                                    returnKeyType={'done'}
                                    onSubmitEditing={() => this.homeSwiper.scrollBy(1, true)}
                                    onChangeText={(text) => this.setState({ course: text })}
                                    style={{ color: Colors.textHighlightColor, width: 300, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey, }} />
                            </View>
                        </KeyboardAvoidingView>
                            
                        
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
                {!this.state.isLookingForHouse ? this.renderHouseDetail() : {}}

                <View style={[ login.page, {backgroundColor: Colors.brandSecondaryColor} ]}>
                    <ImageBackground source={OpenBox} style={{position: 'absolute', left: Metrics.screenWidth * 0.03, bottom: Metrics.screenHeight * 0.2, width: 350, height: 350 }} />                                    
                    <View style={[ login.mainContent, { marginBottom: 50, flex: 4} ]}>
                        <Text style={ login.congratsText }>Congrats!</Text>
                        <Text style={ login.congratsSubtitleText }>You're ready to find your new Flatmates!</Text>
                    </View>
                    <View style={[ login.pageFooter, {justifyContent: 'flex-start'} ]}>
                        <Button title={'Continue'} onPress={() => this.props.navigation.navigate('Home')} buttonStyle={[ base.buttonStyle, {backgroundColor: Colors.backgroundWhite}]} textStyle={{color: Colors.brandSecondaryColor}} />
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
                            <TouchableOpacity style={{ width: 200, borderBottomWidth: 1, borderColor: Colors.grey  }} onPress={() => this.setState({ minEnabled: true, genderEnabled: false, maxEnabled: false } )}>
                                <Text style={{ color: Colors.textHighlightColor, fontSize: 18 }}>£{this.state.minPrice}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ marginVertical: 20 }}>
                            <Text style={ login.labelText }>Maximum Price (incl. bills)</Text>
                            <TouchableOpacity style={{ width: 200,borderBottomWidth: 1, borderColor: Colors.grey  }} onPress={() => this.setState({ maxEnabled: true, genderEnabled: false, minEnabled: false } )}>
                                <Text style={{ color: Colors.textHighlightColor, width: 200, fontSize: 18 }}>£{this.state.maxPrice}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={ login.labelText }>Gender Majority</Text>
                            <TouchableOpacity style={{ width: 200,borderBottomWidth: 1, borderColor: Colors.grey  }} onPress={() => this.setState({ genderEnabled: true, maxEnabled: false, minEnabled: false })}>
                                <Text style={{ color: Colors.textHighlightColor, width: 200, fontSize: 18 }}>{this.state.genderPreference}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* location would be good with with defaulting to current location */}
                    </View>
                    <View style={ login.pageFooter }>
                        <Button title={'Confirm'} onPress={this.completeUserSetup} buttonStyle={ base.buttonStyle } />
                    </View>
                    {this.state.minEnabled ?
                        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, width: Metrics.screenWidth, height: Metrics.screenHeight * 0.4, backgroundColor: Colors.backgroundWhite }}>
                            <Picker
                                enabled={this.state.minEnabled}
                                selectedValue={this.state.minPrice}
                                onValueChange={(itemValue, itemIndex) => this.setState({ minPrice: itemValue},() => setTimeout(() => this.setState({ minEnabled: false} ), 100))}
                                prompt={'Min Price'}>
                                <Picker.Item label={"£200"} value={200} />
                                <Picker.Item label={"£250"} value={250} />
                                <Picker.Item label={"£300"} value={300} />
                                <Picker.Item label={"£350"} value={350} />
                                <Picker.Item label={"£400"} value={400} />
                            </Picker>
                        </View> : <View/> }
                    {this.state.maxEnabled ?
                        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0,  width: Metrics.screenWidth, height: Metrics.screenHeight * 0.4, backgroundColor: Colors.backgroundWhite }}>
                            <Picker
                                enabled={this.state.maxEnabled}
                                selectedValue={this.state.maxPrice}
                                onValueChange={(itemValue, itemIndex) => this.setState({  maxPrice: itemValue },() => setTimeout(() => this.setState({ maxEnabled: false}), 100))}
                                prompt={'Max Price'}>
                                <Picker.Item label={"£350"} value={350} />
                                <Picker.Item label={"£400"} value={400} />
                                <Picker.Item label={"£450"} value={450} />
                                <Picker.Item label={"£500"} value={500} />
                                <Picker.Item label={"£550"} value={550} />
                            </Picker>
                        </View> : <View/> }
                    {this.state.genderEnabled ?
                        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0,  width: Metrics.screenWidth, height: Metrics.screenHeight * 0.4, backgroundColor: Colors.backgroundWhite }}>
                            <Picker
                                enabled={this.state.genderEnabled}
                                selectedValue={this.state.genderPreference}
                                onValueChange={(itemValue, itemIndex) => this.setState({ genderPreference: itemValue},() => setTimeout(() => this.setState({ genderEnabled: false }), 100))}
                                prompt={'Gender Preference'}>
                                <Picker.Item label={"Male"} value={"Male"} />
                                <Picker.Item label={"Female"} value={"Female"} />
                                <Picker.Item label={"No Preference"} value={"No Preference"} />
                            </Picker>
                        </View> : <View/> }
                </View>
            );
        } else {
            return (
                <View style={ login.page } >
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
                            onPress={() => this.homeSwiper.scrollBy(1, true)}
                            buttonStyle={[ base.buttonStyle, { marginBottom: 10 } ]} />
                        <TouchableHighlight>
                            <Text style={{ color: '#1ebde7', textDecorationLine: 'underline' }}>Create House</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
    }

    renderHouseDetail() {
        return (
                <View style={ login.page } key={'HouseDetails'}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, { fontSize: 20 } ]}>Enter your house details</Text>
                    </View>
                    <View style={[ login.mainContent, {justifyContent: 'flex-start'} ]}>
                    <View style={{ marginBottom: 20, alignSelf: 'center' }}>
                            <Text style={ login.labelText }>Road Name</Text>
                            <TextInput placeholder={'Fake Street'}
                            onChangeText={(text) => this.setState({ road: text })}
                            style={{ color: Colors.textHighlightColor, width: 270, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey }} />
                        </View>
                        
                    <View style={{ marginVertical: 20, flexDirection: 'row' }}>
                        <View style={{ marginRight: 30 }}>
                            <Text style={ login.labelText }>Rent Per Month</Text>
                            <TextInput placeholder={'£430.00'}
                                keyboardType={'numeric'}
                                onChangeText={(text) => this.setState({  rentPrice: text })}
                                style={{ color: Colors.textHighlightColor, width: 120, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey }} />
                        </View>
                        <View>
                            <Text style={ login.labelText }>Bills Per Month</Text>
                            <TextInput placeholder={'£23.00'}
                                keyboardType={'numeric'}
                                onChangeText={(text) => this.setState({  billsPrice: text })}
                                style={{ color: Colors.textHighlightColor, width: 120, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey }} />
                        </View>
                    </View>
                    <View style={{ marginTop: 20, alignSelf: 'center' }}>
                        <Text style={ login.labelText }>Available Rooms</Text>
                        <TextInput placeholder={'1'}
                            onChangeText={(text) => this.setState({  spaces: text })}
                            keyboardType={'numeric'}
                            style={{ color: Colors.textHighlightColor, width: 270, fontSize: 18, borderBottomWidth: 1, borderColor: Colors.grey }} />
                        </View>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button
                            title={'Confirm'}
                        onPress={this.completeNewHouseSetup}
                            buttonStyle={ base.buttonStyle} />
                    </View>
                </View>
        );
    }

}

const updateUser = graphql(UPDATE_USER_MUTATION, {
    props: ({ mutate }) => ({
        updateUser: ( id, bio, course, minPrice, maxPrice, genderPreference ) =>
            mutate({
                variables: { id, bio, course, minPrice, maxPrice, genderPreference },
            }),
    }),
});
        
const updateUserCreateHouse = graphql(UPDATE_USER_CREATE_HOUSE_MUTATION, {
    props: ({ mutate }) => ({
        updateUserCreateHouse: ( id, bio, course, shortID, road, rentPrice, billsPrice, spaces ) => 
            mutate({
                variables: { id, bio, course, shortID, road, rentPrice, billsPrice, spaces },
    }),
    })
})

const mapStateToProps = ( state ) => ({
    login: state.get('login')
});

const bindActions = (dispatch) => {
    return {
        loginWithFacebook: () => dispatch(loginWithFacebook()),
        getUserDataFacebook: () => dispatch(getUserDataFacebook()),
    };
}

export default compose(
    updateUser,
    updateUserCreateHouse,
    connect(mapStateToProps, bindActions)
)(Login);
