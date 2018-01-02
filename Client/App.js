import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { BackHandler, AsyncStorage, Image, Platform, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { ApolloProvider } from 'react-apollo';
import { Button } from 'react-native-elements';
import { persistStore } from 'redux-persist-immutable';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import store from './redux/store';
import RootNavigation from './navigators/Root';
import { base } from './styles';
import Splash from '../Assets/splash_screen.png'
import client from './Client';

Mapbox.setAccessToken('pk.eyJ1Ijoiam9lZmF6eiIsImEiOiJjamJ4cGh4b3MydXFtMzNrMXBjcnJoNTJ1In0.3TXY6xnx57AhOOtFV8gpyw');

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
        AsyncStorage.clear().catch(error => console.log(error));
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
            <View style={{ flex: 1 }}>
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    zoomLevel={15}
                    centerCoordinate={[11.256, 43.770]}
                    style={{ flex: 1 }}>
                </Mapbox.MapView>
            </View>
        )

        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <AppWithNavigationState />
                </Provider>
            </ApolloProvider>
        );
    }
}