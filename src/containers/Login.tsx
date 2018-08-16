import React from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    DatePickerAndroid,
    DatePickerIOS,
    Platform,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    ActivityIndicator,
    StatusBar,
    Linking
} from 'react-native';
import Permissions from 'react-native-permissions';
import moment from 'moment';
import Auth0 from 'react-native-auth0';
import { Avatar } from 'react-native-elements';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import Box from '../../Assets/box.png';
import OpenBox from '../../Assets/Designs/Flatmates_Open_Box.png';
import { MapboxSDK, TRACKER } from '../App';
import Client from '../Client';
import { Colors, Font } from '../consts';
import { HOUSE_DETAILS_QUERY, USER_LOGIN_QUERY } from '../graphql/queries';
import {
    createUserWithHouse,
    createUser,
    getUserData,
    createUserJoinHouse
} from '../redux/Routines';
import { base, login } from '../styles';
import { LoginStatus } from '../types/Entities';
import { LoginState, ProfileState, ReduxState } from '../types/ReduxTypes';
import {
    toConstantFontSize,
    toConstantWidth,
    toConstantHeight
} from '../utils/PercentageConversion';
import { TouchableRect } from '../widgets/TouchableRect';
import { FlatPicker } from '../widgets/FlatPicker';
import { FontFactory } from '../consts/font';
import client from '../Client';
import {
    UserLoginQuery,
    CreateUserMutationVariables,
    CreateUserCreateHouseMutationVariables,
    CreateUserUpdateHouseMutationVariables
} from '../graphql/Types';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { DOMAIN } from '../consts/endpoint';
import OneSignal from 'react-native-onesignal';
import { getCoordsFromAddress } from '../utils/localdash';
import { STUDY_YEARS, GENDERS } from '../consts/strings';
import { VERIFY_EMAIL_MUTATION } from '../graphql/mutations/User/VerifyEmail';
import Tron from '../utils/ReactotronConfig';
var json = require('../../package.json');

const auth0 = new Auth0({
    domain: 'flatmates-auth.eu.auth0.com',
    clientId: '16eejgqqPJR1L1jzVRfLxEakufJ47sW6'
});

interface Props {
    login: LoginState;
    profile: ProfileState;
    createUser: (user: CreateUserMutationVariables) => void;
    createUserWithHouse: (mutationVars: CreateUserCreateHouseMutationVariables) => void;
    createUserJoinHouse: (mutationVars: CreateUserUpdateHouseMutationVariables) => void;
    getUserData: (user: any) => void;
    navigation: { navigate: (route: string) => void };
}

interface State {
    hasLoginFailed: boolean;
    isLoggingIn: boolean;
    isLoggedIn: boolean;
    hasGotProfile: boolean;
    tempImages: Array<any>;
    tempProfilePic: any;
    removeImageToggle: boolean;

    hasSubmittedProfilePic: boolean;

    firstName: string;
    lastName: string;
    gender?: string;
    age?: number | string;
    profilePicture?: string;
    isLookingForHouse: boolean;
    isCreatingHouse: boolean;

    bio: string;
    isSmoker: boolean;
    isDruggie: boolean;
    isDrinker: boolean;
    studyYear?: string;
    course?: string;
    minPrice: string;
    maxPrice: string;
    genderPreference: string;
    drugPreference: string;
    drinkPreference: string;
    smokerPreference: string;

    shortID: string | number;
    road: string;
    rentPrice: string | number;
    billsPrice: string | number;
    spaces: string | number;
    houseImages: Array<string>;
    rentDue: string | Date;
    billsDue: string | Date;
    isRentDueDatePickerVisible: boolean;
    isBillsDueDatePickerVisible: boolean;

    creatingDialogText: string;
}

export class Login extends React.Component<Props, State> {
    static getDerivedStateFromProps(newProps: Props, prevState: State) {
        let newState: State | {} = {};
        if (
            newProps.login.loginStatus === LoginStatus.SUCCEED ||
            newProps.login.loginStatus === LoginStatus.FAILED
        ) {
            if (prevState.isLoggingIn && newProps.login.loginStatus === LoginStatus.SUCCEED) {
                (newState as State).isLoggingIn = false;
                if (newProps.login.isLoggedIn) {
                    (newState as State).isLoggedIn = true;
                }
            } else if (newProps.login.loginStatus === LoginStatus.FAILED) {
                (newState as State).isLoggedIn = false;
                (newState as State).hasLoginFailed = true;
            }
        }

        return newState;
    }

    homeSwiper: any;
    courseInput: any;
    lastNameInput: any;
    ageInput: any;
    email: string;
    isVerifiedUser: boolean;
    authId: string;
    START_TIME: number;

    constructor(props) {
        super(props);

        this.state = {
            hasLoginFailed: false,
            isLoggingIn: false,
            isLoggedIn: false,
            hasGotProfile: false,
            removeImageToggle: false,
            tempImages: [],
            tempProfilePic: '',

            firstName: '',
            lastName: '',
            age: undefined,
            profilePicture: undefined,
            gender: undefined,
            bio: '',
            isSmoker: false,
            isDruggie: false,
            isDrinker: false,
            course: undefined,
            studyYear: undefined,
            minPrice: '£350',
            maxPrice: '£450',
            genderPreference: 'No Preference',
            drinkPreference: '',
            drugPreference: '',
            smokerPreference: '',

            shortID: 0 as number,
            road: '',
            rentPrice: 0,
            billsPrice: 0,
            spaces: 0,
            houseImages: [],
            billsDue: moment(new Date()).toDate(),
            rentDue: moment(new Date()).toDate(),
            isRentDueDatePickerVisible: false,
            isBillsDueDatePickerVisible: false,

            isLookingForHouse: false,
            isCreatingHouse: false,

            creatingDialogText: ''
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            AndroidKeyboardAdjust.setAdjustPan();
        }

        TRACKER.trackScreenView('Login');

        this.START_TIME = moment().unix();

        StatusBar.setBarStyle('dark-content');
    }

