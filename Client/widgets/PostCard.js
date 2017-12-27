import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';

import { Colors, Metrics } from '../consts';

export class PostCard extends React.Component {
    
    render() {
        return(
            <View style={ styles.cardContainer }>
                <View style={ styles.swiperContainer }>
                    {this.renderPostPictures()}
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('PostDetail', {data: this.props})}>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.titleText }>{this.props.title}</Text>
                        <Text style={ styles.spacesText }>{this.props.spaces} Spaces</Text>
                    </View>

                    <View style={ styles.subtitleContainer }>
                        <Text style={ styles.priceText }>£{this.props.price} Per Month (incl. Bills)</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderPostPictures() {
        let counter = 0;
        let images = this.props.images.map(image => {
            return (
                <View key={++counter}>
                    <Image style={ styles.postImage } source={{uri: image}} />
                </View>
            )
        });

        return(
            <Swiper style={{ flex: 1 }} showsButtons={true} showsPagination={false}>
                {images}
            </Swiper>
        )
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'transparent'
    },

    swiperContainer: {
        flex: 3,
    },

    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },

    subtitleContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: Colors.white
    },

    postImage: {
        width: Metrics.screenWidth * 0.85,
        height: 190,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent'
    },

    titleText: {
        fontSize: 22,
        fontWeight: '200'
    },

    spacesText: {
        fontSize: 16,
        color: Colors.textHighlightColor
    },

    priceText: {
        fontSize: 16,
        color: Colors.textGrey
    }
});