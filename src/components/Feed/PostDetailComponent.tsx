import Mapbox from '@mapbox/react-native-mapbox-gl';
// @ts-ignore
import moment from 'moment';
import * as React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Colors } from '../../consts';
import { feed } from '../../styles';
import { toConstantFontSize, toConstantHeight, toConstantWidth } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';

interface Props {
    house: {
        billsPrice: number,
        rentPrice: number,
        houseImages: Array<string>,
        road: string,
        spaces: number,
        users: Array<{imageUrl: string, name: string}>,
        coords: Array<number>
    };

    createdAt: number,

    description: string,
    title: string,

    navigation: {state: {
        params: {
            data: {
                id
            }
        }
    }, push: (route: string, params: {fbUserId?: string, data?: object}) => void};
    id: string,
    isLoading: boolean
}

interface State {
    zoomLevel: number,
    isBookmarked: boolean,
    isLayoutCalculated: boolean,
    descriptionWrapperHeight: number
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
        if (this.props.isLoading || this.props.house.users.length === 0) {
            return <ActivityIndicator />
        }

        return (
            <ScrollView>
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
                        <Text style={ feed.dateText }>Last Viewed: {moment(this.props.createdAt).utc().format('DD MMMM')} at {moment(this.props.createdAt).utc().format('HH:MM')}</Text>
                        <Text style={ feed.spacesText }>{this.props.house.spaces} Spaces Remaining</Text>
                    </View>
                    <View style={ feed.descriptionWrapper }>
                        <Text style={ feed.descriptionText }>{this.props.description}</Text>
                    </View>
                    <View style={ feed.priceWrapper }>
                        <Text style={ feed.priceText }>Rent: £{this.props.house.rentPrice} per month</Text>
                        <Text style={ feed.priceText }>Bills: £{this.props.house.billsPrice} per month</Text>
                    </View>
                </View>
                <View style={{ height: toConstantHeight(30) }}>
                    <Mapbox.MapView
                        style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 20}}
                        zoomLevel={this.state.zoomLevel}
                        zoomEnabled={false}
                        scrollEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        onPress={() => console.log('This will go to a full screen map page')}
                        styleUrl={Mapbox.StyleURL.Street}
                        logoEnabled={false}
                        centerCoordinate={this.props.house.coords}
                    >
                        <Mapbox.PointAnnotation
                            id={'chosen'}
                            coordinate={this.props.house.coords}
                        />
                        <TouchableHighlight underlayColor={Colors.grey} style={feed.magnifierWrapper} onPress={() => this.setState({ zoomLevel: this.state.zoomLevel + 1 })}>
                            <Icon name={'magnifier-add'} size={24} />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={Colors.grey} style={feed.magnifierWrapper} onPress={() => this.setState({ zoomLevel: this.state.zoomLevel - 1 })}>
                            <Icon name={'magnifier-remove'} size={24} />
                        </TouchableHighlight>
                    </Mapbox.MapView>
                </View>
                <View>
                    <Text style={[ feed.userRow, feed.labelText ]}>Flatmates</Text>
                    {this.props.house.users.map((user, index) => this.renderFlatmateRow(user, index))}
                </View>
                <View style={{ height: toConstantHeight(7.4) }}>
                    <TouchableRect
                        onPress={() => console.log('Chat join pressed')}
                        title={'Send Application'}
                        iconName={'bullhorn'}
                        backgroundColor={Colors.brandSecondaryColor}
                        wrapperStyle={{ borderRadius: 0 }}
                        buttonStyle={{ width: toConstantWidth(100) }}
                    />
                </View>

            </ScrollView>
        );
    }

    private renderFlatmateRow(user, index) {
        return (
            <RectButton key={index} underlayColor={Colors.grey} onPress={() => console.log('UserPressed')} style={ feed.userRow }>
                <View style={ feed.avatarWrapper }>
                    <Avatar
                        medium={true}
                        source={{uri: user.imageUrl}}
                        rounded={true}
                        title={user.firstName}
                    />
                </View>
                <View style={ feed.userDetailsWrapper }>
                    <Text style={ feed.userNameText }>{user.name}</Text>
                    <Text style={ feed.userInfoText }>Placement year student studying {user.course}</Text>
                </View>
            </RectButton>
        )
    }
}