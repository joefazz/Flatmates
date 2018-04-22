import * as React from 'react';
import { FlatList, Platform, RefreshControl, Text, TouchableHighlight, View } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, Font } from '../../consts';
import { feed } from '../../styles';
import { toConstantFontSize } from '../../utils/PercentageConversion';
import { Post } from '../../types/Entities';
import { PostCard } from '../../widgets';
import { Filters } from '../../containers/Feed/PostList';
import { FlatPicker } from '../../widgets/FlatPicker';

interface Props {
    navigation: {
        push: (route: string, params?: { data?: object }) => void;
    };
    data: Array<Post>;
    isLoading: boolean;
    userId: string;
    hasCreatedPost: boolean;
    isAllFilterActive: boolean;
    isStarredFilterActive: boolean;
    isPriceFilterActive: boolean;
    changeFilters: (Filters) => void;
    refreshPostList: () => void;
    loadMorePosts: () => any;
}

export class PostListComponent extends React.Component<Props> {
    render() {
        return (
            <>
                <View style={feed.filterWrapper}>
                    <View style={feed.filterContainer}>
                        <TouchableHighlight
                            onPress={() => this.props.changeFilters(Filters.ALL)}
                            underlayColor={Colors.translucentDefinetelyNotAirbnbRed}
                            style={[
                                feed.filterItem,
                                this.props.isAllFilterActive && {
                                    backgroundColor: Colors.definetelyNotAirbnbRed
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    feed.filterItemText,
                                    this.props.isAllFilterActive && { color: Colors.white }
                                ]}
                            >
                                All
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => this.props.changeFilters(Filters.STARRED)}
                            underlayColor={Colors.translucentDefinetelyNotAirbnbRed}
                            style={[
                                feed.filterItem,
                                this.props.isStarredFilterActive && {
                                    backgroundColor: Colors.definetelyNotAirbnbRed
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    feed.filterItemText,
                                    this.props.isStarredFilterActive && { color: Colors.white }
                                ]}
                            >
                                Starred
                            </Text>
                        </TouchableHighlight>

                        <FlatPicker
                            initialValue={'Filter'}
                            selectStyle={[
                                feed.filterItem,
                                this.props.isPriceFilterActive && {
                                    backgroundColor: Colors.definetelyNotAirbnbRed
                                }
                            ]}
                            selectTextStyle={[
                                feed.filterItemText,
                                this.props.isPriceFilterActive && { color: Colors.white }
                            ]}
                            onChange={(val) => console.log(val + 'selected')}
                            items={[
                                { section: true, label: 'Price' },
                                { label: 'Low to High' },
                                { label: 'High to Low' },
                                { section: true, label: 'Spaces Available' },
                                { label: '1' },
                                { label: '2' },
                                { label: '3' },
                                { label: '4' }
                            ]}
                        />
                    </View>
                </View>

                <FlatList
                    data={this.props.data}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    renderItem={this.renderCard}
                    ListHeaderComponent={this.renderCreateHeader}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isLoading}
                            onRefresh={this.refreshPostList}
                        />
                    }
                    ListFooterComponent={this.renderHeaderFooter}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={(item) => item.createdAt}
                />
                {Platform.OS === 'android' ? (
                    <FloatingAction
                        color={Colors.brandPrimaryColor}
                        overrideWithAction={true}
                        actions={[
                            {
                                name: 'create_action',
                                text: 'Create',
                                position: 1,
                                icon: <Icon name={'md-add'} size={26} color={Colors.white} />
                            }
                        ]}
                        showBackground={false}
                        floatingIcon={<Icon name={'md-add'} size={26} color={Colors.white} />}
                        onPressItem={() => this.props.navigation.push('CreatePost')}
                    />
                ) : (
                    <React.Fragment />
                )}
            </>
        );
    }

    private refreshPostList = () => {
        this.props.refreshPostList();
    };

    private renderHeaderFooter = () => {
        return <View style={{ height: 10 }} />;
    };

    private renderEmpty = () => {
        return <Text>No posts</Text>;
    };

    private renderCard = ({ item }) => {
        return (
            <View style={feed.card}>
                <PostCard
                    onPress={() => this.props.navigation.push('PostDetail', { data: item })}
                    title={item.createdBy.road}
                    spaces={item.createdBy.spaces}
                    price={item.createdBy.billsPrice + item.createdBy.rentPrice}
                    images={item.createdBy.houseImages}
                    createdDate={item.createdAt}
                />
            </View>
        );
    };

    private renderCreateHeader = () => {
        // if (this.props.hasCreatedPost) {
        //     return <View />;
        // }
        // return <View />;
        if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    underlayColor={Colors.grey}
                    onPress={() => this.props.navigation.push('CreatePost')}
                    style={feed.createCard}
                >
                    <Text
                        style={[
                            {
                                fontSize: toConstantFontSize(8),
                                color: Colors.brandPrimaryColor,
                                ...Font.FontFactory({ weight: 'Light' })
                            }
                        ]}
                    >
                        +
                    </Text>
                </TouchableHighlight>
            );
        }
        return <View />;
    };
}
