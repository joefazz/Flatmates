import React, { Fragment } from 'react';
import { View, Text, Platform, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import client from '../../Client';
import { PostCard } from '../../widgets';
import { Colors, Metrics } from '../../consts';
import { feed, base } from '../../styles';
import { toConstantFontSize } from '../../utils/PercentageConversion';

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

    renderCreateHeader = () => {
        return (
            <View style={[ feed.card, { marginTop: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: Colors.brandSecondaryColor, borderStyle: 'dashed' } ]} >
                <Icon name={'ios-add'} size={toConstantFontSize(9)} style={{color: Colors.brandSecondaryColor}}/>
            </View>
        )
    }

    renderHeaderFooter = () => {
        return (
            <View style={{ height: 10 }} />
        )
    }

    renderEmpty = () => {
        return (
            <Text>No posts</Text>
        )
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={base.fullScreen}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        }

        return (
            <FlatList
                data={this.props.data}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                renderItem={this.renderCard}
                ListHeaderComponent={this.renderCreateHeader}
                ListFooterComponent={this.renderHeaderFooter}
                ListEmptyComponent={this.renderEmpty}
                keyExtractor={item => item.createdAt}
                />
        );
    }
}