    render() {
        if (this.state.hasLoginFailed) {
            Alert.alert('Login Failed', this.props.login.error, [
                {
                    text: 'OK',
                    onPress: () => this.setState({ hasLoginFailed: false, isLoggingIn: false })
                }
            ]);
        }

        return (
            <Swiper
                ref={(swiper) => (this.homeSwiper = swiper)}
                loop={false}
                scrollEnabled={false}
                dotStyle={login.dotStyle}
                activeDotColor={Colors.textHighlightColor}
            >
                <View style={[login.page, { justifyContent: 'space-around' }]}>
                    <View style={[base.headingWrapper, { flex: 1 }]}>
                        <Text
                            style={[
                                base.headingText,
                                {
                                    fontSize: toConstantFontSize(3.9),
                                    ...Font.FontFactory({ weight: 'Bold' })
                                }
                            ]}
                        >
                            Welcome to Flatmates
                        </Text>
                        <Text style={[base.headingText, { fontSize: toConstantFontSize(2.9) }]}>
                            Student living made simple
                        </Text>
                    </View>
                    <View style={[login.mainContent, { flex: 2 }]}>
                        <Image
                            style={{ width: toConstantWidth(80), height: toConstantWidth(80) }}
                            source={Box}
                        />
                    </View>
                    <View style={login.pageFooter}>
                        <TouchableRect
                            title={this.state.isLoggingIn ? 'Logging In...' : 'Get Started'}
                            enabled={!this.state.isLoggingIn}
                            onPress={this.loginWithAuth0}
                            backgroundColor={Colors.brandPrimaryColor}
                            buttonStyle={base.buttonStyle}
                        />
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Feed', { isReadOnly: true })
                            }
                        >
                            <Text
                                style={[
                                    login.hyperlink,
                                    { marginTop: 10, ...FontFactory(), fontSize: 17 }
                                ]}
                            >
                                Try without signing up!
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 10, ...FontFactory() }}>{json.version}</Text>
                    </View>
                </View>

                <View style={[login.page, { justifyContent: 'space-around' }]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            position: 'absolute',
                            top: toConstantHeight(3),
                            left: 10,
                            shadowColor: Colors.grey,
                            shadowOpacity: 0.7,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                        onPress={() => this.homeSwiper.scrollBy(-1)}
                    >
                        <Icon
                            style={{ fontSize: 45, color: Colors.brandPrimaryColor }}
                            name={'ios-arrow-dropleft-circle'}
                        />
                    </TouchableOpacity>
                    <View
                        style={[
                            login.mainContent,
                            { alignItems: 'center', justifyContent: 'center' }
                        ]}
                    >
                        <Text
                            style={[
                                base.headingText,
                                {
                                    fontSize: 24,
                                    ...Font.FontFactory({ weight: 'Bold' }),
                                    marginBottom: 20
                                }
                            ]}
                        >
                            Do you...
                        </Text>
                        <TouchableRect
                            title={'Need a House'}
                            onPress={() =>
                                this.setState(
                                    { isLookingForHouse: true },
                                    (): void => this.homeSwiper.scrollBy(1, true)
                                )
                            }
                            backgroundColor={Colors.brandPrimaryColor}
                            buttonStyle={base.buttonStyle}
                            wrapperStyle={{ marginBottom: 10 }}
                        />
                        <TouchableRect
                            title={'Have a House'}
                            onPress={() =>
                                this.setState({ isLookingForHouse: false }, () =>
                                    this.homeSwiper.scrollBy(1, true)
                                )
                            }
                            backgroundColor={Colors.brandPrimaryColor}
                            buttonStyle={base.buttonStyle}
                        />
                    </View>
                </View>

                <KeyboardAvoidingView style={login.page}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            position: 'absolute',
                            top: toConstantHeight(3),
                            left: 10,
                            shadowColor: Colors.grey,
                            shadowOpacity: 0.7,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                        onPress={() => this.homeSwiper.scrollBy(-1)}
                    >
                        <Icon
                            style={{ fontSize: 45, color: Colors.brandPrimaryColor }}
                            name={'ios-arrow-dropleft-circle'}
                        />
                    </TouchableOpacity>
                    <View style={base.headingWrapper}>
                        <Text style={base.headingTitle}>Basic Information</Text>
                        <Text style={base.headingSubtitle}>We store your information securely</Text>
                    </View>
                    <View
                        style={[
                            login.mainContent,
                            { alignItems: 'center', justifyContent: 'flex-start' }
                        ]}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[{ flexDirection: 'row', alignSelf: 'flex-start' }]}>
                                <View style={{ marginRight: 20 }}>
                                    <Text style={[base.labelText]}>First Name</Text>
                                    <TextInput
                                        placeholder={'Enter first name'}
                                        maxLength={60}
                                        autoCorrect={false}
                                        placeholderTextColor={Colors.grey}
                                        returnKeyType={'next'}
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => this.lastNameInput.focus()}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.setState({ firstName: text })}
                                        underlineColorAndroid={Colors.grey}
                                        style={base.halfWidthInput}
                                    />
                                </View>
                                <View>
                                    <Text style={[base.labelText]}>Last Name</Text>
                                    <TextInput
                                        ref={(component) => (this.lastNameInput = component)}
                                        placeholder={'Enter last name'}
                                        maxLength={60}
                                        placeholderTextColor={Colors.grey}
                                        autoCorrect={false}
                                        returnKeyType={'next'}
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => this.ageInput.focus()}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.setState({ lastName: text })}
                                        underlineColorAndroid={Colors.grey}
                                        style={base.halfWidthInput}
                                    />
                                </View>
                            </View>
                            <View
                                style={[
                                    login.marginTop,
                                    { flexDirection: 'row', alignSelf: 'flex-start' }
                                ]}
                            >
                                <View style={{ marginRight: 20 }}>
                                    <Text style={base.labelText}>Age</Text>
                                    <TextInput
                                        ref={(component) => (this.ageInput = component)}
                                        placeholder={'Enter your age'}
                                        maxLength={60}
                                        returnKeyType={'next'}
                                        blurOnSubmit={false}
                                        placeholderTextColor={Colors.grey}
                                        keyboardType={'numeric'}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.setState({ age: text })}
                                        underlineColorAndroid={Colors.grey}
                                        style={base.halfWidthInput}
                                    />
                                </View>
                                <View>
                                    <Text style={[base.labelText, { marginLeft: 0 }]}>Gender</Text>
                                    <FlatPicker
                                        initialValue={'Select Gender'}
                                        onChange={({ label }) => this.setState({ gender: label })}
                                        selectStyle={[
                                            {
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                margin: 0,
                                                padding: 0,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderRadius: 0
                                            },
                                            base.halfWidthWrapper
                                        ]}
                                        selectTextStyle={[
                                            {
                                                fontSize:
                                                    toConstantFontSize(2.5) > 18
                                                        ? 18
                                                        : toConstantFontSize(2.5),
                                                ...FontFactory({ family: 'Nunito' }),
                                                marginBottom: Platform.OS === 'android' ? 2 : 0
                                            },
                                            this.state.gender === ''
                                                ? { color: Colors.grey }
                                                : { color: Colors.textHighlightColor }
                                        ]}
                                        items={[
                                            {
                                                section: true,
                                                label: 'Select your gender from the list below'
                                            },
                                            ...GENDERS
                                        ]}
                                    />
                                </View>
                            </View>
                            {this.state.tempProfilePic ? (
                                <Avatar
                                    width={toConstantWidth(50)}
                                    height={toConstantWidth(50)}
                                    source={{ uri: this.state.tempProfilePic.path }}
                                    onPress={() => this.selectProfilePicture()}
                                    activeOpacity={0.7}
                                    containerStyle={[{ alignSelf: 'center' }, login.marginVertical]}
                                    rounded={true}
                                />
                            ) : (
                                <Avatar
                                    width={toConstantWidth(50)}
                                    height={toConstantWidth(50)}
                                    icon={{ name: 'person' }}
                                    onPress={() => this.selectProfilePicture()}
                                    activeOpacity={0.7}
                                    containerStyle={[{ alignSelf: 'center' }, login.marginVertical]}
                                    rounded={true}
                                />
                            )}
                        </View>
                    </View>
                    <View style={login.pageFooter}>
                        <TouchableRect
                            onPress={() => {
                                this.state.firstName === ''
                                    ? alert('Please enter your first name')
                                    : this.state.lastName === ''
                                        ? alert('Please enter your last name')
                                        : this.homeSwiper.scrollBy(1, true);
                            }}
                            title={'Next'}
                            backgroundColor={
                                this.state.firstName === '' || this.state.lastName === ''
                                    ? Colors.grey
                                    : Colors.brandSecondaryColor
                            }
                            buttonStyle={base.buttonStyle}
                        />
                    </View>
                </KeyboardAvoidingView>

                <View style={login.page}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            position: 'absolute',
                            top: toConstantHeight(3),
                            left: 10,
                            shadowColor: Colors.grey,
                            shadowOpacity: 0.7,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                        onPress={() => this.homeSwiper.scrollBy(-1)}
                    >
                        <Icon
                            style={{ fontSize: 45, color: Colors.brandPrimaryColor }}
                            name={'ios-arrow-dropleft-circle'}
                        />
                    </TouchableOpacity>
                    <View style={[base.headingWrapper, { marginTop: 15 }]}>
                        <Text style={base.headingTitle}>Profile Information</Text>
                        <Text style={[base.headingSubtitle, { textAlign: 'center' }]}>
                            This information helps us find the
                            {'\n'}
                            best Flatmates
                        </Text>
                    </View>
                    <View
                        style={[
                            login.mainContent,
                            {
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 20
                            }
                        ]}
                    >
                        <View>
                            <Text style={[base.labelText]}>About Me</Text>
                            <TextInput
                                placeholder={'Enter a short description of yourself'}
                                maxLength={60}
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={(text) => this.setState({ bio: text })}
                                underlineColorAndroid={Colors.grey}
                                style={base.fullWidthInput}
                            />
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 20 }}>
                                    <Text style={[base.pickerLabelText]}>General Course</Text>
                                    <FlatPicker
                                        items={[
                                            {
                                                section: true,
                                                label: 'General Subject'
                                            },
                                            { label: 'Administration' },
                                            { label: 'Area Studies' },
                                            { label: 'Arts' },
                                            { label: 'Biology' },
                                            { label: 'Business Studies' },
                                            { label: 'Chemistry' },
                                            { label: 'Classics' },
                                            { label: 'Computer Science' },
                                            { label: 'Economics' },
                                            { label: 'Educational Studies' },
                                            { label: 'Engineering' },
                                            { label: 'Film' },
                                            { label: 'Health Studies' },
                                            { label: 'History' },
                                            { label: 'Languages' },
                                            { label: 'Law' },
                                            { label: 'English Language' },
                                            { label: 'English Literature' },
                                            { label: 'Management' },
                                            { label: 'Mathematics' },
                                            { label: 'Medicine' },
                                            { label: 'Performing Arts' },
                                            { label: 'PGCE' },
                                            { label: 'Philosophy' },
                                            { label: 'Physics' },
                                            { label: 'Politics' },
                                            { label: 'Veterinary Medicine' }
                                        ]}
                                        selectStyle={[
                                            {
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                margin: 0,
                                                padding: 0,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderRadius: 0
                                            },
                                            base.halfWidthWrapper
                                        ]}
                                        selectTextStyle={[
                                            {
                                                fontSize:
                                                    toConstantFontSize(2.5) > 18
                                                        ? 18
                                                        : toConstantFontSize(2.5),
                                                ...FontFactory({ family: 'Nunito' })
                                            },
                                            this.state.course === ''
                                                ? { color: Colors.grey }
                                                : { color: Colors.textHighlightColor }
                                        ]}
                                        onChange={(val) => this.setState({ course: val.label })}
                                        initialValue={'Select Course'}
                                    />
                                </View>
                                <View>
                                    <Text style={base.pickerLabelText}>Study Year</Text>
                                    <FlatPicker
                                        items={[
                                            {
                                                section: true,
                                                label: "Select the year you're currently in"
                                            },
                                            ...STUDY_YEARS
                                        ]}
                                        initialValue={'Select Year'}
                                        selectStyle={[
                                            {
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                margin: 0,
                                                padding: 0,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderRadius: 0
                                            },
                                            base.halfWidthWrapper
                                        ]}
                                        selectTextStyle={[
                                            {
                                                fontSize:
                                                    toConstantFontSize(2.5) > 18
                                                        ? 18
                                                        : toConstantFontSize(2.5),
                                                ...FontFactory({ family: 'Nunito' })
                                            },
                                            this.state.studyYear === ''
                                                ? { color: Colors.grey }
                                                : { color: Colors.textHighlightColor }
                                        ]}
                                        onChange={(item) =>
                                            this.setState({ studyYear: item.label })
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    width: toConstantWidth(80),
                                    marginVertical: 5
                                }}
                            >
                                <View>
                                    <Text style={[base.labelText, { alignSelf: 'center' }]}>
                                        Smoke?
                                    </Text>
                                    <Switch
                                        onTintColor={Colors.grey}
                                        thumbTintColor={Colors.brandPrimaryColor}
                                        tintColor={Colors.grey}
                                        onValueChange={(val) => this.setState({ isSmoker: val })}
                                        value={this.state.isSmoker}
                                    />
                                </View>
                                <View>
                                    <Text style={[base.labelText, { alignSelf: 'center' }]}>
                                        Drink?
                                    </Text>
                                    <Switch
                                        onTintColor={Colors.grey}
                                        thumbTintColor={Colors.brandPrimaryColor}
                                        tintColor={Colors.grey}
                                        onValueChange={(val) => this.setState({ isDrinker: val })}
                                        value={this.state.isDrinker}
                                    />
                                </View>
                                <View>
                                    <Text style={[base.labelText, { alignSelf: 'center' }]}>
                                        Drugs?
                                    </Text>
                                    <Switch
                                        onTintColor={Colors.grey}
                                        thumbTintColor={Colors.brandPrimaryColor}
                                        tintColor={Colors.grey}
                                        onValueChange={(val) => this.setState({ isDruggie: val })}
                                        value={this.state.isDruggie}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={login.pageFooter}>
                        <TouchableRect
                            onPress={() =>
                                this.state.bio === ''
                                    ? alert('Please provide a bio.')
                                    : this.homeSwiper.scrollBy(1, true)
                            }
                            title={'Next'}
                            backgroundColor={
                                this.state.bio === '' ? Colors.grey : Colors.brandSecondaryColor
                            }
                            buttonStyle={base.buttonStyle}
                        />
                    </View>
                </View>

                {this.renderHouseOrProfileSetup()}
                {!this.state.isLookingForHouse && this.state.isCreatingHouse
                    ? this.renderHouseDetail()
                    : null}

                <View style={[login.page, { backgroundColor: Colors.brandPrimaryColor }]}>
                    <View style={[base.headingWrapper, { flex: 2 }]}>
                        {this.state.isCreatingHouse ? (
                            <View>
                                <Text style={login.congratsText}>Congrats!</Text>
                                <Text style={login.congratsSubtitleText}>
                                    Your unique House ID is
                                </Text>
                                <Text style={login.shortIDStyle}>{this.state.shortID}</Text>
                            </View>
                        ) : (
                            <View>
                                <Text style={login.congratsText}>Congrats!</Text>
                                <Text style={login.congratsSubtitleText}>
                                    You're ready to find your new Flatmates!
                                </Text>
                            </View>
                        )}
                    </View>

                    <View
                        style={[
                            login.mainContent,
                            {
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        ]}
                    >
                        <Image
                            source={OpenBox}
                            style={{ width: toConstantWidth(80), height: toConstantWidth(80) }}
                        />
                    </View>

                    <View style={[login.pageFooter, { justifyContent: 'flex-start' }]}>
                        <TouchableRect
                            title={'Continue'}
                            onPress={async () => {
                                TRACKER.trackTiming('SIGN_UP', moment().unix() - this.START_TIME, {
                                    name: 'SignUp',
                                    label: this.state.isCreatingHouse
                                        ? 'CreatingHouseFlow'
                                        : 'UserFlow'
                                });

                                let result = await fetch(
                                    'https://flatmates-auth.eu.auth0.com/oauth/token',
                                    {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            grant_type: 'client_credentials',
                                            client_id: 'kJyhKNP7jn6drUFIP4vWD98eTjsnJKQ6',
                                            client_secret:
                                                '18V1vcmTOJVDHt7OGm6WGfASCAcRTqruUsGTPjimmbqQwBBhyBKeGw58DvSQa2gd',
                                            audience: 'https://flatmates-auth.eu.auth0.com/api/v2/'
                                        })
                                    }
                                );

                                let json = await result.json();

                                let userDetails = await fetch(
                                    `https://flatmates-auth.eu.auth0.com/api/v2/users?q=user_id:${
                                        this.authId
                                    }&search_engine=v3`,
                                    { headers: { authorization: `Bearer ${json.access_token}` } }
                                ).then((res) => res.json());

                                if (userDetails[0].email_verified) {
                                    client.mutate({
                                        mutation: VERIFY_EMAIL_MUTATION,
                                        variables: {
                                            email: userDetails[0].email,
                                            email_verified: true
                                        }
                                    });
                                    this.props.navigation.navigate('Home', { isReadOnly: false });
                                } else {
                                    Alert.alert(
                                        'Verification Reminder',
                                        'Flatmates is build on the trust that all users are students and we can only do that if you verify your student email address. If you\'re a first year without an email address yet please email me at "joseph@fazzino.net"'
                                    );
                                    this.props.navigation.navigate('Feed', { isReadOnly: true });
                                }
                            }}
                            buttonStyle={base.buttonStyle}
                            backgroundColor={Colors.white}
                            textColor={Colors.brandPrimaryColor}
                        />
                    </View>
                </View>
            </Swiper>
        );
    }

    renderHouseOrProfileSetup = () => {
        if (this.state.isLookingForHouse) {
            return (
                <View style={login.page}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            position: 'absolute',
                            top: toConstantHeight(3),
                            left: 10,
                            shadowColor: Colors.grey,
                            shadowOpacity: 0.7,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                        onPress={() => this.homeSwiper.scrollBy(-1)}
                    >
                        <Icon
                            style={{ fontSize: 45, color: Colors.brandPrimaryColor }}
                            name={'ios-arrow-dropleft-circle'}
                        />
                    </TouchableOpacity>
                    <View style={base.headingWrapper}>
                        <Text
                            style={[
                                base.headingText,
                                {
                                    fontSize:
                                        toConstantFontSize(2.5) > 18 ? 18 : toConstantFontSize(2.5),
                                    ...FontFactory({ weight: 'Bold' }),
                                    textAlign: 'center'
                                }
                            ]}
                        >
                            Enter your preferences
                            {'\n'}
                            for a house
                        </Text>
                    </View>
                    <View
                        style={[
                            login.mainContent,
                            { justifyContent: 'space-around', alignItems: 'center' }
                        ]}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={base.pickerLabelText}>Min Price</Text>
                                <FlatPicker
                                    items={[
                                        {
                                            section: false,
                                            label: "Minimum price you're willing to pay monthly"
                                        },
                                        { label: '£150' },
                                        { label: '£200' },
                                        { label: '£250' },
                                        { label: '£300' },
                                        { label: '£350' },
                                        { label: '£400' },
                                        { label: '£450' },
                                        { label: '£500' }
                                    ]}
                                    initialValue={this.state.minPrice}
                                    onChange={({ label }) =>
                                        this.setState({ minPrice: label.replace('£', '') })
                                    }
                                    selectStyle={[
                                        {
                                            borderWidth: 0,
                                            borderBottomWidth: 1,
                                            margin: 0,
                                            padding: 0,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            marginRight: 20,
                                            borderRadius: 0
                                        },
                                        base.halfWidthWrapper
                                    ]}
                                    selectTextStyle={[
                                        {
                                            fontSize:
                                                toConstantFontSize(2.5) > 18
                                                    ? 18
                                                    : toConstantFontSize(2.5),
                                            ...FontFactory({ family: 'Nunito' })
                                        },
                                        this.state.studyYear === ''
                                            ? { color: Colors.grey }
                                            : { color: Colors.textHighlightColor }
                                    ]}
                                />
                            </View>

                            <View>
                                <Text style={base.pickerLabelText}>Max Price</Text>
                                <FlatPicker
                                    items={[
                                        {
                                            section: false,
                                            label: "Maximum price you're willing to pay monthly"
                                        },
                                        { label: '£250' },
                                        { label: '£300' },
                                        { label: '£350' },
                                        { label: '£400' },
                                        { label: '£450' },
                                        { label: '£500' },
                                        { label: '£550' },
                                        { label: '£600' }
                                    ]}
                                    initialValue={this.state.maxPrice}
                                    onChange={({ label }) =>
                                        this.setState({ maxPrice: label.replace('£', '') })
                                    }
                                    selectStyle={[
                                        {
                                            borderWidth: 0,
                                            borderBottomWidth: 1,
                                            margin: 0,
                                            padding: 0,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            borderRadius: 0
                                        },
                                        base.halfWidthWrapper
                                    ]}
                                    selectTextStyle={[
                                        {
                                            fontSize:
                                                toConstantFontSize(2.5) > 18
                                                    ? 18
                                                    : toConstantFontSize(2.5),
                                            ...FontFactory({ family: 'Nunito' })
                                        },
                                        this.state.studyYear === ''
                                            ? { color: Colors.grey }
                                            : { color: Colors.textHighlightColor }
                                    ]}
                                />
                            </View>
                        </View>

                        <View>
                            <Text
                                style={[
                                    base.labelText,
                                    {
                                        alignSelf: 'center',
                                        marginBottom: 20,
                                        ...FontFactory({ weight: 'Bold' })
                                    }
                                ]}
                            >
                                Would you prefer to live with?
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 20 }}>
                                    <Text style={base.pickerLabelText}>Gender Preference</Text>
                                    <FlatPicker
                                        items={[
                                            {
                                                section: false,
                                                label:
                                                    'Select the gender you would prefer to live with'
                                            },
                                            { label: 'Male' },
                                            { label: 'Female' },
                                            { label: 'Non Binary' },
                                            { label: 'No Preference' }
                                        ]}
                                        initialValue={this.state.genderPreference}
                                        onChange={({ label }) =>
                                            this.setState({ genderPreference: label })
                                        }
                                        selectStyle={[
                                            {
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                margin: 0,
                                                padding: 0,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderRadius: 0
                                            },
                                            base.halfWidthWrapper
                                        ]}
                                        selectTextStyle={[
                                            {
                                                fontSize:
                                                    toConstantFontSize(2.5) > 18
                                                        ? 18
                                                        : toConstantFontSize(2.5),
                                                ...FontFactory({ family: 'Nunito' })
                                            },
                                            this.state.studyYear === ''
                                                ? { color: Colors.grey }
                                                : { color: Colors.textHighlightColor }
                                        ]}
                                    />
                                </View>
                                <View>
                                    <Text style={base.pickerLabelText}>People who drink</Text>
                                    <FlatPicker
                                        items={[
                                            {
                                                section: true,
                                                label:
                                                    'Would you prefer to live with people who drink?'
                                            },
                                            { label: 'Yes' },
                                            { label: 'No' },
                                            { label: 'No Preference' }
                                        ]}
                                        initialValue={'Select'}
                                        selectStyle={[
                                            {
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                margin: 0,
                                                padding: 0,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderRadius: 0
                                            },
                                            base.halfWidthWrapper
                                        ]}
                                        selectTextStyle={[
                                            {
                                                fontSize:
                                                    toConstantFontSize(2.5) > 18
                                                        ? 18
                                                        : toConstantFontSize(2.5),
                                                ...FontFactory({ family: 'Nunito' })
                                            },
                                            this.state.studyYear === ''
                                                ? { color: Colors.grey }
                                                : { color: Colors.textHighlightColor }
                                        ]}
                                        onChange={(item) =>
                                            this.setState({ drinkPreference: item.label })
                                        }
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 40 }}>
                                <View>
                                    <Text style={base.pickerLabelText}>Drug users</Text>
                                    <FlatPicker
                                        items={[
                                            {
                                                section: true,
                                                label: 'Would you prefer to live with drug users?'
                                            },
                                            { label: 'Yes' },
                                            { label: 'No' },
                                            { label: 'No Preference' }
                                        ]}
                                        initialValue={'Select'}
                                        selectStyle={[
                                            {
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                margin: 0,
                                                padding: 0,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderRadius: 0,
                                                marginRight: 20
                                            },
                                            base.halfWidthWrapper
                                        ]}
                                        selectTextStyle={[
                                            {
                                                fontSize:
                                                    toConstantFontSize(2.5) > 18
                                                        ? 18
                                                        : toConstantFontSize(2.5),
                                                ...FontFactory({ family: 'Nunito' })
                                            },
                                            this.state.studyYear === ''
                                                ? { color: Colors.grey }
                                                : { color: Colors.textHighlightColor }
                                        ]}
                                        onChange={(item) =>
                                            this.setState({ drugPreference: item.label })
                                        }
                                    />
                                </View>
                                <View>
                                    <Text style={base.pickerLabelText}>Smokers</Text>
                                    <FlatPicker
                                        items={[
                                            {
                                                section: true,
                                                label: 'Would you prefer to live with smokers?'
                                            },
                                            { label: 'Yes' },
                                            { label: 'No' },
                                            { label: 'No Preference' }
                                        ]}
                                        initialValue={'Select'}
                                        selectStyle={[
                                            {
                                                borderWidth: 0,
                                                borderBottomWidth: 1,
                                                margin: 0,
                                                padding: 0,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                borderRadius: 0
                                            },
                                            base.halfWidthWrapper
                                        ]}
                                        selectTextStyle={[
                                            {
                                                fontSize:
                                                    toConstantFontSize(2.5) > 18
                                                        ? 18
                                                        : toConstantFontSize(2.5),
                                                ...FontFactory({ family: 'Nunito' })
                                            },
                                            this.state.studyYear === ''
                                                ? { color: Colors.grey }
                                                : { color: Colors.textHighlightColor }
                                        ]}
                                        onChange={(item) =>
                                            this.setState({ smokerPreference: item.label })
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                        {/* location would be good with with defaulting to university location */}
                    </View>
                    <View style={login.pageFooter}>
                        <TouchableRect
                            title={'Confirm'}
                            backgroundColor={
                                Number(this.state.minPrice) === 0 ||
                                Number(this.state.maxPrice) === 0 ||
                                this.state.genderPreference === '' ||
                                this.state.drugPreference === '' ||
                                this.state.drinkPreference === '' ||
                                this.state.smokerPreference === ''
                                    ? Colors.grey
                                    : Colors.brandPrimaryColor
                            }
                            onPress={() => {
                                this.state.drugPreference === ''
                                    ? alert(
                                          'Please state whether you would prefer to live with/without flatmates who use drugs'
                                      )
                                    : this.state.drinkPreference === ''
                                        ? alert(
                                              'Please state whether you would prefer to live with/without flatmates who drink'
                                          )
                                        : this.state.smokerPreference === ''
                                            ? alert(
                                                  'Please state whether you would prefer to live with/without flatmates who use drugs'
                                              )
                                            : this.completeUserSetup();
                            }}
                            buttonStyle={base.buttonStyle}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={login.page}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            position: 'absolute',
                            top: toConstantHeight(3),
                            left: 10,
                            shadowColor: Colors.grey,
                            shadowOpacity: 0.7,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                        onPress={() => this.homeSwiper.scrollBy(-1)}
                    >
                        <Icon
                            style={{ fontSize: 45, color: Colors.brandPrimaryColor }}
                            name={'ios-arrow-dropleft-circle'}
                        />
                    </TouchableOpacity>
                    <View style={base.headingWrapper}>
                        <Text
                            style={[
                                base.headingText,
                                {
                                    textAlign: 'center',
                                    marginTop: 40,
                                    fontSize:
                                        toConstantFontSize(2.5) > 18 ? 18 : toConstantFontSize(2.5)
                                }
                            ]}
                        >
                            Enter your House ID or if you don't
                            {'\n'} have one press 'New House'
                        </Text>
                    </View>
                    <View style={login.mainContent}>
                        <TextInput
                            placeholder={'123456'}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                            maxLength={6}
                            onChangeText={(text) => this.setState({ shortID: text })}
                            style={login.houseIDInput}
                        />
                    </View>
                    <View style={login.pageFooter}>
                        {String(this.state.shortID).length !== 6 ? (
                            <TouchableRect
                                title={'New House'}
                                onPress={this.generateShortID}
                                backgroundColor={Colors.brandPrimaryColor}
                                buttonStyle={base.buttonStyle}
                            />
                        ) : (
                            <TouchableRect
                                title={'Confirm'}
                                onPress={this.completeJoiningHouseSetup}
                                backgroundColor={Colors.brandPrimaryColor}
                                buttonStyle={base.buttonStyle}
                            />
                        )}
                    </View>
                </View>
            );
        }
    };

    renderHouseDetail = () => {
        return (
            <View style={login.page}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        position: 'absolute',
                        top: toConstantHeight(3),
                        left: 10,
                        shadowColor: Colors.grey,
                        shadowOpacity: 0.7,
                        shadowRadius: 4,
                        elevation: 2
                    }}
                    onPress={() => this.homeSwiper.scrollBy(-1)}
                >
                    <Icon
                        style={{ fontSize: 45, color: Colors.brandPrimaryColor }}
                        name={'ios-arrow-dropleft-circle'}
                    />
                </TouchableOpacity>
                <View style={base.headingWrapper}>
                    <Text style={[base.headingText, { fontSize: 20 }]}>
                        Enter your house details
                    </Text>
                </View>
                <View
                    style={[
                        login.mainContent,
                        { justifyContent: 'space-between', alignItems: 'center', flex: 4 }
                    ]}
                >
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={base.labelText}>Road Name</Text>
                        <TextInput
                            placeholder={'Fake Street'}
                            onChangeText={(text) => this.setState({ road: text })}
                            autoCorrect={false}
                            spellCheck={false}
                            underlineColorAndroid={Colors.grey}
                            style={base.fullWidthInput}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 20 }}>
                            <Text style={base.labelText}>Rent Per Month (£)</Text>
                            <TextInput
                                placeholder={'Enter rent price'}
                                keyboardType={'numeric'}
                                onChangeText={(text) => this.setState({ rentPrice: text })}
                                underlineColorAndroid={Colors.grey}
                                style={base.halfWidthInput}
                            />
                        </View>
                        <View>
                            <Text style={base.labelText}>Bills Per Month (£)</Text>
                            <TextInput
                                placeholder={'Enter bills price'}
                                keyboardType={'numeric'}
                                onChangeText={(text) => this.setState({ billsPrice: text })}
                                underlineColorAndroid={Colors.grey}
                                style={base.halfWidthInput}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 20 }}>
                            <Text style={base.pickerLabelText}>Rent Due Date</Text>
                            <TouchableOpacity
                                onPress={() => this.selectRentDueDate()}
                                style={base.halfWidthWrapper}
                            >
                                <Text
                                    style={{
                                        fontSize:
                                            toConstantFontSize(2.5) > 18
                                                ? 18
                                                : toConstantFontSize(2.5),
                                        ...FontFactory({ family: 'Nunito' }),
                                        color: Colors.brandPrimaryColor
                                    }}
                                >
                                    {this.state.rentDue === ''
                                        ? 'Select next rent date'
                                        : moment(this.state.rentDue).format('Do') + ' every month'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={base.pickerLabelText}>Bills Due Date</Text>
                            <TouchableOpacity
                                onPress={() => this.selectBillsDueDate()}
                                style={base.halfWidthWrapper}
                            >
                                <Text
                                    style={{
                                        fontSize:
                                            toConstantFontSize(2.5) > 18
                                                ? 18
                                                : toConstantFontSize(2.5),
                                        ...FontFactory({ family: 'Nunito' }),
                                        color: Colors.brandPrimaryColor
                                    }}
                                >
                                    {this.state.billsDue === ''
                                        ? 'Select next bills date'
                                        : moment(this.state.billsDue).format('Do') + ' every month'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={base.labelText}>Available Rooms</Text>
                        <TextInput
                            placeholder={'How many free rooms are there?'}
                            onChangeText={(text) => this.setState({ spaces: text })}
                            keyboardType={'numeric'}
                            underlineColorAndroid={Colors.grey}
                            style={base.fullWidthInput}
                        />
                    </View>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text style={base.pickerLabelText}>Images</Text>
                        {/* Probably want to make this a horizontal scroll view in the future */}
                        <ScrollView
                            style={{
                                flexDirection: 'row',
                                width: toConstantWidth(80),
                                marginTop: Platform.OS === 'android' ? 13.1 : 0,
                                maxHeight: 80
                            }}
                            horizontal={true}
                        >
                            {this.state.tempImages.map((image, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={{ marginRight: 4 }}
                                            onPress={() =>
                                                this.setState({
                                                    removeImageToggle: !this.state.removeImageToggle
                                                })
                                            }
                                        >
                                            <Image
                                                source={{ uri: image.path }}
                                                style={{ width: 70, height: 70 }}
                                            />
                                        </TouchableOpacity>
                                        {this.state.removeImageToggle ? (
                                            <TouchableOpacity
                                                style={{ position: 'absolute', right: 4, top: 0 }}
                                                onPress={() => this.removeImage(index)}
                                            >
                                                <Icon
                                                    name={'ios-remove-circle'}
                                                    size={
                                                        toConstantFontSize(2.5) > 18
                                                            ? 18
                                                            : toConstantFontSize(2.5)
                                                    }
                                                    style={{ color: Colors.brandTertiaryColor }}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <React.Fragment />
                                        )}
                                    </View>
                                );
                            })}
                            <TouchableOpacity
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderWidth: 1,
                                    borderColor: Colors.brandPrimaryColor,
                                    borderStyle: 'dashed',
                                    borderRadius: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => this.selectImages()}
                            >
                                <Icon
                                    name={'ios-add'}
                                    size={toConstantFontSize(4)}
                                    style={{ color: Colors.brandPrimaryColor }}
                                />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>

                <View style={login.pageFooter}>
                    {this.state.tempImages.length === 0 ? (
                        <TouchableRect
                            title={'Upload Photos'}
                            iconName={'camera'}
                            backgroundColor={Colors.purple}
                            buttonStyle={base.buttonStyle}
                            onPress={() => {
                                Permissions.check('photo').then((res) => {
                                    if (res === 'authorized' || res === 'undetermined') {
                                        this.selectImages();
                                    } else {
                                        Alert.alert(
                                            'Can we access your photos?',
                                            "You must submit at least one photo if you're creating a house, if you're uncomfortable granting permissions then go into your settings after submitting a photo and revoke them.",
                                            [
                                                {
                                                    text: 'Still No',
                                                    onPress: () => console.log('Permission denied'),
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Open Settings',
                                                    onPress: () => Permissions.openSettings()
                                                }
                                            ]
                                        );
                                    }
                                });
                            }}
                        />
                    ) : !!this.state.road.match(/[0-9]\d*/g) ? (
                        alert("Please don't enter your house number")
                    ) : this.state.road &&
                    this.state.billsPrice &&
                    this.state.rentPrice &&
                    this.state.spaces ? (
                        <TouchableRect
                            title={'Confirm'}
                            backgroundColor={Colors.brandPrimaryColor}
                            onPress={() => this.uploadImages()}
                            buttonStyle={base.buttonStyle}
                        />
                    ) : (
                        <TouchableRect
                            title={'Confirm'}
                            backgroundColor={Colors.grey}
                            onPress={() =>
                                Alert.alert(
                                    'Error',
                                    'Please make sure you enter all of your house data.'
                                )
                            }
                        />
                    )}
                    {this.state.isRentDueDatePickerVisible ? (
                        <View style={login.pickerWrapper}>
                            <DatePickerIOS
                                mode={'date'}
                                date={this.state.rentDue as Date}
                                onDateChange={(newDate) =>
                                    this.setState({ rentDue: newDate }, () =>
                                        setTimeout(
                                            () =>
                                                this.setState({
                                                    isRentDueDatePickerVisible: false
                                                }),
                                            300
                                        )
                                    )
                                }
                            />
                        </View>
                    ) : (
                        <View />
                    )}
                    {this.state.isBillsDueDatePickerVisible ? (
                        <View style={login.pickerWrapper}>
                            <DatePickerIOS
                                mode={'date'}
                                date={this.state.billsDue as Date}
                                onDateChange={(newDate) =>
                                    this.setState({ billsDue: newDate }, () =>
                                        setTimeout(
                                            () =>
                                                this.setState({
                                                    isBillsDueDatePickerVisible: false
                                                }),
                                            300
                                        )
                                    )
                                }
                            />
                        </View>
                    ) : (
                        <View />
                    )}
                </View>
                {this.state.creatingDialogText !== '' && (
                    <View
                        style={{
                            position: 'absolute',
                            borderWidth: 1,
                            borderRadius: 3,
                            borderColor: Colors.white,
                            alignSelf: 'center',
                            width: toConstantWidth(80),
                            height: toConstantHeight(20),
                            backgroundColor: Colors.brandPrimaryColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <ActivityIndicator color={Colors.white} />
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 5,
                                color: Colors.white,
                                ...FontFactory({ weight: 'Bold' })
                            }}
                        >
                            {this.state.creatingDialogText}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    private selectBillsDueDate = async () => {
        if (Platform.OS === 'android') {
            try {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: new Date()
                });

                const isoMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
                const isoDay = day < 10 ? `0${day}` : day;

                if (action !== DatePickerAndroid.dismissedAction) {
                    const date = `${year}-${isoMonth}-${isoDay}`;
                    this.setState({ billsDue: date });
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker ', message);
            }
        } else {
            this.setState({ isBillsDueDatePickerVisible: true });
        }
    };

    private selectRentDueDate = async () => {
        if (Platform.OS === 'android') {
            try {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: new Date()
                });

                const isoMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
                const isoDay = day < 10 ? `0${day}` : day;

                if (action !== DatePickerAndroid.dismissedAction) {
                    const date = `${year}-${isoMonth}-${isoDay}`;
                    this.setState({ rentDue: date });
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker ', message);
            }
        } else {
            this.setState({ isRentDueDatePickerVisible: true });
        }
    };

    // Let the record show I have tested this works
    private generateShortID = async (): Promise<void> => {
        const shortID = Math.floor(100000 + 900000 * Math.random());

        const res = await Client.query({
            variables: { shortID },
            query: HOUSE_DETAILS_QUERY
        });

        if (res.data.House === null) {
            this.generateShortID();
        }

        this.setState({ shortID, isCreatingHouse: true }, () => this.homeSwiper.scrollBy(1, true));
    };

    private loginWithAuth0 = (): void => {
        this.setState({ isLoggingIn: true }, () => {
            auth0.webAuth
                .authorize({
                    scope: 'openid profile email offline_access',
                    audience: 'https://flatmates-auth.eu.auth0.com/userinfo'
                })
                .then((res) => this.doesUserExist(res.idToken))
                .catch((error) =>
                    this.setState({ isLoggingIn: false }, () => {
                        if (error.json) {
                            Alert.alert(
                                `Login Error: ${error.json.error}`,
                                error.json.error === 'unauthorized'
                                    ? 'It looks like you may of tried to login with an email address other than @reading.ac.uk, @student.reading.ac.uk or @rusu.co.uk. If you made a mistake and used an invalid email address then please sign up again.'
                                    : error.json.error_description,
                                [
                                    {
                                        text: 'Email Support',
                                        onPress: () =>
                                            Linking.openURL(
                                                `mailto:joseph@fazzino.net?subject=I%20cannot%20%20login`
                                            )
                                    },
                                    {
                                        text: 'Cancel',
                                        style: 'cancel'
                                    }
                                ]
                            );
                        } else {
                            Alert.alert(`Login Error`, String(error), [
                                {
                                    text: 'Email Support',
                                    onPress: () =>
                                        Linking.openURL(
                                            `mailto:joseph@fazzino.net?subject=I%20cannot%20%20login`
                                        )
                                },
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                }
                            ]);
                        }
                    })
                );
        });
    };

    private doesUserExist = async (identityToken: string): Promise<void> => {
        try {
            const decodedJSON: {
                email: string;
                email_verified: boolean;
                sub: string;
            } = await fetch(`${DOMAIN}/verify`, {
                method: 'POST',
                body: JSON.stringify({ token: identityToken }),
                headers: { 'Content-Type': 'application/json' }
            }).then((res) => res.json());

            this.authId = decodedJSON.sub;

            const res = await client.query<UserLoginQuery>({
                query: USER_LOGIN_QUERY,
                variables: { email: decodedJSON.email },
                fetchPolicy: 'network-only'
            });

            const {
                data: { user }
            } = res;

            if (!!user) {
                OneSignal.sendTags({
                    user_id: user.id,
                    username: user.name,
                    house_id: user.house ? user.house.shortID : null
                });

                TRACKER.setUser(user.id);

                this.props.getUserData(user);

                if (decodedJSON.email_verified) {
                    if (!user.email_verified) {
                        client.mutate({
                            mutation: VERIFY_EMAIL_MUTATION,
                            variables: { email: decodedJSON.email, email_verified: true }
                        });
                    }
                    this.props.navigation.navigate('Home', { isReadOnly: false });
                } else {
                    Alert.alert(
                        'Verification Reminder',
                        'Flatmates is build on the trust that all users are students and we can only do that if you verify your student email address. If you\'re a first year without an email address yet please email me at "joseph@fazzino.net"'
                    );
                    this.props.navigation.navigate('Feed', { isReadOnly: true });
                }

                TRACKER.trackTiming('LOGIN', moment().unix() - this.START_TIME, { name: 'Login' });
            } else {
                this.email = decodedJSON.email;
                this.isVerifiedUser = decodedJSON.email_verified;
                this.setState({ isLoggingIn: false }, () => this.homeSwiper.scrollBy(1, true));
            }
        } catch (error) {
            Alert.alert('Network Error', error.message);
            this.setState({ isLoggingIn: false });
        }
    };

    private completeUserSetup = async (): Promise<void> => {
        if (this.state.tempProfilePic !== '') {
            await this.uploadProfilePicture();
        }

        const fullName = `${this.state.firstName} ${this.state.lastName}`;
        this.props.createUser({
            email: this.email,
            profilePicture: this.state.profilePicture,
            authId: this.authId,
            email_verified: this.isVerifiedUser,
            name: fullName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            age: Number(this.state.age),
            bio: this.state.bio,
            course: this.state.course,
            studyYear: this.state.studyYear,
            isSmoker: this.state.isSmoker,
            isDrinker: this.state.isDrinker,
            isDruggie: this.state.isDruggie,
            minPrice: Number(this.state.minPrice),
            maxPrice: Number(this.state.maxPrice),
            genderPreference: this.state.genderPreference,
            drugPreference: this.state.drugPreference,
            drinkPreference: this.state.drinkPreference,
            smokerPreference: this.state.smokerPreference
        });

        this.homeSwiper.scrollBy(2, true);
    };

    private completeHouseSetup = async () => {
        // for short id what should happen is should query all houses for their ids and then generate a number that isn't in the array
        const coords = await getCoordsFromAddress(this.state.road);
        if (coords === 'Error') {
            return;
        }

        this.setState({ creatingDialogText: 'Creating your account' });

        const fullName = `${this.state.firstName} ${this.state.lastName}`;
        await this.props.createUserWithHouse({
            email: this.email,
            profilePicture: this.state.profilePicture,
            authId: this.authId,
            email_verified: this.isVerifiedUser,
            name: fullName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            age: Number(this.state.age),
            bio: this.state.bio,
            course: this.state.course,
            studyYear: this.state.studyYear,
            isSmoker: this.state.isSmoker,
            isDrinker: this.state.isDrinker,
            isDruggie: this.state.isDruggie,
            shortID: this.state.shortID as number,
            road: this.state.road,
            coords: coords as Array<number>,
            rentPrice: Math.round(Number(this.state.rentPrice as string)),
            billsPrice: Math.round(Number(this.state.billsPrice as string)),
            spaces: Number(this.state.spaces as string),
            houseImages: this.state.houseImages,
            rentDue: String(this.state.rentDue),
            billsDue: String(this.state.billsDue)
        });

        this.setState({ creatingDialogText: '' });

        this.homeSwiper.scrollBy(1, true);
    };

    private completeJoiningHouseSetup = (): void => {
        Client.query({
            variables: { shortID: Number(this.state.shortID as string) },
            query: HOUSE_DETAILS_QUERY
        })
            .then((res: any) => {
                if (res.data.house !== null) {
                    Alert.alert(
                        'Confirmation',
                        'Are you sure you belong to the house on ' + res.data.house.road + '?',
                        [
                            {
                                text: 'Confirm',
                                onPress: (): void => {
                                    const fullName = `${this.state.firstName} ${
                                        this.state.lastName
                                    }`;

                                    if (this.state.tempProfilePic !== '') {
                                        this.uploadProfilePicture().then(() => {
                                            this.props.createUserJoinHouse({
                                                email: this.email,
                                                profilePicture: this.state.profilePicture,
                                                authId: this.authId,
                                                email_verified: this.isVerifiedUser,
                                                name: fullName,
                                                firstName: this.state.firstName,
                                                lastName: this.state.lastName,
                                                gender: this.state.gender,
                                                age: Number(this.state.age),
                                                bio: this.state.bio,
                                                course: this.state.course,
                                                studyYear: this.state.studyYear,
                                                isSmoker: this.state.isSmoker,
                                                isDrinker: this.state.isDrinker,
                                                isDruggie: this.state.isDruggie,
                                                houseId: this.state.shortID as number
                                            });
                                        });
                                    } else {
                                        this.props.createUserJoinHouse({
                                            email: this.email,
                                            profilePicture: this.state.profilePicture,
                                            authId: this.authId,
                                            email_verified: this.isVerifiedUser,
                                            name: fullName,
                                            firstName: this.state.firstName,
                                            lastName: this.state.lastName,
                                            gender: this.state.gender,
                                            age: Number(this.state.age),
                                            bio: this.state.bio,
                                            course: this.state.course,
                                            studyYear: this.state.studyYear,
                                            isSmoker: this.state.isSmoker,
                                            isDrinker: this.state.isDrinker,
                                            isDruggie: this.state.isDruggie,
                                            houseId: this.state.shortID as number
                                        });
                                    }

                                    this.homeSwiper.scrollBy(2, true);
                                }
                            },
                            { text: 'Cancel', style: 'cancel' }
                        ]
                    );
                } else {
                    alert('ID does not exist');
                }
            })
            .catch((error) => console.log(error));
    };

    private async selectProfilePicture(): Promise<void> {
        let image: Array<ImageType> | ImageType | void;

        image = await ImagePicker.openPicker({
            multiple: false,
            cropping: true,
            height: 500,
            width: 500,
            compressImageQuality: 1,
            cropperCircleOverlay: true,
            mediaType: 'photo',
            loadingLabelText: 'Processing photo...'
        }).catch(() => console.log('Image upload cancelled'));

        this.setState({ tempProfilePic: image });
    }

    private async uploadProfilePicture(): Promise<{} | void> {
        if (this.state.tempProfilePic) {
            return new Promise(async (resolve) => {
                const formData = new FormData();

                const lastIndex = this.state.tempProfilePic.path.lastIndexOf('/') + 1;

                const data = {
                    uri: this.state.tempProfilePic.path,
                    name: this.state.tempProfilePic.path.slice(lastIndex),
                    type: this.state.tempProfilePic.mime
                };

                // @ts-ignore
                formData.append('data', data);

                const options = {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                };

                try {
                    const response = await fetch(`${DOMAIN}/upload`, options);
                    if (response.ok) {
                        const json = await response.json();
                        await this.setState({ profilePicture: json.url });
                        resolve();
                    } else {
                        alert('Problem with fetch: ' + response.status);
                    }
                } catch (error) {
                    console.log(error);
                    alert('There was a problem uploading your profile picture');
                }
            });
        } else {
            alert('No profile pic selected');
        }

        return null;
    }

    private async selectImages(): Promise<void> {
        let images: Array<ImageType> | ImageType | void;

        images = await ImagePicker.openPicker({
            multiple: true,
            compressImageMaxHeight: 300,
            compressImageMaxWidth: 300,
            mediaType: 'photo',
            loadingLabelText: 'Processing photos...'
        }).catch(() => alert('Image Upload Cancelled'));

        images = this.state.tempImages.concat(images);
        this.setState({ tempImages: images });
    }

    private removeImage(index): void {
        const clone = this.state.tempImages;
        clone.splice(index, 1);
        this.setState({ tempImages: clone });
    }

    private async uploadImages(): Promise<void> {
        this.setState({ creatingDialogText: 'Uploading Profile Picture' });
        if (this.state.tempProfilePic !== '') {
            await this.uploadProfilePicture();
        }

        if (this.state.tempImages && this.state.tempImages.length > 0) {
            let imageUrls: Array<string> | void;

            imageUrls = await Promise.all(
                this.state.tempImages.map(async (image, index) => {
                    this.setState({
                        creatingDialogText: `Uploading house image ${index + 1}`
                    });

                    const formData = new FormData();

                    const lastIndex = image.path.lastIndexOf('/') + 1;

                    const data = {
                        uri: image.path,
                        name: image.path.slice(lastIndex),
                        type: image.mime
                    };

                    // @ts-ignore
                    formData.append('data', data);

                    const options = {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    };

                    const response = await fetch(`${DOMAIN}/upload`, options);
                    if (response.ok) {
                        const json = await response.json();
                        return json.url;
                    } else {
                        alert('Problem with fetch: ' + response.status);
                    }
                })
            ).catch((error) => console.log(error));

            imageUrls && this.setState({ houseImages: imageUrls }, this.completeHouseSetup);
        }
    }
}

const mapStateToProps = (state: ReduxState) => ({
    login: state.login,
    profile: state.profile
});

const bindActions = (dispatch) => {
    return {
        createUser: (user) => dispatch(createUser(user)),
        createUserWithHouse: (mutationVars) => dispatch(createUserWithHouse(mutationVars)),
        createUserJoinHouse: (mutationVars) => dispatch(createUserJoinHouse(mutationVars)),
        getUserData: (user) => dispatch(getUserData(user))
    };
};

export default connect(
    mapStateToProps,
    bindActions
)(Login);
