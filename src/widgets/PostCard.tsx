// @ts-ignore
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { Colors, Metrics } from '../consts';
import { Font } from '../consts';
import { toConstantFontSize } from '../utils/PercentageConversion';

interface Props {
    images: Array<string>;
    createdDate: number;
    title: string;
    onPress: () => void;
    price: number;
    spaces: number;
}

export class PostCard extends React.PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={this.props.onPress}>
                <View style={styles.swiperContainer}>
                    <Image
                        source={{ uri: this.props.images[0] }}
                        style={styles.postImage}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                        <Text style={styles.spacesText}>{this.props.spaces} Spaces</Text>
                    </View>

                    <View style={styles.subtitleContainer}>
                        <Text style={styles.priceText}>
                            £{this.props.price} Per Month (incl. Bills)
                        </Text>
                        <Text style={styles.priceText}>
                            {moment(this.props.createdDate).format('DD MMM')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // renderPostPictures() {
    //     return (
    //         <Swiper
    //             paginationStyle={{ bottom: 0 }}
    //             showsPagination={false}
    //             scrollEnabled={false}
    //             activeDotColor={Colors.brandPrimaryColor}
    //             dotStyle={{
    //                 borderWidth: 1,
    //                 borderColor: Colors.brandPrimaryColor,
    //                 backgroundColor: Colors.transparent
    //             }}
    //         >
    //             {this.props.images.map((image, index) => {
    //                 return (
    //                     <View
    //                         style={{
    //                             borderTopLeftRadius: 5,
    //                             borderTopRightRadius: 5,
    //                             overflow: 'hidden'
    //                         }}
    //                         key={index}
    //                     >
    //                         <Image
    //                             style={styles.postImage}
    //                             source={{ uri: image }}
    //                             key={index}
    //                             resizeMode={'contain'}
    //                         />
    //                     </View>
    //                 );
    //             })}
    //         </Swiper>
    //     );
    // }
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
            height: 4
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 1.8
    },

    swiperContainer: {
        flex: 3,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden'
    },

    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
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
        height: Metrics.screenHeight * 0.22,
        backgroundColor: Colors.white
    },

    titleText: {
        fontSize: toConstantFontSize(2.8),
        color: Colors.black,
        ...Font.FontFactory({ weight: 'Light' })
    },

    spacesText: {
        fontSize: toConstantFontSize(2.3),
        marginBottom: 1.5,
        ...Font.FontFactory({ weight: 'Light' }),
        color: Colors.black
    },

    priceText: {
        fontSize: toConstantFontSize(2),
        color: Colors.textGrey
    }
});
