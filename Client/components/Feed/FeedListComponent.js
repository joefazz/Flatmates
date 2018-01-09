import React from 'react';
import { View, Text, Platform, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostCard } from '../widgets';
import { Colors, Metrics } from '../consts';
import { feed } from '../styles';

export class FeedListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCard = () => {
        return (
            <View style={ feed.card }>
                <PostCard title={'De Beauvoir Road'} 
                    spaces={2} 
                    price={450}
                    images={['https://placeimg.com/600/300/animals', 'https://placeimg.com/600/300/people', 'https://placeimg.com/600/300/any']} />
            </View>
        );
    }

    renderHeaderFooter = () => {
        return (
            <View style={{ height: 10 }} />
        )
    }

    render() {
        return (
            <FlatList
                data={[1, 2]}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                renderItem={this.renderCard}
                ListHeaderComponent={this.renderHeaderFooter}
                ListFooterComponent={this.renderHeaderFooter}
                keyExtractor={item => item}
                />
        );
    }
}