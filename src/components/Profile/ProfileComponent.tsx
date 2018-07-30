import React from 'react';
import { Text, View, TextInput, Modal, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import { profile } from '../../styles';
import { User } from '../../types/Entities';
import { StatRow } from '../../widgets/StatRow';
import { Colors } from '../../consts';
import { toConstantWidth } from '../../utils/PercentageConversion';
import { EditableStatRow } from '../../widgets/EditableStatRow';
import { UpdateUserMutationVariables, UpdateUserMutation } from '../../graphql/Types';
import { FlatPicker } from '../../widgets/FlatPicker';
import { STUDY_YEARS, GENDERS } from '../../consts/strings';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker'
import { DOMAIN } from '../../consts/endpoint';
import { TouchableRect } from '../../widgets/TouchableRect';

interface Props {
    profile: User;
    isLoading: boolean;
    navigation: { navigate: (route: string) => void }
    contentEditable: boolean;
    updateUser: (params: UpdateUserMutationVariables & { tempProfilePicture: string }) => UpdateUserMutation;
}

interface State {
    isAvatarModalVisible: boolean;
    newName: string;
    tempProfilePic: ImageType | ImageType[];
    profilePicture: string;
}

export class ProfileComponent extends React.Component<Props, State> {
    state = {
        isAvatarModalVisible: false,
        newName: '',
        tempProfilePic: null,
        profilePicture: ''
    };

    isNameDirty: boolean = false;
    isProfilePictureDirty: boolean = false;
    isCourseDirty: boolean = false;
    isBioDirty: boolean = false;
    isAgeDirty: boolean = false;
    isGenderDirty: boolean = false;
    isYearDirty: boolean = false;
    isSmokerDirty: boolean = false;
    isDrugsDirty: boolean = false;
    isDrinkDirty: boolean = false;

    newName: string;
    newCourse: string;
    newBio: string;
    newAge: number;
    newGender: string;
    newYear: string;
    newSmoke: boolean;
    newDrug: boolean;
    newDrink: boolean;

    renderPreference = ({ item }) => {
        return (
            <View style={profile.preference}>
                <Text>{item.name}</Text>
                <Text>{item.option}</Text>
            </View>
        );
    };

    async componentDidUpdate(prevProps: Props) {
        if (prevProps.contentEditable && !this.props.contentEditable) {
            // @ts-ignore
            var params: UpdateUserMutationVariables & { tempProfilePicture: string } = { id: this.props.profile.id };

            if (this.isNameDirty) {
                params.name = this.newName;
                let names = this.newName.split(' ');
                params.firstName = names[0].trim();
                params.lastName = names[1].trim();
            }


            if (this.isProfilePictureDirty) {
                params.tempProfilePicture = this.state.tempProfilePic.path;
                await this.uploadProfilePicture();
                params.profilePicture = this.state.profilePicture;
            }

            if (this.isCourseDirty) {
                params.course = this.newCourse;
            }

            if (this.isBioDirty) {
                params.bio = this.newBio;
            }

            if (this.isAgeDirty) {
                params.age = this.newAge;
            }

            if (this.isGenderDirty) {
                params.gender = this.newGender;
            }

            if (this.isYearDirty) {
                params.studyYear = this.newYear;
            }

            if (this.isSmokerDirty) {
                params.isSmoker = this.newSmoke;
            }

            if (this.isDrugsDirty) {
                params.isDruggie = this.newDrug;
            }

            if (this.isDrinkDirty) {
                params.isDrinker = this.newDrink;
            }

            if (Object.keys(params).length > 1) {
                this.props.updateUser(params);
            }

            this.isNameDirty = false;
            this.isProfilePictureDirty = false;
            this.isCourseDirty = false;
            this.isBioDirty = false;
            this.isAgeDirty = false;
            this.isGenderDirty = false;
            this.isYearDirty = false;
            this.isSmokerDirty = false;
            this.isDrugsDirty = false;
            this.isDrinkDirty = false;
            this.setState({ tempProfilePic: null })
        }
    }

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

        if (image) {
            this.isProfilePictureDirty = true;
            this.setState({ tempProfilePic: image });
        }
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

    render() {
        const { profile: data } = this.props;

        if (this.props.contentEditable) {
            return (
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between' }}>
                    <View>
                        <View style={profile.summaryWrapper}>
                            <View style={profile.headerAvatar}>
                                {this.state.tempProfilePic ? (
                                    <Avatar
                                        avatarStyle={{
                                            width: toConstantWidth(32),
                                            height: toConstantWidth(32),
                                            borderRadius: toConstantWidth(32) / 2,
                                            backgroundColor: Colors.transparent
                                        }}
                                        overlayContainerStyle={{ borderRadius: toConstantWidth(32) / 2 }}
                                        containerStyle={{
                                            width: toConstantWidth(32),
                                            height: toConstantWidth(32),
                                            borderRadius: toConstantWidth(32) / 2,
                                            backgroundColor: Colors.transparent
                                        }}
                                        source={{ uri: this.state.tempProfilePic.path }}
                                        onPress={() => this.selectProfilePicture()}
                                        activeOpacity={0.7}
                                        rounded={true}
                                    />
                                ) : (
                                        <Avatar
                                            avatarStyle={{
                                                width: toConstantWidth(32),
                                                height: toConstantWidth(32),
                                                borderRadius: toConstantWidth(32) / 2,
                                                backgroundColor: Colors.transparent
                                            }}
                                            overlayContainerStyle={{ borderRadius: toConstantWidth(32) / 2 }}
                                            containerStyle={{
                                                width: toConstantWidth(32),
                                                height: toConstantWidth(32),
                                                borderRadius: toConstantWidth(32) / 2,
                                                backgroundColor: Colors.transparent
                                            }}
                                            source={{ uri: data.profilePicture }}
                                            onPress={() => this.selectProfilePicture()}
                                            activeOpacity={0.7}
                                            rounded={true}
                                        />
                                    )}
                            </View>
                            <View style={profile.summaryDescriptionWrapper}>
                                <TextInput
                                    style={profile.headerText}
                                    defaultValue={data.name}
                                    underlineColorAndroid={Colors.transparent}
                                    onChangeText={(text) => {
                                        this.isNameDirty = text !== data.name
                                        this.newName = text;
                                    }}
                                />
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
                                        { label: 'Philosophy' },
                                        { label: 'Physics' },
                                        { label: 'Politics' },
                                        { label: 'Veterinary Medicine' }
                                    ]}
                                    selectStyle={{ borderWidth: 0, padding: 0 }}
                                    selectTextStyle={profile.summaryDescription}
                                    onChange={(val) => {
                                        this.isCourseDirty = this.props.profile.course !== val.lablel;
                                        this.newCourse = val.label;
                                    }}
                                    initialValue={data.course}
                                />
                                <TextInput
                                    style={profile.summaryDescription}
                                    defaultValue={data.bio}
                                    underlineColorAndroid={Colors.transparent}
                                    onChangeText={(text) => {
                                        this.isBioDirty = text !== data.bio;
                                        this.newBio = text;
                                    }}
                                />
                            </View>
                        </View>
                        <View style={profile.statWrapper}>
                            <View style={profile.preferencesWrapper}>
                                <EditableStatRow
                                    items={[
                                        { label: 'Age', value: data.age, inputType: 'number' },
                                        { label: 'Year', value: data.studyYear.replace(' Year', ''), inputType: 'multi', multiOptions: STUDY_YEARS },
                                        { label: 'Gender', value: data.gender, inputType: 'multi', multiOptions: GENDERS }
                                    ]}
                                    onEndEditing={(items: Array<{ value: string; label: string }>) =>
                                        items.map((item) => {
                                            switch (item.label) {
                                                case 'Age':
                                                    if (data.age !== Number(item.value)) {
                                                        this.isAgeDirty = true
                                                        this.newAge = Number(item.value);
                                                    }
                                                    break;
                                                case 'Year':
                                                    if (data.studyYear !== item.value) {
                                                        this.isYearDirty = true;
                                                        this.newYear = item.value;
                                                    }
                                                    break;
                                                case 'Gender':
                                                    if (data.gender !== item.value) {
                                                        this.isGenderDirty = true;
                                                        this.newGender = item.value;
                                                    }
                                                    break;
                                            }
                                        })
                                    }
                                />
                            </View>
                            <View style={profile.preferencesWrapper}>
                                <EditableStatRow
                                    items={[
                                        { label: 'Smoker', value: data.isSmoker, inputType: 'switch' },
                                        { label: 'Uses Drugs', value: data.isDruggie, inputType: 'switch' },
                                        { label: 'Drinker', value: data.isDrinker, inputType: 'switch' }
                                    ]}
                                    onEndEditing={(items: Array<{ value: string | boolean; label: string }>) =>
                                        items.map((item) => {
                                            switch (item.label) {
                                                case 'Smoker':
                                                    if (data.isSmoker !== Boolean(item.value)) {
                                                        this.isSmokerDirty = true;
                                                        this.newSmoke = Boolean(item.value);
                                                    }
                                                    break;
                                                case 'Uses Drugs':
                                                    if (data.isDruggie !== Boolean(item.value)) {
                                                        this.isDrugsDirty = true;
                                                        this.newDrug = Boolean(item.value);
                                                    }
                                                    break;
                                                case 'Drinker':
                                                    if (data.isDrinker !== Boolean(item.value)) {
                                                        this.isDrinkDirty = true;
                                                        this.newDrink = Boolean(item.value);
                                                    }
                                                    break;
                                            }
                                        })
                                    }
                                />
                            </View>
                        </View>
                    </View>
                    {this.props.navigation.state.params && <TouchableRect backgroundColor={Colors.brandTertiaryColor} onPress={() => AsyncStorage.clear().then(() => this.props.navigation.navigate('Login'))} title={'Sign Out'} buttonStyle={{ width: toConstantWidth(100) }} wrapperStyle={{ borderRadius: 0 }} />}

                </View>
            );
        }

        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between' }}>
                <Modal animationType={"slide"} visible={this.state.isAvatarModalVisible}>
                    <ImageViewer
                        imageUrls={[{ url: !!this.state.tempProfilePic ? this.state.tempProfilePic.path : data.profilePicture }]}
                        enableSwipeDown={true}
                        onSwipeDown={() => this.setState({ isAvatarModalVisible: false })}
                        saveToLocalByLongPress={true}
                    />
                </Modal>
                <View>
                    <View style={profile.summaryWrapper}>
                        <View style={profile.headerAvatar}>
                            {this.state.tempProfilePic ? (
                                <Avatar
                                    avatarStyle={{
                                        width: toConstantWidth(32),
                                        height: toConstantWidth(32),
                                        borderRadius: toConstantWidth(32) / 2,
                                        backgroundColor: Colors.transparent
                                    }}
                                    overlayContainerStyle={{ borderRadius: toConstantWidth(32) / 2 }}
                                    containerStyle={{
                                        width: toConstantWidth(32),
                                        height: toConstantWidth(32),
                                        borderRadius: toConstantWidth(32) / 2,
                                        backgroundColor: Colors.transparent
                                    }}
                                    source={{ uri: this.state.tempProfilePic.path }}
                                    onPress={() => this.setState({ isAvatarModalVisible: true })}
                                    activeOpacity={0.7}
                                    rounded={true}
                                />
                            ) : (
                                    <Avatar
                                        avatarStyle={{
                                            width: toConstantWidth(32),
                                            height: toConstantWidth(32),
                                            borderRadius: toConstantWidth(32) / 2,
                                            backgroundColor: Colors.transparent
                                        }}
                                        overlayContainerStyle={{ borderRadius: toConstantWidth(32) / 2 }}
                                        containerStyle={{
                                            width: toConstantWidth(32),
                                            height: toConstantWidth(32),
                                            borderRadius: toConstantWidth(32) / 2,
                                            backgroundColor: Colors.transparent
                                        }}
                                        source={{ uri: data.profilePicture }}
                                        onPress={() => this.setState({ isAvatarModalVisible: true })}
                                        activeOpacity={0.7}
                                        rounded={true}
                                    />
                                )}
                        </View>
                        <View style={profile.summaryDescriptionWrapper}>
                            <Text style={profile.headerText}>{data.name}</Text>
                            <Text style={profile.summaryDescription}>{data.course}</Text>
                            <Text style={profile.summaryDescription}>{data.bio}</Text>
                        </View>
                    </View>
                    <View style={profile.statWrapper}>
                        <View style={profile.preferencesWrapper}>
                            <StatRow
                                items={[
                                    { label: 'Age', value: data.age },
                                    { label: 'Year', value: data.studyYear.replace(' Year', '') },
                                    { label: 'Gender', value: data.gender }
                                ]}
                            />
                        </View>
                        <View style={profile.preferencesWrapper}>
                            <StatRow
                                items={[
                                    { label: 'Smoker', value: data.isSmoker ? 'Yes' : 'No' },
                                    { label: 'Uses Drugs', value: data.isDruggie ? 'Yes' : 'No' },
                                    { label: 'Drinker', value: data.isDrinker ? 'Yes' : 'No' }
                                ]}
                            />
                        </View>
                    </View>
                </View>
                {this.props.navigation && <TouchableRect backgroundColor={Colors.brandTertiaryColor} onPress={() => AsyncStorage.clear().then(() => this.props.navigation.navigate('Login'))} title={'Sign Out'} buttonStyle={{ width: toConstantWidth(100) }} wrapperStyle={{ borderRadius: 0 }} />}
            </View>
        );
    }
}

