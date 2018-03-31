import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import {
    Alert,
    Image,
    ImageBackground,
    ImageURISource,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import Box from '../../Assets/box.png';
import OpenBox from '../../Assets/Designs/Flatmates_Open_Box.png';
import { MapboxSDK } from '../App';
import Client from '../Client';
import { Colors, Font, Metrics } from '../consts';
import {
    UPDATE_USER_CREATE_HOUSE_MUTATION,
    UPDATE_USER_MUTATION,
    UPDATE_USER_UPDATE_HOUSE_MUTATION
} from '../graphql/mutations';
import { HOUSE_DETAILS_QUERY } from '../graphql/queries';
import { loginWithAuth0, completeHouseLogin } from '../redux/Routines';
import { base, login } from '../styles';
import { LoginStatus } from '../types/Entities';
import { LoginState, ProfileState, ReduxState } from '../types/ReduxTypes';
import { toConstantFontSize, toConstantWidth } from '../utils/PercentageConversion';
import { TouchableRect } from '../widgets/TouchableRect';
import { FlatPicker } from '../widgets/FlatPicker';
import { FontFactory } from '../consts/font';

interface Props {
    login: LoginState;
    profile: ProfileState;
    loginWithAuth0: () => void;
    completeHouseLogin: (houseID: number) => void;
    updateUser: (
        fbUserId: string,
        bio: string,
        course: string,
        studyYear: string,
        isSmoker: boolean,
        minPrice: number,
        maxPrice: number,
        genderPreference: string
    ) => void;
    updateUserCreateHouse: (
        fbUserId: string,
        bio: string,
        course: string,
        studyYear: string,
        isSmoker: boolean,
        shortID: number,
        road: string,
        coords: Array<number>,
        rentPrice: number,
        billsPrice: number,
        spaces: number,
        houseImages: Array<string>
    ) => void;
    updateUserUpdateHouse: (
        fbUserId: string,
        bio: string,
        course: string,
        studyYear: string,
        isSmoker: boolean,
        shortID: number
    ) => void;
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

    firstName: string;
    lastName: string;
    gender: string;
    age: number | string;
    profilePicture: string;
    isLookingForHouse: boolean;
    isCreatingHouse: boolean;

    bio: string;
    isSmoker: boolean;
    isDruggie: boolean;
    isDrinker: boolean;
    studyYear: string;
    course: string;
    minPrice: number;
    maxPrice: number;
    genderPreference: string;

    shortID: string | number;
    road: string;
    rentPrice: string | number;
    billsPrice: string | number;
    spaces: string | number;
    houseImages: Array<string>;
}

export class Login extends React.Component<Props, State> {
    homeSwiper: any;
    courseInput: any;
    lastNameInput: any;
    ageInput: any;

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
            age: '',
            profilePicture: '',
            gender: '',
            bio: '',
            isSmoker: false,
            isDruggie: false,
            isDrinker: false,
            course: '',
            studyYear: '',
            minPrice: 0,
            maxPrice: 0,
            genderPreference: '',

            shortID: 0 as number,
            road: '',
            rentPrice: 0,
            billsPrice: 0,
            spaces: 0,
            houseImages: [],

            isLookingForHouse: false,
            isCreatingHouse: false
        };
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('dark-content');
        }
    }

    componentWillReceiveProps(newProps) {
        if (
            newProps.login.loginStatus === LoginStatus.SUCCEED ||
            newProps.login.loginStatus === LoginStatus.FAILED
        ) {
            if (this.state.isLoggingIn && newProps.login.loginStatus === LoginStatus.SUCCEED) {
                this.setState({ isLoggingIn: false });
                if (newProps.login.isLoggedIn) {
                    this.setState({ isLoggedIn: true });
                }
            } else if (newProps.login.loginStatus === LoginStatus.FAILED) {
                this.setState({ isLoggedIn: false, hasLoginFailed: true });
            }
        }
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
                        <Image style={{ width: 250, height: 250 }} source={Box} />
                    </View>
                    <View style={login.pageFooter}>
                        <TouchableRect
                            title={'Get Started'}
                            onPress={() => this.homeSwiper.scrollBy(1, true)}
                            backgroundColor={Colors.brandPrimaryColor}
                            buttonStyle={base.buttonStyle}
                        />
                        <TouchableOpacity
                            testID={'LoginButton'}
                            onPress={() => alert('looking around')}
                        >
                            <Text style={[login.hyperlink, { marginTop: 10 }]}>
                                I just want to look around
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[login.page, { justifyContent: 'space-around' }]}>
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
                            Are you...
                        </Text>
                        <TouchableRect
                            title={'Looking for a House'}
                            onPress={() =>
                                this.setState({ isLookingForHouse: true }, (): void =>
                                    this.homeSwiper.scrollBy(1, true)
                                )
                            }
                            backgroundColor={Colors.brandPrimaryColor}
                            buttonStyle={base.buttonStyle}
                            wrapperStyle={{ marginBottom: 10 }}
                        />
                        <TouchableRect
                            title={'Looking for People'}
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

                <View style={login.page}>
                    <View style={base.headingWrapper}>
                        <Text
                            style={[
                                base.headingText,
                                {
                                    ...Font.FontFactory({ weight: 'Bold', family: 'Nunito' }),
                                    fontSize: 24
                                }
                            ]}
                        >
                            Basic Information
                        </Text>
                        <Text
                            style={[
                                base.headingText,
                                {
                                    fontSize: 16,
                                    ...Font.FontFactory({ weight: 'Light', family: 'Nunito' })
                                }
                            ]}
                        >
                            We store your information securely
                        </Text>
                    </View>
                    <View
                        style={[
                            login.mainContent,
                            { alignItems: 'center', justifyContent: 'flex-start' }
                        ]}
                    >
                        {this.state.tempProfilePic ? (
                            <Avatar
                                xlarge={true}
                                source={{ uri: this.state.tempProfilePic.path }}
                                onPress={() => this.selectProfilePicture()}
                                activeOpacity={0.7}
                                containerStyle={{ alignSelf: 'center' }}
                                rounded={true}
                            />
                        ) : (
                            <Avatar
                                xlarge={true}
                                icon={{ name: 'person' }}
                                onPress={() => this.selectProfilePicture()}
                                activeOpacity={0.7}
                                containerStyle={{ alignSelf: 'center' }}
                                rounded={true}
                            />
                        )}
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View
                                style={[
                                    login.marginTop,
                                    { flexDirection: 'row', alignSelf: 'flex-start' }
                                ]}
                            >
                                <View style={{ marginRight: 20 }}>
                                    <Text style={[base.labelText]}>First Name</Text>
                                    <TextInput
                                        placeholder={'Enter first name'}
                                        maxLength={60}
                                        autoCorrect={false}
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
                                        keyboardType={'numeric'}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.setState({ age: text })}
                                        underlineColorAndroid={Colors.grey}
                                        style={base.halfWidthInput}
                                    />
                                </View>
                                <View>
                                    <Text style={base.labelText}>Gender</Text>
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
                                                fontSize: 18,
                                                ...FontFactory({ family: 'Nunito' })
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
                                            { label: 'Male' },
                                            { label: 'Female' },
                                            { label: 'Non Binary' },
                                            { label: 'Other' }
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={login.pageFooter}>
                        <TouchableRect
                            onPress={() =>
                                this.state.gender === '' ||
                                this.state.firstName === '' ||
                                this.state.lastName === '' ||
                                !this.state.tempProfilePic ||
                                this.state.age === ''
                                    ? alert(
                                          'You need to enter your information correctly to proceed'
                                      )
                                    : this.uploadProfilePicture()
                            }
                            title={'Next'}
                            backgroundColor={
                                this.state.gender === '' ||
                                this.state.firstName === '' ||
                                this.state.lastName === '' ||
                                !this.state.tempProfilePic ||
                                this.state.age === ''
                                    ? Colors.grey
                                    : Colors.brandSecondaryColor
                            }
                            buttonStyle={base.buttonStyle}
                        />
                    </View>
                </View>

                <View style={login.page}>
                    <View style={base.headingWrapper}>
                        <Text
                            style={[
                                base.headingText,
                                {
                                    ...Font.FontFactory({ weight: 'Bold', family: 'Nunito' }),
                                    fontSize: 24
                                }
                            ]}
                        >
                            Profile Information
                        </Text>
                        <Text
                            style={[
                                base.headingText,
                                {
                                    textAlign: 'center',
                                    fontSize: 16,
                                    ...Font.FontFactory({ weight: 'Light', family: 'Nunito' })
                                }
                            ]}
                        >
                            This information helps us find the best Flatmates
                        </Text>
                    </View>
                    <View
                        style={[
                            login.mainContent,
                            {
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }
                        ]}
                    >
                        <View>
                            <View style={login.marginTop}>
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
                            <View style={login.marginTop}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 20 }}>
                                        <Text style={[base.labelText]}>General Course</Text>
                                        <FlatPicker
                                            items={[
                                                {
                                                    section: true,
                                                    label: 'General Subject Areas (from UCAS)'
                                                },
                                                { label: 'Administration' },
                                                { label: 'Area Studies' },
                                                { label: 'Arts' },
                                                { label: 'Biology' },
                                                { label: 'Business Studies' },
                                                { label: 'Computer Science' },
                                                { label: 'Economics' },
                                                { label: 'Educational Studies' },
                                                { label: 'Engineering' },
                                                { label: 'Health Studies' },
                                                { label: 'History' },
                                                { label: 'Languages' },
                                                { label: 'Law' },
                                                { label: 'Literature' },
                                                { label: 'Management' },
                                                { label: 'Mathematics' },
                                                { label: 'Medicine' },
                                                { label: 'Performing Arts' },
                                                { label: 'Philosophy' },
                                                { label: 'Physics' },
                                                { label: 'Politics' }
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
                                                    fontSize: 18,
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
                                        <Text style={base.labelText}>Study Year</Text>
                                        <FlatPicker
                                            items={[
                                                {
                                                    section: false,
                                                    label: "Select the year you're currently in"
                                                },
                                                { label: 'First Year' },
                                                { label: 'Second Year' },
                                                { label: 'Third Year' },
                                                { label: 'Masters' },
                                                { label: 'Placement Year' },
                                                { label: 'PHd' }
                                            ]}
                                            initialValue={'Select Study Year'}
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
                                                    fontSize: 18,
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
                            <View style={{ marginTop: 20 }}>
                                <Text
                                    style={[
                                        base.labelText,
                                        { alignSelf: 'center', textAlign: 'center' }
                                    ]}
                                >
                                    None of the following information is displayed publically, this
                                    is only for matching with other flatmates
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View>
                                        <Text style={[base.labelText, { alignSelf: 'center' }]}>
                                            Smoke?
                                        </Text>
                                        <Switch
                                            onTintColor={Colors.brandPrimaryColor}
                                            thumbTintColor={Colors.definetelyNotAirbnbRed}
                                            tintColor={Colors.grey}
                                            onValueChange={(val) =>
                                                this.setState({ isSmoker: val })
                                            }
                                            value={this.state.isSmoker}
                                        />
                                    </View>
                                    <View>
                                        <Text style={[base.labelText, { alignSelf: 'center' }]}>
                                            Drink?
                                        </Text>
                                        <Switch
                                            onTintColor={Colors.brandPrimaryColor}
                                            thumbTintColor={Colors.definetelyNotAirbnbRed}
                                            tintColor={Colors.grey}
                                            onValueChange={(val) =>
                                                this.setState({ isDrinker: val })
                                            }
                                            value={this.state.isDrinker}
                                        />
                                    </View>
                                    <View>
                                        <Text style={[base.labelText, { alignSelf: 'center' }]}>
                                            Drugs?
                                        </Text>
                                        <Switch
                                            onTintColor={Colors.brandPrimaryColor}
                                            thumbTintColor={Colors.definetelyNotAirbnbRed}
                                            tintColor={Colors.grey}
                                            onValueChange={(val) =>
                                                this.setState({ isDruggie: val })
                                            }
                                            value={this.state.isDruggie}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={login.pageFooter}>
                        <TouchableRect
                            onPress={() =>
                                this.state.studyYear === '' ||
                                this.state.course === '' ||
                                this.state.bio === ''
                                    ? alert(
                                          'You need to enter your information correctly to proceed'
                                      )
                                    : this.homeSwiper.scrollBy(1, true)
                            }
                            title={'Next'}
                            backgroundColor={
                                this.state.studyYear === '' ||
                                this.state.course === '' ||
                                this.state.bio === ''
                                    ? Colors.grey
                                    : Colors.brandSecondaryColor
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
                    <ImageBackground
                        source={OpenBox}
                        style={{
                            position: 'absolute',
                            left: Metrics.screenWidth * 0.03,
                            bottom: Metrics.screenHeight * 0.3,
                            width: 350,
                            height: 350
                        }}
                    />

                    {this.state.isCreatingHouse ? (
                        <View style={[login.mainContent, { marginBottom: 170, flex: 2 }]}>
                            <Text style={login.congratsText}>Congrats!</Text>
                            <Text style={login.congratsSubtitleText}>Your unique House ID is</Text>
                            <Text style={login.shortIDStyle}>{this.state.shortID}</Text>
                        </View>
                    ) : (
                        <View style={[login.mainContent, { marginBottom: 50, flex: 2 }]}>
                            <Text style={login.congratsText}>Congrats!</Text>
                            <Text style={login.congratsSubtitleText}>
                                You're ready to find your new Flatmates!
                            </Text>
                        </View>
                    )}

                    <View style={{ flex: this.state.isCreatingHouse ? 0.8 : 2 }} />

                    <View style={[login.pageFooter, { justifyContent: 'flex-start' }]}>
                        <Button
                            title={'Continue'}
                            onPress={() => this.props.navigation.navigate('Home')}
                            buttonStyle={[
                                base.buttonStyle,
                                { backgroundColor: Colors.backgroundWhite }
                            ]}
                            fontFamily={Font.FONT_FAMILY}
                            fontSize={20}
                            textStyle={{ color: Colors.brandPrimaryColor }}
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
                    <View style={base.headingWrapper}>
                        <Text style={base.headingText}>Enter your preferences for a house</Text>
                    </View>
                    <View style={[login.mainContent, { justifyContent: 'flex-start' }]}>
                        <View style={login.marginBottom}>
                            <Text style={base.labelText}>Minimum Price (incl. bills)</Text>
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
                                initialValue={'£300'}
                                onChange={({ label }) =>
                                    this.setState({ minPrice: label.replace('£', '') })
                                }
                                selectTextStyle={login.profileInput}
                                selectStyle={login.modalInput}
                            />
                        </View>

                        <View style={login.marginVertical}>
                            <Text style={base.labelText}>Maximum Price (incl. bills)</Text>
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
                                initialValue={'£500'}
                                onChange={({ label }) =>
                                    this.setState({ maxPrice: label.replace('£', '') })
                                }
                                selectTextStyle={login.profileInput}
                                selectStyle={login.modalInput}
                            />
                        </View>

                        <View style={login.marginTop}>
                            <Text style={base.labelText}>Gender Majority</Text>
                            <FlatPicker
                                items={[
                                    {
                                        section: false,
                                        label: 'Select the gender you would prefer to live with'
                                    },
                                    { label: 'Male' },
                                    { label: 'Female' },
                                    { label: 'LGBT' },
                                    { label: 'No Preference' }
                                ]}
                                initialValue={'No Preference'}
                                onChange={({ label }) => this.setState({ genderPreference: label })}
                                selectTextStyle={login.profileInput}
                                selectStyle={login.modalInput}
                            />
                        </View>
                        {/* location would be good with with defaulting to university location */}
                    </View>
                    <View style={login.pageFooter}>
                        <Button
                            title={'Confirm'}
                            fontFamily={Font.FONT_FAMILY}
                            fontSize={20}
                            onPress={this.completeUserSetup}
                            buttonStyle={base.buttonStyle}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={login.page}>
                    <View style={base.headingWrapper}>
                        <Text style={base.headingText}>
                            Enter your House ID or if you don't have one press 'Create House'
                        </Text>
                    </View>
                    <View style={login.mainContent}>
                        <TextInput
                            placeholder={'1234'}
                            keyboardType={'number-pad'}
                            underlineColorAndroid={'transparent'}
                            maxLength={4}
                            onChangeText={(text) => this.setState({ shortID: text })}
                            style={login.houseIDInput}
                        />
                    </View>
                    <View style={login.pageFooter}>
                        <Button
                            title={'Confirm'}
                            onPress={this.completeJoiningHouseSetup}
                            fontFamily={Font.FONT_FAMILY}
                            fontSize={20}
                            buttonStyle={[base.buttonStyle, { marginBottom: 10 }]}
                        />
                        <TouchableOpacity
                            onPress={() =>
                                this.setState({ isCreatingHouse: true }, this.generateShortID)
                            }
                        >
                            <Text style={login.hyperlink}>Create House</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    renderHouseDetail = () => {
        return (
            <View style={login.page}>
                <View style={base.headingWrapper}>
                    <Text style={[base.headingText, { fontSize: 20 }]}>
                        Enter your house details
                    </Text>
                </View>
                <View style={[login.mainContent, { justifyContent: 'flex-start', flex: 4 }]}>
                    <View style={[login.marginBottom, { alignSelf: 'center' }]}>
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

                    <View
                        style={[
                            login.marginVertical,
                            { flexDirection: 'row', alignSelf: 'center' }
                        ]}
                    >
                        <View style={{ marginRight: 30 }}>
                            <Text style={base.labelText}>Rent Per Month</Text>
                            <View style={login.priceInputWrapper}>
                                <Text
                                    style={[
                                        login.poundStyle,
                                        Number(this.state.rentPrice as string) > 0
                                            ? { color: Colors.textHighlightColor }
                                            : {}
                                    ]}
                                >
                                    £
                                </Text>
                                <TextInput
                                    placeholder={'430.00'}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => this.setState({ rentPrice: text })}
                                    underlineColorAndroid={Colors.transparent}
                                    style={base.halfWidthInput}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={base.labelText}>Bills Per Month</Text>
                            <View style={[login.priceInputWrapper]}>
                                <Text
                                    style={[
                                        login.poundStyle,
                                        Number(this.state.billsPrice as string) > 0
                                            ? { color: Colors.textHighlightColor }
                                            : {}
                                    ]}
                                >
                                    £
                                </Text>
                                <TextInput
                                    placeholder={'23.00'}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => this.setState({ billsPrice: text })}
                                    underlineColorAndroid={Colors.transparent}
                                    style={base.halfWidthInput}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[login.marginTop, { alignSelf: 'center' }]}>
                        <Text style={base.labelText}>Available Rooms</Text>
                        <TextInput
                            placeholder={'How many free rooms are there?'}
                            onChangeText={(text) => this.setState({ spaces: text })}
                            keyboardType={'numeric'}
                            underlineColorAndroid={Colors.grey}
                            style={base.fullWidthInput}
                        />
                    </View>
                    <View style={[login.marginTop, { alignSelf: 'flex-start' }]}>
                        {this.state.tempImages.length > 0 ? (
                            <Text style={base.labelText}>Images</Text>
                        ) : (
                            <React.Fragment />
                        )}
                        {/* Probably want to make this a horizontal scroll view in the future */}
                        <ScrollView
                            style={{ flexDirection: 'row', width: toConstantWidth(80) }}
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
                                                    size={toConstantFontSize(2.5)}
                                                    style={{ color: Colors.brandTertiaryColor }}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <React.Fragment />
                                        )}
                                    </View>
                                );
                            })}
                            {this.state.tempImages.length > 0 ? (
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
                            ) : (
                                <React.Fragment />
                            )}
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
                            onPress={() => this.selectImages()}
                        />
                    ) : (
                        <TouchableRect
                            title={'Confirm'}
                            backgroundColor={Colors.brandPrimaryColor}
                            onPress={() => this.uploadImages()}
                            buttonStyle={base.buttonStyle}
                        />
                    )}
                </View>
            </View>
        );
    };

    // Let the record show I have tested this works
    private generateShortID = function GenerateID(): void {
        const shortID = Math.floor(1000 + (10000 - 1000) * Math.random());

        try {
            Client.query({
                variables: { shortID },
                query: HOUSE_DETAILS_QUERY
            }).then((res: any) => (res.data.House === null ? null : new Error()));
        } catch (error) {
            GenerateID();
        }

        this.setState({ shortID }, () => this.homeSwiper.scrollBy(1, true));
    };

    private loginWithAuth0 = (): void => {
        this.setState({ isLoggingIn: true }, () => this.props.loginWithAuth0());
    };

    private async getCoordsFromAddress(road: string): Promise<string | Array<number>> {
        const address: string = road + ', Reading';
        let res: any;

        try {
            res = await MapboxSDK.geocodeForward(address, {
                country: 'gb',
                proximity: { latitude: 51.4412, longitude: -0.943 }
            });
        } catch (err) {
            alert(
                'There was a problem with the road name you entered, please check it and try again'
            );
            return 'Error';
        }

        if (res.status !== 200 || res.entity.features.length === 0) {
            alert(
                'There was a problem with the road name you entered, please check it and try again.'
            );
            return 'Error';
        } else {
            return res.entity.features[0].center;
        }
    }

    private completeUserSetup = (): void => {
        this.props.updateUser(
            this.state.fbUserId,
            this.state.bio,
            this.state.course,
            this.state.studyYear,
            this.state.isSmoker,
            Number(this.state.minPrice),
            Number(this.state.maxPrice),
            this.state.genderPreference
        );

        this.homeSwiper.scrollBy(2, true);
    };

    private completeNewHouseSetup = async () => {
        // for short id what should happen is should query all houses for their ids and then generate a number that isn't in the array
        const coords = await this.getCoordsFromAddress(this.state.road);
        if (coords === 'Error') {
            return;
        }

        this.props.updateUserCreateHouse(
            this.state.fbUserId,
            this.state.bio,
            this.state.course,
            this.state.studyYear,
            this.state.isSmoker,
            this.state.shortID as number,
            this.state.road,
            coords as Array<number>,
            Math.round(Number(this.state.rentPrice as string)),
            Math.round(Number(this.state.billsPrice as string)),
            Number(this.state.spaces as string),
            this.state.houseImages
        );

        this.homeSwiper.scrollBy(1, true);

        this.props.completeHouseLogin(this.state.shortID as number);
    };

    private completeJoiningHouseSetup = (): void => {
        Client.query({
            variables: { shortID: Number(this.state.shortID as string) },
            query: HOUSE_DETAILS_QUERY
        }).then((res: any) => {
            if (res.data.House !== null) {
                Alert.alert(
                    'Confirmation',
                    'Are you sure you belong to the house on ' + res.data.House.road + '?',
                    [
                        {
                            text: 'Confirm',
                            onPress: (): void => {
                                this.props.updateUserUpdateHouse(
                                    this.state.fbUserId,
                                    this.state.bio,
                                    this.state.course,
                                    this.state.studyYear,
                                    this.state.isSmoker,
                                    this.state.shortID as number
                                );

                                this.props.completeHouseLogin(this.state.shortID as number);

                                this.homeSwiper.scrollBy(2, true);
                            }
                        },
                        { text: 'Cancel', style: 'cancel' }
                    ]
                );
            } else {
                alert('ID does not exist');
            }
        });
    };

    private async selectProfilePicture(): Promise<void> {
        let image: Array<ImageType> | ImageType | void;

        image = await ImagePicker.openPicker({
            multiple: false,
            compressImageMaxHeight: 500,
            compressImageMaxWidth: 500,
            cropperCircleOverlay: true,
            cropping: true,
            mediaType: 'photo',
            loadingLabelText: 'Processing photo...'
        }).catch(() => alert('Image upload cancelled'));

        this.setState({ tempProfilePic: image });
    }

    private async uploadProfilePicture(): Promise<{} | void> {
        if (this.state.tempProfilePic) {
            return new Promise(async () => {
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
                    const response = await fetch(
                        Platform.OS === 'ios'
                            ? 'http://localhost:4000/upload'
                            : 'http://10.0.2.2:4000/upload',
                        options
                    );
                    if (response.ok) {
                        const json = await response.json();
                        this.setState({ profilePicture: json.url });
                        this.homeSwiper.scrollBy(1, true);
                    } else {
                        alert('Problem with fetch: ' + response.status);
                    }
                } catch (error) {
                    console.log(error)
                    alert('There was a problem uploading your profile picture');
                }
            });
        } else {
            alert('No profile pic selected');
        }
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
        if (this.state.tempImages && this.state.tempImages.length > 0) {
            let imageUrls: Array<string>;

            imageUrls = await Promise.all(
                this.state.tempImages.map(async (image) => {
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
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    };

                    const response = await fetch(
                        Platform.OS === 'ios'
                            ? 'http://localhost:4000/upload'
                            : 'http://10.0.2.2:4000/upload',
                        options
                    );
                    if (response.ok) {
                        const json = await response.json();
                        return json.url;
                    } else {
                        alert('Problem with fetch: ' + response.status);
                    }
                })
            );

            this.setState({ houseImages: imageUrls }, this.completeNewHouseSetup);
        }
    }
}

