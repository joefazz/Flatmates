import Mapbox from '@mapbox/react-native-mapbox-gl';
// @ts-ignore
import moment from 'moment';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableHighlight,
    Alert,
    View,
    Platform,
    Modal,
    TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { ImageViewer } from 'react-native-image-zoom-viewer';

import { Colors } from '../../consts';
import { FontFactory } from '../../consts/font';
import { feed } from '../../styles';
import { ProfileState } from '../../types/ReduxTypes';
import { House } from '../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';
import { CreateApplicationMutationVariables } from '../../graphql/Types';

interface Props {
    house: House;
    isStarred: boolean;
    createdAt: string;
    userHasNoApplications: boolean;
    lastSeen: string;
    createApplication: (params: CreateApplicationMutationVariables) => void;
    description: string;
    title: string;
    userHasAppliedToHouse: boolean;
    isReadOnly: boolean;
    navigation: {
        state: {
            params: {
                data: {
                    id;
                };
            };
        };
        push: (route: string, params: { id?: string; data?: object }) => void;
    };
    id: string;
    userId: string;
    firstName: string;
    isLoading: boolean;
    profile: ProfileState;
    // starPost: () => void;
}

const initialState = {
    zoomLevel: 14,
    isBookmarked: false,
    isLayoutCalculated: false,
    descriptionWrapperHeight: toConstantHeight(20),
    hasSentApplication: false,
    isModalVisible: false
};

type State = Readonly<typeof initialState>;

export class PostDetailComponent extends React.Component<Props, State> {
    readonly state: State = initialState;

    render() {
        if (this.props.isLoading && !this.props.house.users) {
            return <ActivityIndicator />;
        }

        const isUsersPost =
            this.props.house.users.filter((user) => user.id === this.props.userId).length > 0;

        return (
            <>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                    }}
                >
                    <Modal animationType={"slide"} visible={this.state.isModalVisible}>
                        <ImageViewer
                            imageUrls={this.props.house.houseImages.map(image => ({ url: image }))}
                            enableSwipeDown={true}
                            onSwipeDown={() => this.setState({ isModalVisible: false })}
                            saveToLocalByLongPress={true}
                        />
                    </Modal>
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
                                <TouchableOpacity key={index} onPress={() => this.setState({ isModalVisible: true })}>
                                    <Image
                                        style={feed.detailImage}
                                        source={{ uri: image }}
                                        resizeMode={'contain'}
                                    />
                                </TouchableOpacity>
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
                            <Text style={feed.dateText}>
                                {this.props.lastSeen
                                    ? 'Last Viewed: ' +
                                    moment(this.props.lastSeen)
                                        .utc()
                                        .format('DD MMMM') +
                                    ' at ' +
                                    moment(this.props.lastSeen)
                                        .utc()
                                        .format('HH:MM')
                                    : 'Created On: ' +
                                    moment(this.props.createdAt)
                                        .utc()
                                        .format('DD MMM') +
                                    ' at ' +
                                    moment(this.props.createdAt)
                                        .utc()
                                        .format('HH:MM')}
                            </Text>
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
                                Platform.OS === 'ios'
                                    ? this.props.navigation.push('MapView', {
                                        data: { coords: this.props.house.coords }
                                    })
                                    : console.log('coming soon')
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
                {!this.props.isReadOnly &&
                    !isUsersPost && (!this.props.userHasNoApplications) ? (
                        <View
                            style={{
                                height: toConstantHeight(isIphoneX() ? 9.4 : 7.4),
                                position: 'absolute',
                                bottom: 0
                            }}
                        >
                            <TouchableRect
                                onPress={() =>
                                    Alert.alert(
                                        'Send Application',
                                        'Are you sure you want to apply to ' +
                                        this.props.house.road +
                                        '?',
                                        [
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancelled'),
                                                style: 'cancel'
                                            },
                                            {
                                                text: 'Send',
                                                onPress: () =>
                                                    this.props.createApplication({
                                                        userID: this.props.userId,
                                                        houseID: this.props.house.shortID,
                                                        from: this.props.firstName,
                                                        message: ''
                                                    })
                                            }
                                        ]
                                    )
                                }
                                title={
                                    this.props.userHasAppliedToHouse
                                        ? 'Application Sent!'
                                        : 'Send Application'
                                }
                                iconName={this.props.userHasAppliedToHouse ? 'envelope' : 'bullhorn'}
                                enabled={!this.props.userHasAppliedToHouse}
                                backgroundColor={Colors.brandPrimaryColor}
                                wrapperStyle={{ borderRadius: 0 }}
                                buttonStyle={{
                                    width: toConstantWidth(100),
                                    paddingBottom: isIphoneX() ? 18 : 0,
                                    height: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                                }}
                            />
                        </View>
                    ) : (
                        <View
                            style={{
                                height: toConstantHeight(isIphoneX() ? 9.4 : 7.4),
                                position: 'absolute',
                                bottom: 0
                            }}
                        >
                            <TouchableRect
                                onPress={() => console.log('buy more apps')}
                                title={'Buy Applications'}
                                iconName={'shopping-cart'}
                                backgroundColor={Colors.brandPrimaryColor}
                                wrapperStyle={{ borderRadius: 0 }}
                                buttonStyle={{
                                    width: toConstantWidth(100),
                                    paddingBottom: isIphoneX() ? 18 : 0,
                                    height: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                                }}
                            />
                        </View>
                    )}
            </>
        );
    }

    private renderFlatmateRow(user, index) {
        return (
            <RectButton
                key={index}
                underlayColor={Colors.grey}
                onPress={() => this.props.isReadOnly ? alert('Please sign up to view user profiles!') :
                    this.props.navigation.push('UserProfile', {
                        id: user.id,
                        data: user
                    })
                }
                style={feed.userRow}
            >
                <View style={feed.avatarWrapper}>
                    <Avatar
                        medium={true}
                        source={{ uri: user.profilePicture }}
                        rounded={true}
                        title={user.firstName}
                    />
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
                        {user.studyYear} student studying {user.course}
                    </Text>
                </View>
            </RectButton>
        );
    }
}
