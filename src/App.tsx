import * as React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { AsyncStorage, Image, BackHandler } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { persistStore } from 'redux-persist-immutable';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import MapboxClient from 'mapbox/lib/services/geocoding';

import store from './redux/store';
import { MAPBOX_API_TOKEN } from './consts/strings';
import RootNavigation from './navigators/Root';
import { base } from './styles';
import Splash from '../Assets/splash_screen.png';
import client from './Client';

Mapbox.setAccessToken(MAPBOX_API_TOKEN);

const addListener = createReduxBoundAddListener('root');

export const MapboxSDK = new MapboxClient(MAPBOX_API_TOKEN);

class AppNav extends React.Component<{dispatch: () => any, nav: {}}> {
    render() {
        return (
            <RootNavigation 
                navigation={
                    addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav,
                        addListener
                    })
                }        
            />
        );
    }
}

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

interface Props {};

interface State {
    isRehydrated: boolean
};

export default class Root extends React.Component<Props, State> {
    back: () => mixed;

    constructor(props) {
        super(props);

        this.state = {
            isRehydrated: false,
        }
    }

    // TODO: MAKE SURE REDUX CLEARS STORE IF SOMEONE EXITS OR CRASHES DURING SET UP OTHERWISE THE FACEBOOK QUERY WILL NEVER UPDATE THE UI
    componentWillMount() {
        // AsyncStorage.clear().catch(error => console.log(error));
        persistentStore(() => {
            this.setState({ isRehydrated: true });
        });
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