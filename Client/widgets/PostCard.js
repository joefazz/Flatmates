import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import { Colors, Metrics } from '../consts';

export class PostCard extends React.Component {
    constructor(props) {
        super(props);

        let counter = 0;
        this.images = this.props.images.map(image => {
            return (
                <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, overflow: 'hidden' }} key={++counter}>
                    <FastImage style={ styles.postImage } source={{uri: image}} key={++counter} />
                </View>
            )
        });

    }
    
    render() {
        return(
            <View style={ styles.cardContainer }>
                <View style={ styles.swiperContainer }>
                    {this.renderPostPictures()}
                </View>
                <TouchableOpacity style={{ flex: 1, padding: 10 }} onPress={() => this.props.navigation.navigate('PostDetail', {data: this.props})}>
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
        return(
            <Swiper paginationStyle={{bottom: 0}} activeDotColor={ Colors.brandSecondaryColor } dotStyle={{ borderWidth: 1, borderColor: Colors.brandSecondaryColor, backgroundColor: 'transparent' }}>
                {this.images}
            </Swiper>
        )
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderColor: Colors.backgroundWhite,
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 1.8,
    },

    swiperContainer: {
        flex: 3,
    },

    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: Colors.white,
    },

    subtitleContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        alignItems: 'center',
    },

    postImage: {
        width: Metrics.screenWidth * 0.9,
        height: Metrics.screenHeight * 0.3,
    },

    titleText: {
        fontSize: 22,
        fontWeight: '200',
    },

    spacesText: {
        fontSize: 18,
        marginBottom: 1.5,
        color: Colors.textHighlightColor
    },

    priceText: {
        fontSize: 16,
        color: Colors.textGrey
    }
});