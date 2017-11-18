import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { BackHandler, AsyncStorage, Image, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Font, AppLoading } from 'expo';
import { Button } from 'react-native-elements';
import { persistStore } from 'redux-persist-immutable';

import store from './redux/store';
import RootNavigation from './navigators/Root';
import { baseStyle } from './styles';
import Splash from '../Assets/splash_screen.png'
import client from './Client';

const AppNav = ({ dispatch, nav }) => {
    return <RootNavigation 
            navigation={
                addNavigationHelpers({
                    dispatch,
                    state: nav
                })
            }        
        />;
};

const mapStateToProps = (state) => ({
    nav: state.get('nav'),
});

const AppWithNavigationState = connect(mapStateToProps)(AppNav);

function persistentStore(onComplete, purge = false) {
    return persistStore(
        store, 
        {
            storage: AsyncStorage
        }, onComplete
    );
}

export default class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRehydrated: false,
            isAssetsLoaded: false,
        }
    }

    componentWillMount() {
        // AsyncStorage.clear();
        persistentStore(() => {
            this.setState({ isRehydrated: true });
        })
    }

    componentDidMount() {
        this.back = BackHandler.addEventListener('hardwareBackPress', () => store.dispatch(NavigationActions.back()));
    }

    componentWillUnmount() {
        this.back.remove();
    }

    async _loadAssetsAsync() {
        try {
            await Font.loadAsync({
                'FontAwesome': require('@expo/vector-icons/fonts/FontAwesome.ttf'),
                'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
                'MaterialCommunityIcons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
                'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')});
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    render() {
        if (!this.state.isAssetsLoaded) {
            return <AppLoading startAsync={this._loadAssetsAsync}
                onFinish={() => this.setState({ isAssetsLoaded: true })}
                onError={console.warn}/> 
        }

        if (!this.state.isRehydrated) {
            return <Image source={Splash} resizeMode={'stretch'} style={{...baseStyle.fullScreen}} />
        }

        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <AppWithNavigationState />
                </Provider>
            </ApolloProvider>
        );
    }
}