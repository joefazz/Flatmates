import React, { Fragment } from 'react';
import { View, Text, FlatList, ActivityIndicator, Animated, TouchableOpacity, Easing, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostCard } from '../../widgets';
import { Colors, Font } from '../../consts';
import { feed, base } from '../../styles';
import { toConstantFontSize, toConstantHeight } from '../../utils/PercentageConversion';

type Props = {
    navigation: Object,
    data: Array<Object>,
    isLoading: boolean,
    fbUserId: string
};

type State = {
    isFilterOpen: boolean
}

export class PostListComponent extends React.Component<Props, State> {
    _animationValue: Animated.Value = new Animated.Value(1);
    _ANIMATION_DURATION_CONSTANT: number = 500;

    constructor(props) {
        super(props);

        this.state = {
            isFilterOpen: true
        };
    }

    heightAnimation = {
        height: this._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [toConstantHeight(10.5), toConstantHeight(22)]
        })
    };

    opacityAnimation = {
        opacity: this._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
    };

    rotateAnimation = {
        transform: [
            {
                rotate: this._animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '0deg']
                })
            }
        ]
    }

    animateFilter = () => {
        if (this.state.isFilterOpen) {
            Animated.timing(this._animationValue, {
                toValue: 0,
                duration: this._ANIMATION_DURATION_CONSTANT,
                easing: Easing.elastic(0.7)
            }).start(() => this.setState({ isFilterOpen: false }));
        } else {
            Animated.timing(this._animationValue, {
                toValue: 1,
                duration: this._ANIMATION_DURATION_CONSTANT,
                easing: Easing.elastic(1)
            }).start(() => this.setState({ isFilterOpen: true }));
        }
    }

    renderCard = ({ item }) => {
        return (
            <View style={ feed.card }>
                <PostCard 
                    onPress={() => this.props.navigation.push('PostDetail', {data: item} )}
                    title={item.createdBy.road} 
                    spaces={item.createdBy.spaces} 
                    price={item.createdBy.billsPrice + item.createdBy.rentPrice}
                    images={item.createdBy.houseImages}
                    createdDate={item.createdAt} />
            </View>
        );
    }

    renderCreateHeader = () => {
        return (
            <TouchableHighlight underlayColor={Colors.grey} onPress={() => this.props.navigation.push('CreatePost', {fbUserId: this.props.fbUserId})} style={ feed.createCard } >
                <Text style={[{fontSize: toConstantFontSize(8), color: Colors.brandSecondaryColor, ...Font.FontFactory({weight: 'Light', family: 'Nunito'})} ]}>+</Text>
            </TouchableHighlight>
        );
    }

    renderHeaderFooter = () => {
        return (
            <View style={{ height: 10 }} />
        );
    }

    renderEmpty = () => {
        return (
            <Text>No posts</Text>
        );
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={base.fullScreen}>
                    <ActivityIndicator size={'small'} />
                </View>
            );
        }

        return (
            <Fragment>
                <Animated.View style={[ feed.filterWrapper, this.heightAnimation ]}>
                    <TouchableOpacity onPress={this.animateFilter} activeOpacity={0.7} style={ feed.expandBar }>
                        <Animated.View style={this.rotateAnimation}>
                            <Icon name={'ios-arrow-up'} size={toConstantFontSize(3)} style={{color: Colors.highlightWhite}} />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableHighlight onPress={() => console.log('hello')} underlayColor={Colors.translucentAirBnbRed} style={ feed.filterItem }>
                        <Text style={ feed.filterItemText }>Price (Low to High)</Text>
                    </TouchableHighlight>
                    <Animated.View style={ this.opacityAnimation }>
                        <TouchableHighlight onPress={() => console.log('hello')} underlayColor={Colors.translucentAirBnbRed} style={ feed.filterItem }>
                            <Text style={ feed.filterItemText }>Spaces</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => console.log('hello')} underlayColor={Colors.translucentAirBnbRed} style={ feed.filterItem }>
                            <Text style={ feed.filterItemText }>Other option</Text>
                        </TouchableHighlight>
                    </Animated.View>
                </Animated.View>
                <FlatList
                    data={this.props.data}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    renderItem={this.renderCard}
                    ListHeaderComponent={this.renderCreateHeader}
                    ListFooterComponent={this.renderHeaderFooter}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={item => item.createdAt}
                />
            </Fragment>
        );
    }
}