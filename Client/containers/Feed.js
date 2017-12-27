import React from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { CreateButton } from '../widgets/CreateButton';
import { PostCard } from '../widgets/PostCard';
import { Colors } from '../consts';
import { feed } from '../styles';

export class Feed extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerRight: Platform.OS === 'ios' ? <CreateButton onPress={() => navigation.navigate('CreatePost')} /> : null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        )
    });

    renderCard = () => {
        return (
            <View style={ feed.card }>
                <PostCard title={'De Beauvoir Road'} 
                    spaces={2} 
                    price={450}
                    images={['https://placeimg.com/300/285/animals', 'https://placeimg.com/300/285/people', 'https://placeimg.com/300/285/any']} />
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
            <View style={{ flex: 1, backgroundColor: Colors.backgroundWhite }}>
                <FlatList
                    data={[1, 2]}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    renderItem={this.renderCard}
                    ListHeaderComponent={this.renderHeaderFooter}
                    ListFooterComponent={this.renderHeaderFooter}
                    keyExtractor={item => item}
                    />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const bindActions = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, bindActions)(Feed)