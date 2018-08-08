import Mapbox from '@mapbox/react-native-mapbox-gl';
// @ts-ignore
import moment from 'moment';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Colors } from '../../consts';
import { FontFactory } from '../../consts/font';
import { feed } from '../../styles';
import { House } from '../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../utils/PercentageConversion';

interface Props {
    house: House;
    description: string;
    title: string;

    navigation: {
        push: (route: string, params: { id?: string; data?: object }) => void;
    };
    isLoading: boolean;
    // starPost: () => void;
}

const initialState = {
    zoomLevel: 14,
    descriptionWrapperHeight: toConstantHeight(20)
};

type State = Readonly<typeof initialState>;

export class HouseApplicationDetail extends React.Component<Props, State> {
    readonly state: State = initialState;

    render() {
        if (this.props.isLoading && !this.props.house.users) {
            return <ActivityIndicator />;
        }

        return (
            <>
                <ScrollView>
                    <Swiper
                        style={feed.detailImage}
                        buttonWrapperStyle={feed.swiperButtonWrapperStyle}
                        nextButton={<Text style={feed.leftRightButtonStyle}>›</Text>}
                        prevButton={<Text style={feed.leftRightButtonStyle}>‹</Text>}
                        showsButtons={this.props.house.houseImages.length > 1}
                        paginationStyle={{ bottom: 0 }}
                        activeDotColor={Colors.brandPrimaryColor}
                        dotStyle={{
                            borderWidth: 1,
                            borderColor: Colors.brandPrimaryColor,
                            backgroundColor: Colors.transparent
                        }}
                    >
                        {this.props.house.houseImages.map((image, index) => {
                            return (
                                <Image
                                    style={feed.detailImage}
                                    source={{ uri: image }}
                                    key={index}
                                    resizeMode={'contain'}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={[feed.detailContentWrapper]}>
                        <View style={feed.roadDateWrapper}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Text style={feed.roadText}>{this.props.house.road}</Text>
                                <View style={{ marginRight: 10, marginBottom: 3 }}>
                                    {/*<RNShineButton
                                        size={toConstantFontSize(3.5)}
                                        value={this.props.isStarred}
                                        color={Colors.grey}
                                        fillColor={Colors.brandWarningColor}
                                        shape={"star"}
                                        onChange={() => this.props.starPost()}
                                    />*/}
                                </View>
                            </View>
                            <Text style={feed.spacesText}>
                                {this.props.house.spaces} Spaces Remaining
                            </Text>
                        </View>
                        <View style={feed.descriptionWrapper}>
                            <Text style={feed.descriptionText}>{this.props.description}</Text>
                        </View>
                        <View style={feed.priceWrapper}>
                            <View style={feed.priceItem}>
                                <Text
                                    style={[
                                        feed.priceText,
                                        {
                                            ...FontFactory({
                                                weight: 'SemiBold'
                                            })
                                        }
                                    ]}
                                >
                                    Rent
                                </Text>
                                <Text style={feed.priceText}>£{this.props.house.rentPrice}</Text>
                            </View>
                            <View
                                style={[
                                    feed.priceItem,
                                    {
                                        borderLeftWidth: 1,
                                        borderLeftColor: Colors.white
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        feed.priceText,
                                        {
                                            ...FontFactory({
                                                weight: 'SemiBold'
                                            })
                                        }
                                    ]}
                                >
                                    Bills
                                </Text>
                                <Text style={feed.priceText}>£{this.props.house.billsPrice}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: toConstantHeight(30) }}>
                        <Mapbox.MapView
                            style={{
                                flex: 2,
                                justifyContent: 'center'
                            }}
                            zoomLevel={this.state.zoomLevel}
                            zoomEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            rotateEnabled={false}
                            onPress={() =>
                                this.props.navigation.push('MapView', {
                                    data: { coords: this.props.house.coords }
                                })
                            }
                            styleUrl={Mapbox.StyleURL.Street}
                            logoEnabled={false}
                            centerCoordinate={this.props.house.coords}
                        >
                            <Mapbox.PointAnnotation
                                id={'chosen'}
                                coordinate={this.props.house.coords}
                            />
                        </Mapbox.MapView>
                        <View
                            style={{
                                position: 'absolute',
                                top: toConstantHeight(7),
                                left: toConstantWidth(7)
                            }}
                        >
                            <TouchableHighlight
                                underlayColor={Colors.grey}
                                style={feed.magnifierWrapper}
                                onPress={() =>
                                    this.setState({
                                        zoomLevel: this.state.zoomLevel + 1
                                    })
                                }
                            >
                                <Icon name={'magnifier-add'} size={24} />
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={Colors.grey}
                                style={feed.magnifierWrapper}
                                onPress={() =>
                                    this.setState({
                                        zoomLevel: this.state.zoomLevel - 1
                                    })
                                }
                            >
                                <Icon name={'magnifier-remove'} size={24} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View>
                        <Text style={[feed.userRow, feed.labelText]}>Flatmates</Text>
                        {this.props.house.users.map((user, index) =>
                            this.renderFlatmateRow(user, index)
                        )}
                    </View>
                </ScrollView>
            </>
        );
    }

    private renderFlatmateRow(user, index) {
        return (
            <RectButton
                key={index}
                underlayColor={Colors.grey}
                onPress={() =>
                    this.props.navigation.push('UserProfile', {
                        id: user.id,
                        data: user
                    })
                }
                style={feed.userRow}
            >
                <View style={feed.avatarWrapper}>
                    {user.profilePicture ?
                        <Avatar
                            medium={true}
                            source={{ uri: user.profilePicture }}
                            rounded={true}
                            title={user.firstName}
                        /> :
                        <Avatar
                            medium={true}
                            icon={{ name: 'person' }}
                            rounded={true}
                            title={user.firstName}
                        />}
                </View>
                <View style={feed.userDetailsWrapper}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text style={feed.userNameText}>{user.name}</Text>
                    </View>
                    <Text style={feed.userInfoText}>
                        {user.bio}
                    </Text>
                </View>
            </RectButton>
        );
    }
}
