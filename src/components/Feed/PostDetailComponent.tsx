import Mapbox from '@mapbox/react-native-mapbox-gl';
// @ts-ignore
import moment from 'moment';
import * as React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Colors } from '../../consts';
import { FontFactory } from '../../consts/font';
import { feed } from '../../styles';
import { ProfileState } from '../../types/ReduxTypes';
import { House } from '../../types/Types';
import { toConstantFontSize, toConstantHeight, toConstantWidth } from '../../utils/PercentageConversion';
import { compareUsers } from '../../utils/UserComparison';
import { TouchableRect } from '../../widgets/TouchableRect';

interface Props {
    house: House;

    createdAt: string;
    lastSeen: string;

    description: string;
    title: string;

    navigation: {state: {
        params: {
            data: {
                id;
            }
        }
    }, push: (route: string, params: {fbUserId?: string, data?: object}) => void};
    id: string;
    isLoading: boolean;
    profile: ProfileState;
}

interface State {
    zoomLevel: number;
    isBookmarked: boolean;
    isLayoutCalculated: boolean;
    descriptionWrapperHeight: number;
}

export class PostDetailComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            zoomLevel: 14,
            isBookmarked: false,
            isLayoutCalculated: false,
            descriptionWrapperHeight: toConstantHeight(20)
        }
    }

    render() {
        if (this.props.isLoading && !this.props.house.users) {
            return <ActivityIndicator />
        }

        return (
            <>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: toConstantHeight(isIphoneX() ? 9.4 : 7.4) }}
                >
                    <Swiper
                        style={feed.detailImage}
                        buttonWrapperStyle={feed.swiperButtonWrapperStyle}
                        nextButton={<Text style={feed.leftRightButtonStyle}>›</Text>}
                        prevButton={<Text style={feed.leftRightButtonStyle}>‹</Text>}
                        showsButtons={true}
                        paginationStyle={{bottom: 0}}
                        activeDotColor={ Colors.brandSecondaryColor }
                        dotStyle={{ borderWidth: 1, borderColor: Colors.brandSecondaryColor, backgroundColor: Colors.transparent }}
                    >
                        {this.props.house.houseImages.map((image, index) => {
                            return (
                                <Image style={ feed.detailImage } source={{uri: image}} key={index} />
                            );
                        })}
                    </Swiper>
                    <View style={[ feed.detailContentWrapper ]}>
                        <View style={ feed.roadDateWrapper }>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={ feed.roadText }>{this.props.house.road}</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Report Pressed')}>
                                    <Icon style={{fontSize: toConstantFontSize(3.5), color: Colors.airbnbRed}} name={'flag'} />
                                </TouchableOpacity>
                            </View>
                            <Text style={ feed.dateText }>
                                {this.props.lastSeen ?
                                    'Last Viewed: ' + moment(this.props.lastSeen).utc().format('DD MMMM') + ' at ' + moment(this.props.lastSeen).utc().format('HH:MM')
                                    :
                                    'Created On: ' + moment(this.props.createdAt).utc().format('DD MMM') + ' at ' + moment(this.props.createdAt).utc().format('HH:MM')}</Text>
                            <Text style={ feed.spacesText }>{this.props.house.spaces} Spaces Remaining</Text>
                        </View>
                        <View style={ feed.descriptionWrapper }>
                            <Text style={ feed.descriptionText }>{this.props.description}</Text>
                        </View>
                        <View style={ feed.priceWrapper }>
                            <View style={ feed.priceItem }>
                                <Text style={[ feed.priceText, {...FontFactory({ weight: 'SemiBold' })} ]}>Rent</Text>
                                <Text style={ feed.priceText }>£{this.props.house.rentPrice}</Text>
                            </View>
                            <View style={[ feed.priceItem, { borderLeftWidth: 0.7, borderLeftColor: Colors.white } ]}>
                                <Text style={[ feed.priceText, {...FontFactory({ weight: 'SemiBold' })} ]}>Bills</Text>
                                <Text style={ feed.priceText }>£{this.props.house.billsPrice}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: toConstantHeight(30) }}>
                        <Mapbox.MapView
                            style={{ flex: 2, justifyContent: 'center', paddingLeft: 20}}
                            zoomLevel={this.state.zoomLevel}
                            zoomEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            rotateEnabled={false}
                            onPress={() => this.props.navigation.push('MapView', { data: { coords: this.props.house.coords }})}
                            styleUrl={Mapbox.StyleURL.Street}
                            logoEnabled={false}
                            centerCoordinate={this.props.house.coords}
                        >
                            <Mapbox.PointAnnotation
                                id={'chosen'}
                                coordinate={this.props.house.coords}
                            />
                        </Mapbox.MapView>
                        <View style={{ position: 'absolute', top: toConstantHeight(7), left: toConstantWidth(7) }}>
                            <TouchableHighlight underlayColor={Colors.grey} style={feed.magnifierWrapper} onPress={() => this.setState({ zoomLevel: this.state.zoomLevel + 1 })}>
                                    <Icon name={'magnifier-add'} size={24} />
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={Colors.grey} style={feed.magnifierWrapper} onPress={() => this.setState({ zoomLevel: this.state.zoomLevel - 1 })}>
                                    <Icon name={'magnifier-remove'} size={24} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View>
                        <Text style={[ feed.userRow, feed.labelText ]}>Flatmates</Text>
                        {this.props.house.users.map((user, index) => this.renderFlatmateRow(user, index))}
                    </View>
                </ScrollView>
                <View style={{ height: toConstantHeight(isIphoneX() ? 9.4 : 7.4), position: 'absolute', bottom: 0 }}>
                    <TouchableRect
                        onPress={() => console.log('Chat join pressed')}
                        title={'Send Application'}
                        iconName={'bullhorn'}
                        backgroundColor={Colors.brandSecondaryColor}
                        wrapperStyle={{ borderRadius: 0 }}
                        buttonStyle={{ width: toConstantWidth(100), paddingBottom: isIphoneX() ? 18 : 0, height: toConstantHeight(isIphoneX() ? 9.4 : 7.4) }}
                    />
                </View>
            </ >
        );
    }

    private renderFlatmateRow(user, index) {
        return (
            <RectButton key={index} underlayColor={Colors.grey} onPress={() => this.props.navigation.push('UserProfile', { fbUserId: user.facebookUserId, data: user })} style={ feed.userRow }>
                <View style={ feed.avatarWrapper }>
                    <Avatar
                        medium={true}
                        source={{uri: user.imageUrl}}
                        rounded={true}
                        title={user.firstName}
                    />
                </View>
                <View style={ feed.userDetailsWrapper }>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={ feed.userNameText }>{user.name}</Text>
                        <Text style={ feed.userNameText }>{compareUsers(this.props.profile.toJS(), user)}% Match</Text>
                    </View>
                    <Text style={ feed.userInfoText }>{user.studyYear} student studying {user.course}</Text>
                </View>
            </RectButton>
        )
    }
}