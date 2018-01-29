import React from 'react';
import { View, Text, Platform, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


import { PostCard } from '../../widgets';
import { Colors, Metrics } from '../../consts';
import { feed } from '../../styles';

export class PostListComponent extends React.Component {
    constructor(props) {
        super(props);
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

    renderHeaderFooter = () => {
        return (
            <View style={{ height: 10 }} />
        )
    }

    render() {
        if (!this.props.data) {
            return (
                <Text>No Posts Found</Text>
            )
        }
        return (
            <FlatList
                data={this.props.data}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                renderItem={this.renderCard}
                onEndReached={() => this.props.loadMorePosts()}
                ListHeaderComponent={this.renderHeaderFooter}
                ListFooterComponent={this.renderHeaderFooter}
                keyExtractor={item => item.createdAt}
                />
        );
    }
}