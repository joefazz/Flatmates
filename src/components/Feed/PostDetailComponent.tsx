import Mapbox from '@mapbox/react-native-mapbox-gl';
import * as React from 'react';
import { Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Colors } from '../../consts';
import { feed } from '../../styles';
import { toConstantHeight } from '../../utils/PercentageConversion';

interface Props {
    house: {
        billsPrice: number,
        rentPrice: number,
        houseImages: Array<string>,
        road: string,
        spaces: number,
        users: Array<any>,
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

    render() {
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
            </ScrollView>
        );
    }
}