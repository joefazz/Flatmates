import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import { feed, base } from '../../styles';

interface Props {
    data: {
        createdAt: string,
        createdBy: {
            billsPrice: number,
            rentPrice: number,
            houseImages: string[],
            road: string,
            spaces: number,
            users: any[],
            coords: number[]
        },
        description: string,
        id: string,
        title: string
    },
    isLoading: boolean
};

interface State {}

export class PostDetailComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ base.wholePage }>
                <Mapbox.MapView
                    style={{ flex: 1 }}
                    zoomLevel={14}
                    styleUrl={Mapbox.StyleURL.Street}
                    logoEnabled={false}
                    centerCoordinate={this.props.data.createdBy.coords}>
                    <Mapbox.PointAnnotation
                        id={'chosen'}
                        coordinate={this.props.data.createdBy.coords}>

                    </Mapbox.PointAnnotation>
                </Mapbox.MapView>
                <View style={ feed.content }>
                
                </View>
            </View>
        );
    }
}