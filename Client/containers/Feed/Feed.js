import React from 'react';
import { View, Text, Platform, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { FeedListComponent } from '../../components/Feed/FeedListComponent';
import { CreateButton, PostCard } from '../widgets';
import { Colors, Metrics } from '../consts';
import { feed } from '../styles';

export class Feed extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerRight: Platform.OS === 'ios' ? <CreateButton onPress={() => navigation.navigate('CreatePost')} /> : null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        )
    });

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundWhite }}>
                <StatusBar barStyle={'light-content'} />
                <FeedListComponent {...this.state} />
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