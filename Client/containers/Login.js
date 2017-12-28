import React from 'react';
import { 
    View, 
    TouchableOpacity, 
    Text, 
    Image, 
    TouchableHighlight, 
    TextInput, 
    ActivityIndicator, 
    Picker, 
    KeyboardAvoidingView, 
    ImageBackground, 
    Alert,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Swiper from 'react-native-swiper';
import { Button, Avatar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { CheckBox } from '../widgets';
import { signupWithFacebook, loginWithFacebook } from '../redux/Routines';
import { base, login, profile } from '../styles';
import { Colors, Strings, Metrics, Font } from '../consts';
import Box from '../../Assets/Joes_sexy_box.png';
import OpenBox from '../../Assets/Designs/Flatmates_Open_Box.png';
import facebook_template from '../../Assets/Man_Silhouette.png';
import { ConvertBirthdayToAge } from '../utils/BirthdayToAge';
import Client from '../Client';
import { HOUSE_QUERY } from '../graphql/queries';

import { 
    CREATE_USER_MUTATION, 
    UPDATE_USER_MUTATION, 
    UPDATE_USER_CREATE_HOUSE_MUTATION, 
    UPDATE_USER_UPDATE_HOUSE_MUTATION 
} from '../graphql/mutations';

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
            isCreatingHouse: false,
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
            
            shortID: 1,
            road: 'Road Street',
            rentPrice: 200,
            billsPrice: 30,
            spaces: 3,
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if (!newProps.login.equals(this.props.login)) {
            if (this.state.isLoggingIn && newProps.login.get('loginStatus') === 'Ended') {
                this.setState({ isLoggingIn: false });
                if (newProps.login.get('isLoggedIn')) {
                    this.setState({ isLoggedIn: true, profile: newProps.login.get('profile'), userId: newProps.login.get('id') });
                }
            }
        }
    }

    // Let the record show I have tested this works    
    generateShortID = function GenerateID() {
        let shortID = Math.floor(1000 + (10000 - 1000) * Math.random());
        
        try {
            Client.query({
                variables: { shortID },
                query: HOUSE_QUERY
            }).then(res => res.data.House === null ? null : new Error())
        } catch(error) {
            GenerateID();
        }

        this.setState({ shortID }, () => this.homeSwiper.scrollBy(1, true));
    }

    loginWithFacebook = () => {
        this.setState({ isLoggingIn: true }, () => this.props.loginWithFacebook());
    }

    signupWithFacebook = () => {
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

        this.setState({ isLoggingIn: true }, () => this.props.signupWithFacebook());
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

        this.homeSwiper.scrollBy(2, true);
    }

    completeNewHouseSetup = () => {
        // for short id what should happen is should query all houses for their ids and then generate a number that isn't in the array
        this.props.updateUserCreateHouse(
            this.state.userId,
            this.state.bio,
            this.state.course,
            this.state.shortID,
            this.state.road,
            Math.round(this.state.rentPrice),
            Math.round(this.state.billsPrice),
            parseInt(this.state.spaces)
        );

        this.homeSwiper.scrollBy(1, true);
    }

    completeJoiningHouseSetup = () => {
        Client.query({
            variables: { shortID: parseInt(this.state.shortID) },
            query: HOUSE_QUERY,
        }).then(res => {
            if (res.data.House !== null) {
                Alert.alert(
                    'Confirmation', 
                    'Are you sure you belong to the house on ' + res.data.House.road + '?',
                [
                    {text: 'Confirm', onPress: () => {
                        this.props.updateUserUpdateHouse(
                            this.state.userId,
                            this.state.bio,
                            this.state.course,
                            res.data.House.id
                        );
                        this.homeSwiper.scrollBy(2, true);
                    }},
                    {text: 'Cancel', style: "cancel"}
                ]);
                
            } else {
                alert('ID does not exist')
            }
        });
    }

    render() {
        return (
            <Swiper 
                ref={swiper => this.homeSwiper = swiper}
                loop={false} 
                scrollEnabled={false} 
                dotStyle={ login.dotStyle } 
                activeDotColor={Colors.textHighlightColor}>

                <View style={[ login.page, {justifyContent: 'space-around'} ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, { fontSize: 32, fontWeight: 'bold' } ]}>Welcome to Flatmates</Text>
                        <Text style={[ login.headingText, { fontSize: 20 } ]}>Student living made simple</Text>
                    </View>
                    <View style={[ login.mainContent, { flex: 3 } ]}>
                        <Image style={{ width: 250, height: 250 }} source={Box} /> 
                    </View>
                    <View style={ login.pageFooter }>
                        <Button title={this.state.isLoggingIn ? 'Logging In...' : this.state.isLoggedIn ? 'Finish' : 'Sign Up'} onPress={() => this.state.isLoggedIn ? this.props.navigation.navigate('Home') : this.homeSwiper.scrollBy(1, true)} fontFamily={Font.FONT_FAMILY} fontSize={20} buttonStyle={[ base.buttonStyle, this.state.isLoggedIn ? { backgroundColor: Colors.brandSuccessColor } : {} ]} />
                        <TouchableOpacity onPress={this.loginWithFacebook}>
                            <Text style={[ login.hyperlink, { marginTop: 10 } ]}>Already Got an Account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[ login.page, { justifyContent: 'space-around'} ]}>
                    <View style={[ login.mainContent, { alignItems: 'center', justifyContent: 'center' } ]}>
                        <Text style={ [login.headingText, {fontSize: 24, fontWeight: '700', marginBottom: 20}] }>Are you...</Text>
                        <Button title={'Looking for a House'} onPress={() => this.setState({ isLookingForHouse: true },() => this.homeSwiper.scrollBy(1, true)) } fontFamily={Font.FONT_FAMILY} fontSize={20} buttonStyle={[ base.buttonStyle, { marginBottom: 10 } ]} />
                        <Button title={'Looking for People'} onPress={() => this.setState({ isLookingForHouse: false },() => this.homeSwiper.scrollBy(1, true)) } fontFamily={Font.FONT_FAMILY} fontSize={20} buttonStyle={ base.buttonStyle } />
                    </View>
                </View>

                <View style={[ login.page ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, {fontWeight: 'bold', fontSize: 24} ]}>What would you like to share?</Text>
                        <Text style={[ login.headingText, {fontSize: 16, fontWeight: '400'} ]}>This helps us find the right Flatmates for you</Text>
                    </View>
                    <View style={ login.mainContent }>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'About Me'}
                                fontFamily={Font.FONT_FAMILY}
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ aboutCheck: !this.state.aboutCheck })}
                                isChecked={this.state.aboutCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Activities'}
                                fontFamily={Font.FONT_FAMILY}
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ activityCheck: !this.state.activityCheck })}
                                isChecked={this.state.activityCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Friends List'}
                                fontFamily={Font.FONT_FAMILY} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ friendsListCheck: !this.state.friendsListCheck })}
                                isChecked={this.state.friendsListCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <CheckBox 
                                title={'Liked Pages'}
                                fontFamily={Font.FONT_FAMILY} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ likesCheck: !this.state.likesCheck })}
                                isChecked={this.state.likesCheck} />
                        </View>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button 
                            leftIcon={{ type: 'font-awesome', name: this.state.isLoggedIn ? 'check' : 'facebook-square', size: 26 }} 
                            onPress={this.state.isLoggedIn ? () => this.homeSwiper.scrollBy(1, true) : this.signupWithFacebook}
                            fontFamily={Font.FONT_FAMILY} 
                            fontSize={20}
                            title={this.state.isLoggingIn ? 'Logging In...' : this.state.isLoggedIn ? 'Next' : 'Login with Facebook'} 
                            buttonStyle={[ base.buttonStyle, this.state.isLoggedIn ? { backgroundColor: Colors.brandSuccessColor } : { backgroundColor: Colors.facebookBlue }]} />
                    </View>         
                </View>       
                <View style={ login.page }>
                    
                    <View style={[ login.mainContent, { flex: 4, alignItems: 'center', justifyContent: 'flex-start', marginTop: Platform.OS === 'ios' ? 48 : 0 } ]}>
                        <Text style={ login.profileName }>{this.state.isLoggedIn ? this.state.profile.get('name') : 'John Smith'}</Text>
                        {this.state.isLoggedIn ?          
                            <Text style={ login.profileHeading }>{ConvertBirthdayToAge(this.state.profile.get('birthday'))} / {this.state.profile.get('gender')} / University of Reading</Text>     
                            : <View/>}      
                        <Avatar 
                            xlarge={true} 
                            rounded={true} 
                            source={this.state.isLoggedIn ? {uri: this.state.profile.get('imageUrl')} : facebook_template } />
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} keyboardVerticalOffset={ 50 }>
                            <View style={ login.marginTop }>
                                <Text style={[ login.labelText ]}>About Me</Text>
                                <TextInput placeholder={'Enter a short description of yourself'}
                                    maxLength={60}
                                    returnKeyType={'next'}
                                    blurOnSubmit={ false }
                                    onSubmitEditing={() => this.courseInput.focus()}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text) => this.setState({ bio: text })}
                                    underlineColorAndroid={Colors.grey}
                                    style={[ login.profileInput, {borderBottomWidth: Platform.OS === 'android' ? 0 : 1 }]} />
                            </View>
                            <View style={ login.marginTop }>
                                <Text style={[ login.labelText ]}>Course</Text>
                                <TextInput placeholder={'Enter the name of your course'}
                                    ref={input => this.courseInput = input}
                                    returnKeyType={'done'}
                                    onSubmitEditing={() => this.homeSwiper.scrollBy(1, true)}
                                    onChangeText={(text) => this.setState({ course: text })}
                                    underlineColorAndroid={Colors.grey}
                                    style={[ login.profileInput, {borderBottomWidth: Platform.OS === 'android' ? 0 : 1 }]} />
                            </View>
                        </KeyboardAvoidingView>
                            
                        
                            {/* social links would be good here */}
                    </View>
                    <View style={ login.pageFooter }>
                        <Button
                            title={'Confirm'}
                            fontFamily={Font.FONT_FAMILY} 
                            fontSize={20}
                            onPress={() => this.homeSwiper.scrollBy(1, true)}
                            buttonStyle={[ base.buttonStyle ]} />
                    </View>
                </View>

                {this.renderHouseOrProfileSetup()}
                {!this.state.isLookingForHouse && this.state.isCreatingHouse ? this.renderHouseDetail() : null}

                <View style={[ login.page, {backgroundColor: Colors.brandSecondaryColor} ]}>
                    <ImageBackground source={OpenBox} style={{position: 'absolute', left: Metrics.screenWidth * 0.03, bottom: Metrics.screenHeight * 0.2, width: 350, height: 350 }} />                                    
                    
                    {this.state.isCreatingHouse ? 
                        <View style={[ login.mainContent, { marginBottom: 170, flex: 3} ]}>
                            <Text style={ login.congratsText }>Congrats!</Text>
                            <Text style={ login.congratsSubtitleText }>Your unique House ID is</Text>
                            <Text style={ login.shortIDStyle }>{this.state.shortID}</Text>
                        </View> 
                        : 
                        <View style={[ login.mainContent, { marginBottom: 50, flex: 4} ]}>
                            <Text style={ login.congratsText }>Congrats!</Text>
                            <Text style={ login.congratsSubtitleText }>You're ready to find your new Flatmates!</Text>
                        </View>}

                    <View style={[ login.pageFooter, {justifyContent: 'flex-start'} ]}>
                        <Button title={'Continue'} onPress={() => this.props.navigation.navigate('Home')} buttonStyle={[ base.buttonStyle, {backgroundColor: Colors.backgroundWhite}]} fontFamily={Font.FONT_FAMILY} fontSize={20} textStyle={{color: Colors.brandSecondaryColor}} />
                    </View>
                </View>
                
                
            </Swiper>
        );
    }

    renderHouseOrProfileSetup() {
        if (this.state.isLookingForHouse) {
            return (
                <View style={ login.page }>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.headingText }>Enter your preferences for a house</Text>
                    </View>
                    <View style={[ login.mainContent, {justifyContent: 'flex-start'} ]}>
                        <View style={ login.marginBottom }>
                            <Text style={ login.labelText }>Minimum Price (incl. bills)</Text>
                            <TouchableOpacity style={ login.pickerActivator } onPress={() => this.setState({ minEnabled: true, genderEnabled: false, maxEnabled: false } )}>
                                <Text style={ login.pickerActivatorText }>£{this.state.minPrice}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={ login.marginVertical }>
                            <Text style={ login.labelText }>Maximum Price (incl. bills)</Text>
                            <TouchableOpacity style={ login.pickerActivator } onPress={() => this.setState({ maxEnabled: true, genderEnabled: false, minEnabled: false } )}>
                                <Text style={ login.pickerActivatorText }>£{this.state.maxPrice}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={  login.marginTop }>
                            <Text style={ login.labelText }>Gender Majority</Text>
                            <TouchableOpacity style={ login.pickerActivator } onPress={() => this.setState({ genderEnabled: true, maxEnabled: false, minEnabled: false })}>
                                <Text style={ login.pickerActivatorText }>{this.state.genderPreference}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* location would be good with with defaulting to current location */}
                    </View>
                    <View style={ login.pageFooter }>
                        <Button title={'Confirm'} fontFamily={Font.FONT_FAMILY} fontSize={20} onPress={this.completeUserSetup} buttonStyle={ base.buttonStyle } />
                    </View>
                    {this.state.minEnabled ?
                        <View style={ login.pickerWrapper }>
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
                        <View style={ login.pickerWrapper }>
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
                        <View style={ login.pickerWrapper }>
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
                            onChangeText={(text) => this.setState({ shortID: text })}
                            style={ login.houseIDInput }/>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button
                            title={'Confirm'}
                            onPress={this.completeJoiningHouseSetup}
                            fontFamily={Font.FONT_FAMILY} 
                            fontSize={20}
                            buttonStyle={[ base.buttonStyle, { marginBottom: 10 } ]} />
                        <TouchableOpacity onPress={() => this.setState({isCreatingHouse: true}, this.generateShortID)}>
                            <Text style={ login.hyperlink }>Create House</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    renderHouseDetail() {
        return (
            <View style={ login.page }>
                <View style={ login.headingWrapper }>
                    <Text style={[ login.headingText, { fontSize: 20 } ]}>Enter your house details</Text>
                </View>
                <View style={[ login.mainContent, {justifyContent: 'flex-start'} ]}>
                    <View style={[ login.marginBottom, { alignSelf: 'center' } ]}>
                        <Text style={ login.labelText }>Road Name</Text>
                        <TextInput placeholder={'Fake Street'}
                            onChangeText={(text) => this.setState({ road: text })}
                            underlineColorAndroid={Colors.grey}
                            style={[ login.houseDetailFullWidthInput, {borderBottomWidth: Platform.OS === 'android' ? 0 : 1 }]} />
                    </View>
                        
                    <View style={[ login.marginVertical, { flexDirection: 'row' } ]}>
                        <View style={{ marginRight: 30 }}>
                            <Text style={ login.labelText }>Rent Per Month</Text>
                            <View style={ login.priceInputWrapper }>
                                <Text style={ login.poundStyle }>£</Text>
                                <TextInput placeholder={'430.00'}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => this.setState({  rentPrice: text })}
                                    underlineColorAndroid={Colors.grey}
                                    style={[ login.houseDetailHalfWidthInput, {borderBottomWidth: Platform.OS === 'android' ? 0 : 1 }]} />
                            </View>
                        </View>
                        <View>
                            <Text style={ login.labelText }>Bills Per Month</Text>
                            <View style={ login.priceInputWrapper }>
                                <Text style={ login.poundStyle }>£</Text>
                                <TextInput placeholder={'23.00'}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => this.setState({  billsPrice: text })}
                                    underlineColorAndroid={Colors.grey}
                                    style={[ login.houseDetailHalfWidthInput, {borderBottomWidth: Platform.OS === 'android' ? 0 : 1 }]} />
                            </View>
                        </View>
                    </View>
                    <View style={[ login.marginTop, {alignSelf: 'center'} ]}>
                        <Text style={ login.labelText }>Available Rooms</Text>
                        <TextInput placeholder={'1'}
                            onChangeText={(text) => this.setState({  spaces: text })}
                            keyboardType={'numeric'}
                            underlineColorAndroid={Colors.grey}
                            style={[ login.profileInput, {borderBottomWidth: Platform.OS === 'android' ? 0 : 1 }]} />
                    </View>
                </View>
                
                <View style={ login.pageFooter }>
                    <Button
                        title={'Confirm'}
                        onPress={this.completeNewHouseSetup}
                        fontFamily={Font.FONT_FAMILY} 
                        fontSize={20}
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
});

const updateUserUpdateHouse = graphql(UPDATE_USER_UPDATE_HOUSE_MUTATION, {
    props: ({ mutate }) => ({
        updateUserUpdateHouse: (id, bio, course, houseId) =>
            mutate({
                variables: { id, bio, course, houseId },
            }),
    })
});

const mapStateToProps = ( state ) => ({
    login: state.get('login')
});

const bindActions = (dispatch) => {
    return {
        signupWithFacebook: () => dispatch(signupWithFacebook()),
        loginWithFacebook: () => dispatch(loginWithFacebook()),
    };
}

export default compose(
    updateUser,
    updateUserCreateHouse,
    updateUserUpdateHouse,
    connect(mapStateToProps, bindActions)
)(Login);