const updateUser = graphql(UPDATE_USER_MUTATION, {
    props: ({ mutate }) => ({
        updateUser: (
            facebookUserId,
            bio,
            course,
            studyYear,
            isSmoker,
            minPrice,
            maxPrice,
            genderPreference
        ) =>
            mutate({
                variables: {
                    facebookUserId,
                    bio,
                    course,
                    studyYear,
                    isSmoker,
                    minPrice,
                    maxPrice,
                    genderPreference
                }
            })
    })
});

const updateUserCreateHouse = graphql(UPDATE_USER_CREATE_HOUSE_MUTATION, {
    props: ({ mutate }) => ({
        updateUserCreateHouse: (
            facebookUserId,
            bio,
            course,
            studyYear,
            isSmoker,
            shortID,
            road,
            coords,
            rentPrice,
            billsPrice,
            spaces,
            houseImages
        ) =>
            mutate({
                variables: {
                    facebookUserId,
                    bio,
                    course,
                    studyYear,
                    isSmoker,
                    shortID,
                    road,
                    coords,
                    rentPrice,
                    billsPrice,
                    spaces,
                    houseImages
                }
            })
    })
});

const updateUserUpdateHouse = graphql(UPDATE_USER_UPDATE_HOUSE_MUTATION, {
    props: ({ mutate }) => ({
        updateUserUpdateHouse: (facebookUserId, bio, course, studyYear, isSmoker, shortID) =>
            mutate({
                variables: {
                    facebookUserId,
                    bio,
                    course,
                    studyYear,
                    isSmoker,
                    shortID
                }
            })
    })
});

const mapStateToProps = (state: ReduxState) => ({
    login: state.login,
    profile: state.profile
});

const bindActions = (dispatch) => {
    return {
        loginWithAuth0: () => dispatch(loginWithAuth0()),
        completeHouseLogin: (houseID: number) => dispatch(completeHouseLogin(houseID))
    };
};

export default compose(
    connect(mapStateToProps, bindActions),
    updateUser,
    updateUserCreateHouse,
    updateUserUpdateHouse
)(Login);
