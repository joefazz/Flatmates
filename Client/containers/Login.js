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
    Platform,
    Switch,
    StatusBar,
    Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Swiper from 'react-native-swiper';
import { Button, Avatar, Slider } from 'react-native-elements';

import { Checkbox } from '../widgets';
import { signupWithFacebook, loginWithFacebook } from '../redux/Routines';
import { base, login, profile } from '../styles';
import { Colors, Strings, Metrics, Font } from '../consts';
import Box from '../../Assets/Joes_sexy_box.png';
import OpenBox from '../../Assets/Designs/Flatmates_Open_Box.png';
import facebook_template from '../../Assets/Man_Silhouette.png';
import { ConvertBirthdayToAge } from '../utils/BirthdayToAge';
import Client from '../Client';
import { toConstantFontSize } from '../utils/PercentageConversion';
import { HOUSE_DETAILS_QUERY } from '../graphql/queries';
import { 
    CREATE_USER_MUTATION, 
    UPDATE_USER_MUTATION, 
    UPDATE_USER_CREATE_HOUSE_MUTATION, 
    UPDATE_USER_UPDATE_HOUSE_MUTATION 
} from '../graphql/mutations';

export let facebookPermissions = [];

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasLoginFailed: false, 
            isLoggingIn: false,
            isLoggedIn: false,
            hasGotProfile: false,

            aboutCheck: false,
            friendsListCheck: false,
            activityCheck: false,
            likesCheck: false,
            isLookingForHouse: false,
            isCreatingHouse: false,
            
            userId: '',
            profile: {},
            bio: '',
            isSmoker: false,
            studyYear: 'First',
            studyYearEnabled: false,
            course: '',
            minPrice: 300,
            maxPrice: 450,
            minEnabled: false,
            maxEnabled: false,
            genderEnabled: false,
            genderPreference: 'No Preference',
            socialScore: 5,
            
            shortID: 1,
            road: 'Road Street',
            rentPrice: 200,
            billsPrice: 30,
            spaces: 3,
            houseImages: []
        }
    }

    componentWillMount() {
        StatusBar.setBarStyle('dark-content');        
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.login.equals(this.props.login)) {
            if (this.state.isLoggingIn && newProps.login.get('loginStatus') === 'Ended') {
                this.setState({ isLoggingIn: false });
                if (newProps.login.get('isLoggedIn')) {
                    this.setState({ isLoggedIn: true });
                }
            } else if (newProps.login.get('loginStatus') === 'Failed') {
                this.setState({ isLoggedIn: false, hasLoginFailed: true });
            }
        }

        if (this.props.login.get('id') === '' && newProps.login.get('id') !== '') {
            this.setState({ userId: newProps.login.get('id') });
        }

        if (!newProps.profile.equals(this.props.profile)) {
            if (newProps.profile.get('name') !== '') {
                this.setState({ profile: newProps.profile, hasGotProfile: true });
            }
        }
    }    

    // Let the record show I have tested this works    
    generateShortID = function GenerateID() {
        let shortID = Math.floor(1000 + (10000 - 1000) * Math.random());
        
        try {
            Client.query({
                variables: { shortID },
                query: HOUSE_DETAILS_QUERY
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
            facebookPermissions.push('user_about_me', 'user_birthday');
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
            this.state.fbUserId, 
            this.state.bio, 
            this.state.course, 
            this.state.studyYear,
            this.state.isSmoker,
            this.state.socialScore,
            this.state.minPrice, 
            this.state.maxPrice, 
            this.state.genderPreference
        );

        this.homeSwiper.scrollBy(2, true);
    }

    completeNewHouseSetup = () => {
        // for short id what should happen is should query all houses for their ids and then generate a number that isn't in the array
        this.props.updateUserCreateHouse(
            this.state.fbUserId,
            this.state.bio,
            this.state.course,
            this.state.studyYear,
            this.state.isSmoker,
            this.state.socialScore,
            this.state.shortID,
            this.state.road,
            Math.round(this.state.rentPrice),
            Math.round(this.state.billsPrice),
            parseInt(this.state.spaces),
            this.state.houseImages
        );

        this.homeSwiper.scrollBy(1, true);
    }

    completeJoiningHouseSetup = () => {
        Client.query({
            variables: { shortID: parseInt(this.state.shortID) },
            query: HOUSE_DETAILS_QUERY,
        }).then(res => {
            if (res.data.House !== null) {
                Alert.alert(
                    'Confirmation', 
                    'Are you sure you belong to the house on ' + res.data.House.road + '?',
                [
                    {text: 'Confirm', onPress: () => {
                        this.props.updateUserUpdateHouse(
                            this.state.fbUserId,
                            this.state.bio,
                            this.state.course,
                            this.state.studyYear,
                            this.state.isSmoker,
                            this.state.socialScore,
                            this.state.shortID
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

    async uploadImages() {
        var imageUrls = [];
        var images = [];

        images = await ImagePicker.openPicker({
            multiple: true, 
            compressImageMaxHeight: 300, 
            compressImageMaxWidth: 300, 
            mediaType: 'photo', 
            loadingLabelText: 'Processing photos...' 
        }).catch(error => alert('Image Upload Cancelled'));
        
        if (images && images.length > 0) {   
            imageUrls = await Promise.all(images.map(async (image) => {
                const formData = new FormData();

                let lastIndex = image.path.lastIndexOf('/') + 1;

                const data = {
                    uri: image.path,
                    name: image.path.slice(lastIndex),
                    type: image.mime
                };

                formData.append('data', data);

                const options = {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                };

                let response = await fetch('https://api.graph.cool/file/v1/cjan360c023tx0138uknsgziy', options);
                
                if (response.ok) {
                    let json = await response.json();
                    return json.url;
                } else {
                    alert('Problem with fetch: ' + response.status);
                }
            }));

            this.setState({ houseImages: imageUrls });
        }
    }

    render() {
        if (this.state.hasLoginFailed) {
            Alert.alert('Login Failed', this.props.login.get('error'), [{
                text: 'OK', onPress: () => this.setState({ hasLoginFailed: false, isLoggingIn: false })
            }]);
        }

        return (
            <Swiper 
                ref={swiper => this.homeSwiper = swiper}
                loop={false} 
                scrollEnabled={false} 
                dotStyle={ login.dotStyle } 
                activeDotColor={Colors.textHighlightColor}>

                <View style={[ login.page, {justifyContent: 'space-around'} ]}>
                    <View style={[ login.headingWrapper, {flex: 1} ]}>
                        <Text style={[ login.headingText, { fontSize: toConstantFontSize(3.9), ...Font.FontFactory({ family: 'Nunito', weight: 'Bold' }) } ]}>Welcome to Flatmates</Text>
                        <Text style={[ login.headingText, { fontSize: toConstantFontSize(2.9) } ]}>Student living made simple</Text>
                    </View>
                    <View style={[ login.mainContent, { flex: 2 } ]}>
                        <Image style={{ width: 250, height: 250 }} source={Box} /> 
                    </View>
                    <View style={ login.pageFooter }>
                        <Button testID={'SignUpButton'} title={this.state.isLoggingIn ? 'Logging In...' : this.state.isLoggedIn ? 'Finish' : 'Sign Up'} onPress={() => this.state.isLoggedIn ? this.props.navigation.navigate('Home') : this.homeSwiper.scrollBy(1, true)} fontFamily={Font.FONT_FAMILY} fontSize={20} buttonStyle={[ base.buttonStyle, this.state.isLoggedIn ? { backgroundColor: Colors.brandSuccessColor } : {} ]} />
                        <TouchableOpacity testID={'LoginButton'} onPress={this.loginWithFacebook}>
                            <Text style={[ login.hyperlink, { marginTop: 10 } ]}>Already Got an Account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[ login.page, { justifyContent: 'space-around'} ]}>
                    <View style={[ login.mainContent, { alignItems: 'center', justifyContent: 'center' } ]}>
                        <Text style={ [login.headingText, {fontSize: 24, fontWeight: '700', marginBottom: 20}] }>Are you...</Text>
                        <Button testID={'PersonFlow'} title={'Looking for a House'} onPress={() => this.setState({ isLookingForHouse: true },() => this.homeSwiper.scrollBy(1, true)) } fontFamily={Font.FONT_FAMILY} fontSize={20} buttonStyle={[ base.buttonStyle, { marginBottom: 10 } ]} />
                        <Button testID={'HouseFlow'} title={'Looking for People'} onPress={() => this.setState({ isLookingForHouse: false },() => this.homeSwiper.scrollBy(1, true)) } fontFamily={Font.FONT_FAMILY} fontSize={20} buttonStyle={ base.buttonStyle } />
                    </View>
                </View>

                <View style={[ login.page ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={[ login.headingText, {fontWeight: 'bold', fontSize: 24} ]}>What would you like to share?</Text>
                        <Text style={[ login.headingText, {fontSize: 16, fontWeight: '400'} ]}>This helps us find the right Flatmates for you</Text>
                    </View>
                    <View style={ login.mainContent }>
                        <View style={{marginVertical: 10}}>
                            <Checkbox 
                                title={'About Me'}
                                fontFamily={Font.FONT_FAMILY}
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ aboutCheck: !this.state.aboutCheck })}
                                isChecked={this.state.aboutCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <Checkbox 
                                title={'Activities'}
                                fontFamily={Font.FONT_FAMILY}
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ activityCheck: !this.state.activityCheck })}
                                isChecked={this.state.activityCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <Checkbox 
                                title={'Friends List'}
                                fontFamily={Font.FONT_FAMILY} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ friendsListCheck: !this.state.friendsListCheck })}
                                isChecked={this.state.friendsListCheck} />
                        </View>
                        <View style={{marginVertical: 10}}>
                            <Checkbox 
                                title={'Liked Pages'}
                                fontFamily={Font.FONT_FAMILY} 
                                color={Colors.textHighlightColor}
                                onIconPress={() => this.setState({ likesCheck: !this.state.likesCheck })}
                                isChecked={this.state.likesCheck} />
                        </View>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button 
                            testID={'FBLogin'}
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
                        <Text style={ login.profileName }>{this.state.hasGotProfile ? this.state.profile.get('name') : 'John Smith'}</Text>
                        {this.state.hasGotProfile ?          
                            <Text style={ login.profileHeading }>{ConvertBirthdayToAge(this.state.profile.get('birthday'))} / {this.state.profile.get('gender')} / University of Reading</Text>     
                            : <View/>}      
                        <Avatar 
                            xlarge={true} 
                            rounded={true} 
                            source={this.state.hasGotProfile ? {uri: this.state.profile.get('imageUrl')} : facebook_template } />
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

                <View style={[ login.page, { alignItems: 'stretch' } ]}>
                    <View style={ login.headingWrapper }>
                        <Text style={ login.headingText }>Enter additional information</Text>
                    </View>
                    <View style={[ login.mainContent, { alignItems: 'stretch', justifyContent: 'flex-start', flex: 3 } ]}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View>
                                <Text style={[ login.labelText, { alignSelf: 'center' } ]}>Study Year</Text>
                                <TouchableOpacity style={ login.pickerActivator } onPress={() => this.setState({ studyYearEnabled: true })}>
                                    <Text style={ login.pickerActivatorText }>{this.state.studyYear}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', paddingHorizontal: 15}}>
                            <Text style={ login.labelText }>Smoker</Text>
                            <Switch onTintColor={ Colors.brandSecondaryColor } thumbTintColor={ Colors.brandPrimaryColor } tintColor={ Colors.grey } onValueChange={(val) => this.setState({ isSmoker: val })} value={this.state.isSmoker}/>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View>
                                <Text style={[ login.labelText, { alignSelf: 'center' } ]}>How social would you say you are? (From 1 to 10)</Text>
                                <Text style={[ login.labelText, { alignSelf: 'center', fontWeight: 'bold'} ]}>{ this.state.socialScore }</Text>                                
                                    <Slider 
                                        value={ this.state.socialScore } 
                                        onValueChange={(val) => this.setState({ socialScore: val })} 
                                        step={1} 
                                        minimumValue={0} 
                                        maximumValue={10} 
                                        minimumTrackTintColor={ Colors.brandSecondaryColor } />
                            </View>
                        </View>
                    </View>
                    <View style={ login.pageFooter }>
                        <Button
                        title={'Confirm'}
                        fontFamily={Font.FONT_FAMILY} 
                        fontSize={20}
                        onPress={() => this.homeSwiper.scrollBy(1, true)}
                        buttonStyle={[ base.buttonStyle ]} />
                    </View>
                    {this.state.studyYearEnabled ?
                        <View style={ login.pickerWrapper }>
                            <Picker
                                enabled={this.state.studyYearEnabled}
                                selectedValue={this.state.studyYear}
                                onValueChange={(itemValue, itemIndex) => this.setState({ studyYear: itemValue },() => setTimeout(() => this.setState({ studyYearEnabled: false} ), 100))}
                                prompt={'Study Year'}>
                                <Picker.Item label={'First'} value={'First'} />
                                <Picker.Item label={'Second'} value={'Second'} />
                                <Picker.Item label={'Third'} value={'Third'} />
                                <Picker.Item label={'Sandwich Year'} value={'Sandwich Year'} />
                                <Picker.Item label={'Masters'} value={'Masters'} />
                                <Picker.Item label={'Ph.D.'} value={'Ph.D.'} />
                            </Picker>
                        </View> : <View/> }
                </View>

                {this.renderHouseOrProfileSetup()}
                {!this.state.isLookingForHouse && this.state.isCreatingHouse ? this.renderHouseDetail() : null}

                <View style={[ login.page, {backgroundColor: Colors.brandSecondaryColor} ]}>
                    <ImageBackground source={OpenBox} style={{position: 'absolute', left: Metrics.screenWidth * 0.03, bottom: Metrics.screenHeight * 0.3, width: 350, height: 350 }} />                                    
                    
                    {this.state.isCreatingHouse ? 
                        <View style={[ login.mainContent, { marginBottom: 170, flex: 2} ]}>
                            <Text style={ login.congratsText }>Congrats!</Text>
                            <Text style={ login.congratsSubtitleText }>Your unique House ID is</Text>
                            <Text style={ login.shortIDStyle }>{this.state.shortID}</Text>
                        </View> 
                        : 
                        <View style={[ login.mainContent, { marginBottom: 50, flex: 2} ]}>
                            <Text style={ login.congratsText }>Congrats!</Text>
                            <Text style={ login.congratsSubtitleText }>You're ready to find your new Flatmates!</Text>
                        </View> 
                    }

                    <View style={{ flex: this.state.isCreatingHouse ? 0.8 : 2}} />                    

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
                        {/* location would be good with with defaulting to university location */}
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
                            autoCorrect={false}
                            spellCheck={false}
                            underlineColorAndroid={Colors.grey}
                            style={ login.houseDetailFullWidthInput } />
                    </View>
                        
                    <View style={[ login.marginVertical, { flexDirection: 'row', alignSelf: 'center' } ]}>
                        <View style={{ marginRight: 30 }}>
                            <Text style={ login.labelText }>Rent Per Month</Text>
                            <View style={ login.priceInputWrapper }>
                                <Text style={ login.poundStyle }>£</Text>
                                <TextInput placeholder={'430.00'}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => this.setState({  rentPrice: text })}
                                    underlineColorAndroid={Colors.grey}
                                    style={ login.houseDetailHalfWidthInput } />
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
                                    style={ login.houseDetailHalfWidthInput } />
                            </View>
                        </View>
                    </View>
                    <View style={[ login.marginTop, {alignSelf: 'center'} ]}>
                        <Text style={ login.labelText }>Available Rooms</Text>
                        <TextInput placeholder={'1'}
                            onChangeText={(text) => this.setState({  spaces: text })}
                            keyboardType={'numeric'}
                            underlineColorAndroid={Colors.grey}
                            style={ login.houseDetailFullWidthInput } />
                    </View>
                    <View style={[ login.marginTop, { alignSelf: 'flex-start' } ]}>
                        <Text style={ login.labelText }>Images</Text>
                        {/* Probably want to make this a horizontal scroll view in the future */}
                        <View style={{ flexDirection: 'row' }}>
                            {this.state.houseImages.map(image => {
                                return <Image source={{uri: image}} style={{width: 70, height: 70, marginRight: 6}} />
                            })}
                        </View>
                    </View>
                </View>
                
                <View style={ login.pageFooter }>
                    {this.state.houseImages.length === 0 ?
                        <Button title={'Upload Photos'} leftIcon={{ type: 'font-awesome', name: 'camera', size: 26 }} fontFamily={Font.FONT_FAMILY} fontSize={20} buttonStyle={[ base.buttonStyle, { backgroundColor: Colors.purple } ]} onPress={() => this.uploadImages()} />
                        :
                        <Button
                            title={'Confirm'}
                            onPress={this.completeNewHouseSetup}
                            fontFamily={Font.FONT_FAMILY} 
                            fontSize={20}
                            buttonStyle={ base.buttonStyle} /> }
                </View>
            </View>
        );
    }

}

const updateUser = graphql(UPDATE_USER_MUTATION, {
    props: ({ mutate }) => ({
        updateUser: ( facebookUserId, bio, course, studyYear, isSmoker, socialScore, minPrice, maxPrice, genderPreference ) =>
            mutate({
                variables: { facebookUserId, bio, course, studyYear, isSmoker, socialScore, minPrice, maxPrice, genderPreference },
            }),
    }),
});
        
const updateUserCreateHouse = graphql(UPDATE_USER_CREATE_HOUSE_MUTATION, {
    props: ({ mutate }) => ({
        updateUserCreateHouse: ( facebookUserId, bio, course, studyYear, isSmoker, socialScore, shortID, road, rentPrice, billsPrice, spaces, houseImages ) => 
            mutate({
                variables: { facebookUserId, bio, course, studyYear, isSmoker, socialScore, shortID, road, rentPrice, billsPrice, spaces, houseImages },
            }),
    })
});

const updateUserUpdateHouse = graphql(UPDATE_USER_UPDATE_HOUSE_MUTATION, {
    props: ({ mutate }) => ({
        updateUserUpdateHouse: (facebookUserId, bio, course, studyYear, isSmoker, socialScore, shortID) =>
            mutate({
                variables: { facebookUserId, bio, course, studyYear, isSmoker, socialScore, shortID },
            }),
    })
});

const mapStateToProps = ( state ) => ({
    login: state.get('login'),
    profile: state.get('profile')
});

const bindActions = (dispatch) => {
    return {
        signupWithFacebook: () => dispatch(signupWithFacebook()),
        loginWithFacebook: () => dispatch(loginWithFacebook()),
    };
}

export default compose(
    connect(mapStateToProps, bindActions),    
    updateUser,
    updateUserCreateHouse,
    updateUserUpdateHouse,
)(Login);
