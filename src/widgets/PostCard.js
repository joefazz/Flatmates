import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';

import { Colors, Metrics } from '../consts';
import { Font } from '../consts';

export class PostCard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <View style={ styles.cardContainer }>
                <View style={ styles.swiperContainer }>
                    {this.renderPostPictures()}
                </View>
                <TouchableOpacity style={{ flex: 1, padding: 10 }} onPress={this.props.onPress}>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.titleText }>{this.props.title}</Text>
                        <Text style={ styles.spacesText }>{this.props.spaces} Spaces</Text>
                    </View>

                    <View style={ styles.subtitleContainer }>
                        <Text style={ styles.priceText }>£{this.props.price} Per Month (incl. Bills)</Text>
                        <Text style={ styles.priceText }>{moment(this.props.createdDate).format('DD MMM')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderPostPictures() {
        return(
            <Swiper paginationStyle={{bottom: 0}} activeDotColor={ Colors.brandSecondaryColor } dotStyle={{ borderWidth: 1, borderColor: Colors.brandSecondaryColor, backgroundColor: Colors.transparent }}>
                {this.props.images.map((image, index) => {
                    return (
                        <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, overflow: 'hidden' }} key={index}>
                            <Image style={ styles.postImage } source={{uri: image}} key={index} />
                        </View>
                    );
                })}
            </Swiper>
        );
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
        justifyContent: 'space-between'
    },

    postImage: {
        width: Metrics.screenWidth * 0.9,
        height: Metrics.screenHeight * 0.3,
    },

    titleText: {
        fontSize: 22,
        ...Font.FontFactory({family: 'Nunito', weight: 'Light'}),
    },

    spacesText: {
        fontSize: 18,
        marginBottom: 1.5,
        ...Font.FontFactory({family: 'Nunito', weight: 'Light'}),
        color: Colors.textHighlightColor
    },

    priceText: {
        fontSize: 16,
        color: Colors.textGrey
    }
});