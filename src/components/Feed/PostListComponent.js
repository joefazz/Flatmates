import React, { Fragment } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { PostCard } from '../../widgets';
import { Colors, Font } from '../../consts';
import { feed, base } from '../../styles';
import { toConstantFontSize, toConstantHeight, toConstantWidth } from '../../utils/PercentageConversion';

type Props = {
    navigation: Object,
    data: Array<Object>,
    isLoading: boolean
};

export class PostListComponent extends React.Component<Props> {
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
                <View style={{ backgroundColor: Colors.brandPrimaryColor, height: toConstantHeight(20), alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: toConstantWidth(90), marginTop: 10, borderRadius: 10, borderWidth: 1, height: toConstantHeight(5), justifyContent: 'center', paddingHorizontal: toConstantWidth(3) }}>
                        <Text>Price (Low to High)</Text>
                    </View>
                    <View style={{ width: toConstantWidth(90), marginVertical: 10, borderRadius: 10, borderWidth: 1, height: toConstantHeight(5), justifyContent: 'center', paddingHorizontal: toConstantWidth(3) }}>
                        <Text>Spaces</Text>
                    </View>
                    <View style={{ width: toConstantWidth(90), marginBottom: 10, borderRadius: 10, borderWidth: 1, height: toConstantHeight(5), justifyContent: 'center', paddingHorizontal: toConstantWidth(3) }}>
                        <Text>Other option</Text>
                    </View>
                </View>
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