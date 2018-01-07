import React from 'react';
import { View, Text, Animated, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import Interactable from 'react-native-interactable';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import { PreferenceRow } from '../../widgets';
import { base, profile } from '../../styles';
import { Metrics, Colors } from '../../consts';
import { ConvertBirthdayToAge } from '../../utils/BirthdayToAge';

export class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this._deltaY = new Animated.Value(0);
    }



    renderPreference = ({ item }) => {
        return (
            <View style={ profile.preference }>
                <Text>{item.name}</Text>
                <Text>{item.option}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>
                <Animated.View style={[ profile.headerPanel, {
                    height: this._deltaY.interpolate({
                        inputRange: [-Metrics.screenHeight * 0.11, Metrics.screenHeight * 0.17],
                        outputRange: [20, 100],
                        extrapolateRight: 'clamp'
                    })
                }]}>
                    <Animated.View style={[ profile.headerTextWrapper, 
                    {
                        maxHeight: this._deltaY.interpolate({
                            inputRange: [-Metrics.screenHeight * 0.11, Metrics.screenHeight * 0.17],
                            outputRange: [50, 180],
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        })
                    },
                    {
                        paddingTop: this._deltaY.interpolate({
                            inputRange: [-Metrics.screenHeight * 0.11, Metrics.screenHeight * 0.17],
                            outputRange: [Metrics.screenHeight * 0.009, Metrics.screenHeight * 0.01],
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        })
                    } ]}>
                        <Animated.Text style={[ profile.headerText, {
                            fontSize: this._deltaY.interpolate({
                                inputRange: [-Metrics.screenHeight * 0.11, Metrics.screenHeight * 0.17],
                                outputRange: [26, 45],
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp'
                            })
                        }]}>
                            {this.props.profile.get('name')}
                        </Animated.Text>
                        <Animated.Text style={[ profile.aboutText, {fontSize: 24}, {
                            opacity: this._deltaY.interpolate({
                                inputRange: [-Metrics.screenHeight * 0.11, Metrics.screenHeight * 0.17],
                                outputRange: [0, 1],
                                extrapolate: 'clamp',
                            })
                        }]}>
                            {this.props.profile.get('course')}
                        </Animated.Text>
                    </Animated.View>

                    <Animated.View style={[ profile.headerAvatar, {
                        opacity: this._deltaY.interpolate({
                            inputRange: [-Metrics.screenHeight * 0.11, Metrics.screenHeight * 0.17],
                            outputRange: [0, 1],
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        })
                    }]}>
                        <Avatar 
                            xlarge={true} 
                            rounded={true} 
                            source={{uri: this.props.profile.get('imageUrl')}} />
                    </Animated.View>
                </Animated.View>


                <Interactable.View
                    verticalOnly
                    snapPoints={[ {y: Metrics.screenHeight * 0.17}, {y: -Metrics.screenHeight * 0.11 } ]}
                    initialPosition={{ y: Metrics.screenHeight * 0.17 }}
                    animatedValueY={this._deltaY}>

                    {this.props.isLoading ? <ActivityIndicator /> :
                        <View>
                            <View style={ profile.contentWrapper }>
                                <Text style={ profile.aboutLabel }>About</Text>
                                <Text style={ profile.aboutText }>{this.props.profile.get('bio')}</Text>
                                <View style={ profile.ageGenderWrapper }>
                                    <View>
                                        <Text style={ profile.aboutLabel }>Age</Text>
                                        <Text style={ profile.aboutText }>{ConvertBirthdayToAge(this.props.profile.get('birthday'))}</Text>
                                    </View>
                                    <View>
                                        <Text style={ profile.aboutLabel }>Study Year</Text>
                                        <Text style={ profile.aboutText }>{this.props.profile.get('studyYear')}</Text>
                                    </View>
                                    <View>
                                        <Text style={ profile.aboutLabel }>Gender</Text>
                                        <Text style={ profile.aboutText }>{this.props.profile.get('gender')}</Text>
                                    </View>
                                </View>
                                <View style={ profile.preferencesWrapper }>
                                    <PreferenceRow label={'Smoker'} value={this.props.profile.get('isSmoker') ? 'Yes' : 'No'} />
                                    <PreferenceRow label={'Social Score'} value={this.props.profile.get('socialScore')} />
                                </View>
                            </View>

                            {this.props.profile.get('house') ? 
                                <View style={ profile.contentWrapper }>
                                    <Text style={ profile.aboutLabel }>Road Name</Text>
                                    <Text style={ profile.aboutText }>{this.props.profile.get('house').get('road')}</Text>
                                    <View style={ profile.ageGenderWrapper }>
                                        <View>
                                            <Text style={ profile.aboutLabel }>House ID</Text>
                                            <Text style={ profile.aboutText }>{this.props.profile.get('house').get('shortID')}</Text>
                                        </View>
                                        <View>
                                            <Text style={ profile.aboutLabel }>Free Spaces</Text>
                                            <Text style={ profile.aboutText }>{this.props.profile.get('house').get('spaces')}</Text>
                                        </View>
                                        <View>
                                            <Text style={ profile.aboutLabel }>Cost Per Month</Text>
                                            <Text style={ profile.aboutText }>£{this.props.profile.get('house').get('rentPrice') + this.props.profile.get('house').get('billsPrice')}</Text>
                                        </View>
                                    </View>
                                    <ScrollView contentContainerStyle={ profile.preferencesWrapper }>
                                        <Text style={ profile.aboutLabel }>Flatmates</Text>
                                        {this.props.profile.get('house').get('users').map(flatmate => {
                                            return <Text key={flatmate.get('name')} style={ profile.aboutText }>{flatmate.get('name')}</Text>
                                        })}
                                    </ScrollView>
                                </View> 
                            :
                                <View style={ profile.contentWrapper }>
                                    <Text style={[ profile.aboutText, {color: Colors.brandSecondaryColor} ]}>House Preferences</Text>
                                    <View style={ profile.ageGenderWrapper }>
                                        <View>
                                            <Text style={ profile.aboutLabel }>Minimum Price</Text>
                                            <Text style={ profile.aboutText }>£{this.props.profile.get('minPrice')}</Text>
                                        </View>
                                        <View>
                                            <Text style={ profile.aboutLabel }>Maximum Price</Text>
                                            <Text style={ profile.aboutText }>£{this.props.profile.get('maxPrice')}</Text>
                                        </View>
                                    </View>
                                    <Text style={[ profile.aboutLabel, { marginTop: 10 }] }>Preferred Gender</Text>
                                    <Text style={ profile.aboutText }>{this.props.profile.get('genderPreference')}</Text>
                                    <Text style={[ profile.aboutLabel, { marginTop: 10 }]}>Preferred Location</Text>
                                    <Mapbox.MapView 
                                        styleURL={Mapbox.StyleURL.Street}
                                        zoomLevel={15}
                                        centerCoordinate={[11.256, 43.770]}
                                        style={{ height: Metrics.screenHeight * 0.15, marginBottom: 10, borderRadius: 3, alignSelf: 'stretch' }}>
                                        <Mapbox.PointAnnotation
                                            key='pointAnnotation'
                                            id='pointAnnotation'
                                            coordinate={[11.256, 43.770]}>

                                        </Mapbox.PointAnnotation>
                                    </Mapbox.MapView>
                                </View>}
                        </View>
                    }

                </Interactable.View>
            </View>
        );
    }
}