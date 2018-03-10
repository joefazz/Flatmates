import Mapbox from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox/lib/services/geocoding';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage, BackHandler, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist-immutable';

import Splash from '../Assets/splash_screen.png';
import client from './Client';
import { MAPBOX_API_TOKEN } from './consts/strings';
import RootNavigation from './navigators/Root';
import store from './redux/store';
import { base } from './styles';

Mapbox.setAccessToken(MAPBOX_API_TOKEN);

export const MapboxSDK = new MapboxClient(MAPBOX_API_TOKEN);

function persistentStore(onComplete) {
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
    constructor(props) {
        super(props);

        this.state = {
            isRehydrated: false,
        }
    }

    componentDidMount() {
        // AsyncStorage.clear().catch((error) => console.log(error));
        console.disableYellowBox = true;
        persistentStore(() => {
            this.setState({ isRehydrated: true });
        });
        BackHandler.addEventListener('hardwareBackPress', () => store.dispatch(NavigationActions.back()));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => store.dispatch(NavigationActions.back()));
    }

    render() {
        if (!this.state.isRehydrated) {
            return <Image source={Splash} resizeMode={'stretch'} style={ base.fullScreen } />
        }

        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <RootNavigation />
                </Provider>
            </ApolloProvider>
        );
    }
}