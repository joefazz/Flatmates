import Mapbox from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox/lib/services/geocoding';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import client from './Client';
import { MAPBOX_API_TOKEN } from './consts/strings';
import RootNavigation from './navigators/Root';
import store from './redux/store';
import OneSignal from 'react-native-onesignal';

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
        console.disableYellowBox = true;
        persistentStore(() => {
            this.setState({ isRehydrated: true });
        });
        BackHandler.addEventListener('hardwareBackPress', () =>
            store.dispatch(NavigationActions.back())
        );

        OneSignal.addEventListener('received', this.onReceivePush);
        OneSignal.addEventListener('opened', this.onOpenPush);
        OneSignal.addEventListener('ids', this.saveIds);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () =>
            store.dispatch(NavigationActions.back())
        );

        OneSignal.removeEventListener('received', this.onReceivePush);
        OneSignal.removeEventListener('opened', this.onOpenPush);
        OneSignal.removeEventListener('ids', this.saveIds);
    }

    onReceivePush = (notification) => {
        console.log(notification);
    };

    onOpenPush = (openResult) => {
        console.log(openResult);
    };

    saveIds = (device) => {
        console.log('Device info: ', device);
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <RootNavigation screenProps={this.state.isRehydrated} />
                </Provider>
            </ApolloProvider>
        );
    }
}
