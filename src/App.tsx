import Mapbox from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox/lib/services/geocoding';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage, BackHandler, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

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
        },
        onComplete
    );
}

const initialState = {
    isRehydrated: false
};

interface Props {}

type State = Readonly<typeof initialState>;

export default class Root extends React.Component<Props, State> {
    readonly state: State = initialState;

    componentDidMount() {
        AsyncStorage.clear().catch((error) => console.log(error));
        console.disableYellowBox = true;
        persistentStore(() => {
            this.setState({ isRehydrated: true });
        });
        BackHandler.addEventListener('hardwareBackPress', () =>
            store.dispatch(NavigationActions.back())
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () =>
            store.dispatch(NavigationActions.back())
        );
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <RootNavigation />
                </Provider>
            </ApolloProvider>
        );
    }
}
