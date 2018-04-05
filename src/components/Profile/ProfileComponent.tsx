import Mapbox from '@mapbox/react-native-mapbox-gl';
import * as React from 'react';
import { ActivityIndicator, Animated, ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Interactable from 'react-native-interactable';
import { Colors, Metrics } from '../../consts';
import { profile } from '../../styles';
import { Profile } from '../../types/State';
import _ from '../../utils/localdash';

interface Props {
    profile: Profile;
    isLoading: boolean;
}

export class ProfileComponent extends React.Component<Props> {
    _deltaY: Animated.Value;

    constructor(props) {
        super(props);
        this._deltaY = new Animated.Value(0);
    }

    renderPreference = ({ item }) => {
        return (
            <View style={profile.preference}>
                <Text>{item.name}</Text>
                <Text>{item.option}</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>
                <Animated.View
                    style={[
                        profile.headerPanel,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    Metrics.screenHeight * 0.08,
                                    Metrics.screenHeight * 0.3699
                                ],
                                outputRange: [20, 100],
                                extrapolateRight: 'clamp'
                            })
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            profile.headerTextWrapper,
                            {
                                maxHeight: this._deltaY.interpolate({
                                    inputRange: [
                                        Metrics.screenHeight * 0.08,
                                        Metrics.screenHeight * 0.3699
                                    ],
                                    outputRange: [50, 180],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                })
                            },
                            {
                                paddingTop: this._deltaY.interpolate({
                                    inputRange: [
                                        Metrics.screenHeight * 0.08,
                                        Metrics.screenHeight * 0.3699
                                    ],
                                    outputRange: [
                                        Metrics.screenHeight * 0.013,
                                        Metrics.screenHeight * 0.01
                                    ],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                })
                            }
                        ]}
                    >
                        <Animated.Text
                            style={[
                                profile.headerText,
                                {
                                    fontSize: this._deltaY.interpolate({
                                        inputRange: [
                                            Metrics.screenHeight * 0.08,
                                            Metrics.screenHeight * 0.3699
                                        ],
                                        outputRange: [26, 45],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }
                            ]}
                        >
                            {this.props.profile.name}
                        </Animated.Text>
                        <Animated.Text
                            style={[
                                profile.aboutText,
                                { fontSize: 24, paddingLeft: 10 },
                                {
                                    opacity: this._deltaY.interpolate({
                                        inputRange: [
                                            Metrics.screenHeight * 0.08,
                                            Metrics.screenHeight * 0.3699
                                        ],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp'
                                    })
                                }
                            ]}
                        >
                            {this.props.profile.course}
                        </Animated.Text>
                    </Animated.View>

                    <Animated.View
                        style={[
                            profile.headerAvatar,
                            {
                                opacity: this._deltaY.interpolate({
                                    inputRange: [
                                        Metrics.screenHeight * 0.08,
                                        Metrics.screenHeight * 0.3699
                                    ],
                                    outputRange: [0, 1],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                })
                            }
                        ]}
                    >
                        <Avatar
                            xlarge={true}
                            rounded={true}
                            source={{ uri: this.props.profile.profilePicture }}
                        />
                    </Animated.View>
                </Animated.View>

                <Interactable.View
                    verticalOnly={true}
                    snapPoints={[
                        { y: Metrics.screenHeight * 0.3699 },
                        { y: Metrics.screenHeight * 0.08 }
                    ]}
                    boundaries={{ top: Metrics.screenHeight * 0.062 }}
                    initialPosition={{ y: Metrics.screenHeight * 0.3699 }}
                    style={profile.interactableWrapper}
                    animatedValueY={this._deltaY}
                >
                    {this.props.isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <View>
                            <View style={profile.contentWrapper}>
                                <Text style={profile.aboutLabel}>About</Text>
                                <Text style={profile.aboutText}>{this.props.profile.bio}</Text>
                                <View style={profile.ageGenderWrapper}>
                                    <View>
                                        <Text style={profile.aboutLabel}>Age</Text>
                                        <Text style={profile.aboutText}>
                                            {this.props.profile.age}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={profile.aboutLabel}>Study Year</Text>
                                        <Text style={profile.aboutText}>
                                            {this.props.profile.studyYear}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={profile.aboutLabel}>Gender</Text>
                                        <Text style={profile.aboutText}>
                                            {_.capitalize(this.props.profile.gender)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={profile.preferencesWrapper}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={profile.aboutLabel}>Smoker?</Text>
                                        <Text style={profile.aboutText}>
                                            {this.props.profile.isSmoker ? 'Yes' : 'No'}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={profile.aboutLabel}>Drinks?</Text>
                                        <Text style={profile.aboutText}>
                                            {this.props.profile.isDrinker ? 'Yes' : 'No'}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={profile.aboutLabel}>Drugs?</Text>
                                        <Text style={profile.aboutText}>
                                            {this.props.profile.isDruggie ? 'Yes' : 'No'}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {this.props.profile.house ? (
                                <View style={profile.contentWrapper}>
                                    <Text style={profile.aboutLabel}>Road Name</Text>
                                    <Text style={profile.aboutText}>
                                        {this.props.profile.house.road}
                                    </Text>
                                    <View style={profile.ageGenderWrapper}>
                                        <View>
                                            <Text style={profile.aboutLabel}>House ID</Text>
                                            <Text style={profile.aboutText}>
                                                {this.props.profile.house.shortID}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={profile.aboutLabel}>Free Spaces</Text>
                                            <Text style={profile.aboutText}>
                                                {this.props.profile.house.spaces}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={profile.aboutLabel}>Cost Per Month</Text>
                                            <Text style={profile.aboutText}>
                                                £{this.props.profile.house.rentPrice +
                                                    this.props.profile.house.billsPrice}
                                            </Text>
                                        </View>
                                    </View>
                                    {this.props.profile.house.users.length > 1 ? (
                                        <ScrollView
                                            contentContainerStyle={profile.preferencesWrapper}
                                        >
                                            <Text style={profile.aboutLabel}>Flatmates</Text>
                                            {this.props.profile.house.users.map((flatmate) => {
                                                return (
                                                    <Text
                                                        key={flatmate.name}
                                                        style={profile.aboutText}
                                                    >
                                                        {flatmate.name}
                                                    </Text>
                                                );
                                            })}
                                        </ScrollView>
                                    ) : (
                                        <React.Fragment />
                                    )}
                                </View>
                            ) : (
                                <View style={profile.contentWrapper}>
                                    <Text
                                        style={[
                                            profile.aboutText,
                                            { color: Colors.brandPrimaryColor }
                                        ]}
                                    >
                                        House Preferences
                                    </Text>
                                    <View style={profile.ageGenderWrapper}>
                                        <View>
                                            <Text style={profile.aboutLabel}>Minimum Price</Text>
                                            <Text style={profile.aboutText}>
                                                £{this.props.profile.minPrice}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={profile.aboutLabel}>Maximum Price</Text>
                                            <Text style={profile.aboutText}>
                                                £{this.props.profile.maxPrice}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={[profile.aboutLabel, { marginTop: 10 }]}>
                                        Preferred Gender
                                    </Text>
                                    <Text style={profile.aboutText}>
                                        {this.props.profile.genderPreference}
                                    </Text>
                                    <Text style={[profile.aboutLabel, { marginTop: 10 }]}>
                                        Preferred Location
                                    </Text>
                                    <Mapbox.MapView
                                        styleURL={Mapbox.StyleURL.Street}
                                        zoomLevel={15}
                                        centerCoordinate={[11.256, 43.77]}
                                        style={{
                                            height: Metrics.screenHeight * 0.085,
                                            marginBottom: 10,
                                            borderRadius: 3,
                                            alignSelf: 'stretch'
                                        }}
                                    >
                                        <Mapbox.PointAnnotation
                                            key={'pointAnnotation'}
                                            id={'pointAnnotation'}
                                            coordinate={[11.256, 43.77]}
                                        />
                                    </Mapbox.MapView>
                                </View>
                            )}
                        </View>
                    )}
                </Interactable.View>
            </View>
        );
    }
}
