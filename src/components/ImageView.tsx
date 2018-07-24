import React from 'react';
import { View, Modal } from 'react-native';
import { ImageViewer } from "react-native-image-zoom-viewer";
import { Colors } from '../consts';
import { IImageInfo } from 'react-native-image-zoom-viewer/src/image-viewer.type';
import { toConstantWidth, toConstantHeight } from '../utils/PercentageConversion';

interface Props {
    navigation: {
        state: {
            params: {
                imageUrls: IImageInfo[]
            }
        }
    }
}

export class ImageView extends React.Component<Props> {
    render() {
        const { imageUrls } = this.props.navigation.state.params;
        return (
            <View style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}>

            </View>
        )
    }
}