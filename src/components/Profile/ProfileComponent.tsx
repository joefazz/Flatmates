import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import { profile } from '../../styles';
import { User } from '../../types/Entities';
import { StatRow } from '../../widgets/StatRow';
import { Colors } from '../../consts';

interface Props {
    profile: User;
    isLoading: boolean;
    contentEditable: boolean;
}

interface State {
    name: string;
    course: string;
    bio: string;
    age: number | string;
    studyYear: string;
    gender: string;
    isSmoker: boolean;
    isDruggie: boolean;
    isDrinker: boolean;
}

export class ProfileComponent extends React.Component<Props, State> {
    readonly state = { ...this.props.profile };

    renderPreference = ({ item }) => {
        return (
            <View style={profile.preference}>
                <Text>{item.name}</Text>
                <Text>{item.option}</Text>
            </View>
        );
    };

    render() {
        const { profile: data } = this.props;

        if (this.props.contentEditable) {
            return (
                <View style={{ flex: 1, alignItems: 'stretch' }}>
                    <View style={profile.summaryWrapper}>
                        <View style={profile.headerAvatar}>
                            <Avatar
                                rounded={true}
                                avatarStyle={{
                                    width: 110,
                                    height: 110,
                                    borderRadius: 55,
                                    backgroundColor: Colors.transparent
                                }}
                                overlayContainerStyle={{ borderRadius: 60 }}
                                containerStyle={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    backgroundColor: Colors.transparent
                                }}
                                source={{ uri: data.profilePicture }}
                            />
                        </View>
                        <View style={profile.summaryDescriptionWrapper}>
                            <TextInput
                                style={profile.headerText}
                                defaultValue={data.name}
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                            <TextInput
                                style={profile.summaryDescription}
                                defaultValue={data.course}
                                onChangeText={(text) => this.setState({ course: text })}
                            />
                            <TextInput
                                style={profile.summaryDescription}
                                defaultValue={data.bio}
                                onChangeText={(text) => this.setState({ bio: text })}
                            />
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
            );
        }

        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>
                <View style={profile.summaryWrapper}>
                    <View style={profile.headerAvatar}>
                        <Avatar
                            rounded={true}
                            avatarStyle={{
                                width: 110,
                                height: 110,
                                borderRadius: 55,
                                backgroundColor: Colors.transparent
                            }}
                            overlayContainerStyle={{ borderRadius: 60 }}
                            containerStyle={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: Colors.transparent
                            }}
                            source={{ uri: data.profilePicture }}
                        />
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
