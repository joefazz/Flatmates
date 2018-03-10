import Mapbox from '@mapbox/react-native-mapbox-gl';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../consts';

interface Props {
    navigation: {
        goBack: () => void;
        state: {
            params: {
                data: {
                    coords: Array<string>;
                }
            }
        }
    };
}

export class MapComponent extends React.Component<Props> {
    static navigationOptions = () => ({
        header: null,
        tabBarVisible: false
    });

    render() {
        return (
            <Mapbox.MapView
                style={{ alignSelf: 'stretch', flex: 1, justifyContent: 'flex-start' }}
                zoomEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                styleUrl={Mapbox.StyleURL.Street}
                logoEnabled={false}
                centerCoordinate={this.props.navigation.state.params.data.coords}
            >
                <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 50, marginLeft: 25, shadowColor: Colors.grey, shadowOpacity: 0.7, shadowRadius: 4 }} onPress={() => this.props.navigation.goBack()}>
                    <Icon style={{ fontSize: 45, color: Colors.brandSecondaryColor }} name={'ios-arrow-dropleft-circle'} />
                </TouchableOpacity>
                <Mapbox.PointAnnotation
                    id={'chosen'}
                    coordinate={this.props.navigation.state.params.data.coords}
                />
            </Mapbox.MapView>

        )
    }
}