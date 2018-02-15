import Mapbox from '@mapbox/react-native-mapbox-gl';
import moment from 'moment';
import * as React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Colors } from '../../consts';
import { feed } from '../../styles';
import { toConstantHeight, toConstantWidth } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';

// @ts-ignore
interface Props {
    house: {
        billsPrice: number,
        rentPrice: number,
        houseImages: Array<string>,
        road: string,
        spaces: number,
        users: Array<{imageUrl: string, firstName: string}>,
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
    zoomLevel: number
}

export class PostDetailComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            zoomLevel: 14
        }
    }

    renderFlatmateRow(user, index) {
        return (
            <TouchableOpacity key={index} onPress={() => console.log('UserPressed')} style={{ flexDirection: 'row' }}>
                <Avatar
                    medium={true}
                    source={{uri: user.imageUrl}}
                    rounded={true}
                    title={user.firstName}
                />
                <Text style={{ flex: 2 }}>{user.firstName}</Text>
                <Text style={{ flex: 2 }}>{user.course}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.props.isLoading) {
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
                <View style={{ height: toConstantHeight(50)}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{this.props.house.road}</Text>
                        <Text>Post Created: {moment(this.props.createdAt).utc().format('DD MMMM')} at {moment(this.props.createdAt).utc().format('HH:MM')}</Text>
                    </View>
                    <View>
                        <Text>Rent Price: £{this.props.house.rentPrice}</Text>
                        <Text>Bills Price: £{this.props.house.billsPrice}</Text>
                    </View>
                    <View>
                        <Text>{this.props.house.spaces} Spaces Available</Text>
                    </View>
                    <View>
                        <Text>Flatmates</Text>
                        {this.props.house.users.map((user, index) => this.renderFlatmateRow(user, index))}
                    </View>
                </View>
                <View style={{ height: toConstantHeight(30) }}>
                    <Mapbox.MapView
                        style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 20}}
                        zoomLevel={this.state.zoomLevel}
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: toConstantHeight(15) }}>
                    <TouchableRect
                        onPress={() => console.log('Bookmarked')}
                        iconName={'bookmark'}
                        backgroundColor={Colors.purple}
                        buttonStyle={{ width: toConstantWidth(40), height: toConstantHeight(8) }}
                    />
                    <TouchableRect
                        onPress={() => console.log('ReportPressed')}
                        iconName={'flag'}
                        backgroundColor={Colors.airbnbRed}
                        buttonStyle={{ width: toConstantWidth(40), height: toConstantHeight(8) }}
                    />
                </View>
                <View style={{ height: toConstantHeight(7.4) }}>
                    <TouchableRect
                        onPress={() => console.log('Chat join pressed')}
                        title={'Chat to House'}
                        iconName={'group'}
                        backgroundColor={Colors.brandSecondaryColor}
                        wrapperStyle={{ borderRadius: 0 }}
                        buttonStyle={{ width: toConstantWidth(100) }}
                    />
                </View>

            </ScrollView>
        );
    }
}