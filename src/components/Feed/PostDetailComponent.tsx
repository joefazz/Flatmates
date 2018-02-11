import Mapbox from '@mapbox/react-native-mapbox-gl';
import * as React from 'react';
import { View } from 'react-native';

import { base, feed } from '../../styles';

interface Props {
    data: {
        createdAt: number,
        createdBy: {
            billsPrice: number,
            rentPrice: number,
            houseImages: Array<string>,
            road: string,
            spaces: number,
            users: Array<any>,
            coords: Array<number>
        },
        description: string,
        title: string
    },
    navigation: {state: {
        params: {
            data: {
                id
            }
        }
    }, push: (route: string, params: {fbUserId?: string, data?: object}) => void},
    id?: string,
    isLoading: boolean
}

export class PostDetailComponent extends React.PureComponent<Props> {

    render() {
        return (
            <View style={ base.wholePage }>
                <Mapbox.MapView
                    style={{ flex: 1 }}
                    zoomLevel={14}
                    styleUrl={Mapbox.StyleURL.Street}
                    logoEnabled={false}
                    centerCoordinate={this.props.data.createdBy.coords}
                >
                    <Mapbox.PointAnnotation
                        id={'chosen'}
                        coordinate={this.props.data.createdBy.coords}
                    />
                </Mapbox.MapView>
                <View style={ feed.content }/>
            </View>
        );
    }
}