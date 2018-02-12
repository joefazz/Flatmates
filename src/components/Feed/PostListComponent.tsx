import * as React from 'react';
import { Animated, Easing, FlatList, RefreshControl, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, Font } from '../../consts';
import { feed } from '../../styles';
import { toConstantFontSize, toConstantHeight } from '../../utils/PercentageConversion';
import { PostCard } from '../../widgets';

interface Props {
    navigation: {push: (route: string, params: {fbUserId?: string, data?: object}) => void},
    data: Array<object>,
    isLoading: boolean,
    fbUserId: string,
    refreshPostList: () => void,
    loadMorePosts: () => any,
};

interface State {
    isFilterOpen: boolean
}

export class PostListComponent extends React.Component<Props, State> {
    private _animationValue: Animated.Value = new Animated.Value(0);
    private _ANIMATION_DURATION_CONSTANT: number = 500;

    private heightAnimation = {
        height: this._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [toConstantHeight(10.5), toConstantHeight(22)]
        })
    };

    private opacityAnimation = {
        opacity: this._animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
    };

    private rotateAnimation = {
        transform: [
            {
                rotate: this._animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg']
                })
            }
        ]
    }

    constructor(props) {
        super(props);

        this.state = {
            isFilterOpen: false
        };
    }

    render() {
        return (
            <>
                <Animated.View style={[ feed.filterWrapper, this.heightAnimation ]}>
                    <TouchableOpacity onPress={this.animateFilter} activeOpacity={0.7} style={ feed.expandBar }>
                        <Animated.View style={this.rotateAnimation}>
                            <Icon name={'ios-arrow-up'} size={toConstantFontSize(3)} style={{color: Colors.highlightWhite}} />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableHighlight onPress={() => alert('Price pressed')} underlayColor={Colors.translucentAirBnbRed} style={ feed.filterItem }>
                        <Text style={ feed.filterItemText }>Price (Low to High)</Text>
                    </TouchableHighlight>
                    <Animated.View style={ this.opacityAnimation }>
                        <TouchableHighlight onPress={() => alert('Spaces pressed')} underlayColor={Colors.translucentAirBnbRed} style={ feed.filterItem }>
                            <Text style={ feed.filterItemText }>Spaces</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => alert('Other options pressed')} underlayColor={Colors.translucentAirBnbRed} style={ feed.filterItem }>
                            <Text style={ feed.filterItemText }>Other option</Text>
                        </TouchableHighlight>
                    </Animated.View>
                </Animated.View>
                <FlatList
                    data={this.props.data}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    renderItem={this.renderCard}
                    ListHeaderComponent={this.renderCreateHeader}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isLoading}
                            onRefresh={() => this.refreshPostList}
                        />
                    }
                    ListFooterComponent={this.renderHeaderFooter}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={(item) => item.createdAt}
                />
            </>
        );
    }

    private refreshPostList() {
        this.props.refreshPostList();
    }

    private renderHeaderFooter = () => {
        return (
            <View style={{ height: 10 }} />
        );
    }

    private renderEmpty = () => {
        return (
            <Text>No posts</Text>
        );
    }

    private renderCard = ({ item }) => {
        return (
            <View style={ feed.card }>
                <PostCard
                    onPress={() => this.props.navigation.push('PostDetail', {data: item})}
                    title={item.createdBy.road}
                    spaces={item.createdBy.spaces}
                    price={item.createdBy.billsPrice + item.createdBy.rentPrice}
                    images={item.createdBy.houseImages}
                    createdDate={item.createdAt}
                />
            </View>
        );
    }

    private renderCreateHeader = () => {
        // return <View />;
        return (
            <TouchableHighlight underlayColor={Colors.grey} onPress={() => this.props.navigation.push('CreatePost', {fbUserId: this.props.fbUserId})} style={ feed.createCard } >
                <Text style={[{fontSize: toConstantFontSize(8), color: Colors.brandSecondaryColor, ...Font.FontFactory({weight: 'Light'})} ]}>+</Text>
            </TouchableHighlight>
        );
    }

    private animateFilter = () => {
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
}