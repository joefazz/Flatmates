import React from "react";
import { View, StyleSheet, TouchableHighlight, Slider } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";

import { Colors } from "../consts";
import PulseCircleLayer from "./PulseCircleLayer";

const ANNOTATION_SIZE = 20;

export class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: [-0.943, 51.4412],
            circleRadius: 100
        };
    }

    placeAnnotation(feature) {
        this.setState({ coordinates: feature.geometry.coordinates });
    }

    renderCircleLayer() {
        return (
            <Mapbox.ShapeSource
                id={"circleShape"}
                shape={{ type: "Feature", geometry: { type: "Point", coordinates: this.state.coordinates } }}
            >
                <Mapbox.CircleLayer
                    id={"circleLayer"}
                    style={[MapboxStyles.circleStyle, { circleRadius: this.state.circleRadius }]}
                />
            </Mapbox.ShapeSource>
        );
    }

    renderAnnotation() {
        return (
            <Mapbox.PointAnnotation id={"chosen"} coordinate={this.state.coordinates}>
                <View style={styles.annotationContainer}>
                    <View style={styles.annotationFill} />
                </View>
            </Mapbox.PointAnnotation>
        );
    }

    renderRadiusSlider() {
        return (
            <View style={{ position: "absolute", bottom: 0, left: 10, right: 40 }}>
                <Slider
                    value={this.state.circleRadius / 10}
                    maximumValue={20}
                    minimumValue={5}
                    onValueChange={(value) => this.setState({ circleRadius: value * 10 })}
                />
            </View>
        );
    }

    render() {
        return (
            <Mapbox.MapView
                style={{ flex: 1 }}
                zoomLevel={14}
                zoomEnabled={false}
                styleURL={Mapbox.StyleURL.Street}
                logoEnabled={false}
                onPress={(feature) => this.placeAnnotation(feature)}
                centerCoordinate={this.state.coordinates}
            >
                {this.renderCircleLayer()}
                {this.renderAnnotation()}
                {this.renderRadiusSlider()}
            </Mapbox.MapView>
        );
    }
}

const styles = StyleSheet.create({
    annotationContainer: {
        width: ANNOTATION_SIZE,
        height: ANNOTATION_SIZE,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: ANNOTATION_SIZE / 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0, 0, 0, 0.45)"
    },
    annotationFill: {
        width: ANNOTATION_SIZE - 3,
        height: ANNOTATION_SIZE - 3,
        borderRadius: (ANNOTATION_SIZE - 3) / 2,
        backgroundColor: Colors.brandPrimaryColor
    }
});

const MapboxStyles = Mapbox.StyleSheet.create({
    circleStyle: {
        circleColor: Colors.brandPrimaryColor,
        circleOpacity: 0.2
    }
});
