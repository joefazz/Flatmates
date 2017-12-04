import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { BackHandler, AsyncStorage, Image, Platform } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { ApolloProvider } from 'react-apollo';
import { Button } from 'react-native-elements';
import { persistStore } from 'redux-persist-immutable';

import store from './Client/redux/store';
import RootNavigation from './Client/navigators/Root';
import { base } from './Client/styles';
import Splash from './Assets/splash_screen.png'
import client from './Client/Client';

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
        }
    }

    componentWillMount() {
        AsyncStorage.clear();
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

    render() {

        if (!this.state.isRehydrated) {
            return <Image source={Splash} resizeMode={'stretch'} style={ base.fullScreen } />
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