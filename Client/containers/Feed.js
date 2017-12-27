import React from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostCard } from '../widgets/PostCard';
import { Colors } from '../consts';
import { feed } from '../styles';

export class Feed extends React.Component {
    static navigationOptions = {
        title: 'Home',
        
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        )
    };

    renderCard = () => {
        return (
            <View style={ feed.card }>
                <PostCard title={'De Beauvoir Road'} 
                    spaces={2} 
                    price={450}
                    images={['https://placeimg.com/375/282/any', 'https://placeimg.com/375/285/any', 'https://placeimg.com/375/285/any']} />
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundWhite }}>
                <FlatList
                    data={[1, 2]}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    renderItem={this.renderCard}
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