import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import { Colors } from '../consts';
import PulseCircleLayer from './PulseCircleLayer';

const ANNOTATION_SIZE = 30;

export class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: [-0.9430, 51.4412],
            circleRadius: 100,
        };
    }

    placeAnnotation(feature) {
        console.table(feature)
        this.setState({ coordinates: feature.geometry.coordinates });
    }

    renderCircleLayer() {
        return (
            <Mapbox.ShapeSource
                id={'circleShape'}
                shape={{type: 'Feature', geometry: {type: 'Point', coordinates: this.state.coordinates}}}>
                <Mapbox.CircleLayer
                    id={'circleLayer'}
                    maxZoomLayer={16}
                    
                    style={[ MapboxStyles.circleStyle, {circleRadius: this.state.circleRadius }]}>

                </Mapbox.CircleLayer>
            </Mapbox.ShapeSource>
        )
    }

    renderAnnotation() {
        return (
            <Mapbox.PointAnnotation
                id={'chosen'}
                coordinate={this.state.coordinates}>

            </Mapbox.PointAnnotation>

        );
    }

    renderRadiusDial() {
        
    }

    render() {
        return (
            <Mapbox.MapView
                style={{ flex: 1 }}
                zoomLevel={14}
                styleURL={Mapbox.StyleURL.Street}
                onPress={(feature) => this.placeAnnotation(feature)}
                centerCoordinate={this.state.coordinates}>

                {this.renderCircleLayer()}
                {this.renderAnnotation()}
                {this.renderRadiusDial()}

            </Mapbox.MapView>
        )
    }
}

const styles = StyleSheet.create({
    annotationContainer: {
        width: ANNOTATION_SIZE,
        height: ANNOTATION_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: ANNOTATION_SIZE / 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0, 0, 0, 0.45)',
    },
    annotationFill: {
        width: ANNOTATION_SIZE - 3,
        height: ANNOTATION_SIZE - 3,
        borderRadius: (ANNOTATION_SIZE - 3) / 2,
        backgroundColor: Colors.brandSecondaryColor,
    }
  });

  const MapboxStyles = Mapbox.StyleSheet.create({
    circleStyle: {
            circleColor: Colors.brandSecondaryColor,
            circleOpacity: 0.2,
    }
  });