{
    /* <View style={profile.interactableWrapper}>
                    {this.props.isLoading ? (
                        <ActivityIndicator />
                    ) : (
//                 <View style={profile.contentWrapper}>
//                     <Text
//                         style={[
//                             profile.aboutText,
//                             { color: Colors.brandPrimaryColor }
//                         ]}
//                     >
//                         House Preferences
//                     </Text>
//                     <View style={profile.ageGenderWrapper}>
//                         <View>
//                             <Text style={profile.aboutLabel}>Minimum Price</Text>
//                             <Text style={profile.aboutText}>
//                                 £{data.minPrice}
//                             </Text>
//                         </View>
//                         <View>
//                             <Text style={profile.aboutLabel}>Maximum Price</Text>
//                             <Text style={profile.aboutText}>
//                                 £{data.maxPrice}
//                             </Text>
//                         </View>
//                     </View>
//                     <Text style={[profile.aboutLabel, { marginTop: 10 }]}>
//                         Preferred Gender
//                     </Text>
//                     <Text style={profile.aboutText}>
//                         {data.genderPreference}
//                     </Text>
//                     <Text style={[profile.aboutLabel, { marginTop: 10 }]}>
//                         Preferred Location
//                     </Text>
//                     <Mapbox.MapView
//                         styleURL={Mapbox.StyleURL.Street}
//                         zoomLevel={15}
//                         centerCoordinate={[11.256, 43.77]}
//                         style={{
//                             height: Metrics.screenHeight * 0.085,
//                             marginBottom: 10,
//                             borderRadius: 3,
//                             alignSelf: 'stretch'
//                         }}
//                     >
//                         <Mapbox.PointAnnotation
//                             key={'pointAnnotation'}
//                             id={'pointAnnotation'}
//                             coordinate={[11.256, 43.77]}
//                         />
//                     </Mapbox.MapView>
//                 </View>
//         </View>
//     )}
// </View> */
}
