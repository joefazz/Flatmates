import React, { Fragment } from 'react';
import { View, Text, FlatList, ActivityIndicator, Animated, TouchableOpacity, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostCard } from '../../widgets';
import { Colors, Font } from '../../consts';
import { feed, base } from '../../styles';
import { toConstantFontSize, toConstantHeight } from '../../utils/PercentageConversion';

type Props = {
    navigation: Object,
    data: Array<Object>,
    isLoading: boolean
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
            outputRange: [toConstantHeight(9.8), toConstantHeight(21.5)]
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
                easing: Easing.elastic(1)
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
                    onPress={() => this.props.navigation.navigate('PostDetail', {data: item} )}
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
            <View style={ feed.createCard } >
                <Text style={[{fontSize: toConstantFontSize(8), color: Colors.brandSecondaryColor, ...Font.FontFactory({weight: 'Light', family: 'Nunito'})} ]}>+</Text>
            </View>
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
                    <ActivityIndicator size={'large'} />
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
                    <View>
                        <View style={ feed.filterItem }>
                            <Text style={ feed.filterItemText }>Price (Low to High)</Text>
                        </View>
                        <View style={ feed.filterItem }>
                            <Text style={ feed.filterItemText }>Spaces</Text>
                        </View>
                        <View style={ feed.filterItem }>
                            <Text style={ feed.filterItemText }>Other option</Text>
                        </View>
                    </View>
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