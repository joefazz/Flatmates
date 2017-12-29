import React from 'react';
import { View, Text, Animated, FlatList, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import Interactable from 'react-native-interactable';

import { PreferenceRow } from '../../widgets';
import { base, profile } from '../../styles';
import { Metrics } from '../../consts';
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
        console.log(this.props.profile.toJS());
        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>
                <Animated.View style={[ profile.headerPanel, {
                    height: this._deltaY.interpolate({
                        inputRange: [-130, -50],
                        outputRange: [20, 100],
                        extrapolateRight: 'clamp'
                    })
                }]}>
                    <Animated.View style={[ profile.headerTextWrapper, 
                    {
                        maxHeight: this._deltaY.interpolate({
                            inputRange: [-200, -20],
                            outputRange: [50, 200],
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        })
                    },
                    {
                        paddingTop: this._deltaY.interpolate({
                            inputRange: [-200, -20],
                            outputRange: [10, 20],
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        })
                    } ]}>
                        <Animated.Text style={[ profile.headerText, {
                            fontSize: this._deltaY.interpolate({
                                inputRange: [-200, -20],
                                outputRange: [26, 45],
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp'
                            })
                        }]}>
                            {this.props.profile.get('name')}
                        </Animated.Text>
                        <Animated.Text style={[ profile.aboutText, {fontSize: 24}, {
                            opacity: this._deltaY.interpolate({
                                inputRange: [-200, -20],
                                outputRange: [0, 1],
                                extrapolate: 'clamp',
                            })
                        }]}>
                            {this.props.profile.get('course')}
                        </Animated.Text>
                    </Animated.View>

                    <Animated.View style={[ profile.headerAvatar, {
                        opacity: this._deltaY.interpolate({
                            inputRange: [-200, -50],
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
                    snapPoints={[ {y: 0}, {y: -240} ]}
                    boundaries={{ top: -250 }}
                    style={ profile.contentWrapper }
                    animatedValueY={this._deltaY}>

                    {this.props.isLoading ? <ActivityIndicator /> :
                        <View>
                            <Text style={ profile.aboutLabel }>About</Text>
                            <Text style={ profile.aboutText }>{this.props.profile.get('bio')}</Text>
                            <View style={ profile.ageGenderWrapper }>
                                <View>
                                    <Text style={ profile.aboutLabel }>Age</Text>
                                    <Text style={ profile.aboutText }>{ConvertBirthdayToAge(this.props.profile.get('birthday'))}</Text>
                                </View>
                                <View>
                                    <Text style={ profile.aboutLabel }>Study Year</Text>
                                    <Text style={ profile.aboutText }>{this.props.profile.get('yearOfStudy')}</Text>
                                </View>
                                <View>
                                    <Text style={ profile.aboutLabel }>Gender</Text>
                                    <Text style={ profile.aboutText }>{this.props.profile.get('gender')}</Text>
                                </View>
                            </View>
                            <View style={ profile.preferencesWrapper }>
                                <Text style={ profile.aboutLabel }>Flatmate Preferences</Text>
                                <PreferenceRow label={'Gender'} value={this.props.profile.get('genderPreference')} />
                                <PreferenceRow label={'Smoking'} value={this.props.profile.get('smokingPreference')} />
                                <PreferenceRow label={'Study Year'} value={this.props.profile.get('studyYearPreference')} />
                            </View>
                        </View>
                    }

                </Interactable.View>
            </View>
        );
    }
}