import './utils/ReactotronConfig';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox/lib/services/geocoding';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Platform, AsyncStorage, StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import client from './Client';
import { MAPBOX_API_TOKEN } from './consts/strings';
import CodePush from 'react-native-code-push';
import RootNavigation from './navigators/Root';
import store from './redux/store';
import OneSignal from 'react-native-onesignal';
import { Sentry } from 'react-native-sentry';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let json = require('../package.json');

Mapbox.setAccessToken(MAPBOX_API_TOKEN);

Sentry.config(
    'https://ff264cadb5f4403d8b6dbfd86e610646:41e9999cbe0745ab9fc6d069d656fee0@sentry.io/1216809',
    {
        deactivateStacktraceMerging: false
    }
).install();

export const TRACKER = new GoogleAnalyticsTracker('UA-123407646-1');

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

class Root extends React.Component<Props, State> {
    readonly state: State = initialState;

    componentDidMount() {
        // AsyncStorage.clear();
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('light-content');
        }

        Sentry.setShouldSendCallback(() => !__DEV__);

        Sentry.setUserContext({
            id: store.getState().login.id,
            email: store.getState().login.email,
            username: store.getState().login.name
        });

        console.disableYellowBox = true;
        persistentStore(() => {
            this.setState({ isRehydrated: true });
        });

        OneSignal.inFocusDisplaying(2);

        OneSignal.addEventListener('received', this.onReceivePush);
        OneSignal.addEventListener('opened', this.onOpenPush);
        OneSignal.addEventListener('ids', this.saveIds);

        // Sentry.nativeCrash();

        CodePush.getUpdateMetadata()
            .then((update) => {
                if (update && update.isFirstRun) {
                    TRACKER.setAppVersion(json.version);
                    Sentry.setVersion(json.version);
                    Alert.alert('Flatmates has updated!', update.description, [
                        { text: 'OK', style: 'default' }
                    ]);
                }
            })
            .catch((err) => Sentry.captureException(err));
    }

    componentWillUnmount() {
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
                    <RootNavigation
                        screenProps={{
                            isRehydrated: this.state.isRehydrated
                        }}
                    />
                </Provider>
            </ApolloProvider>
        );
    }
}

export default CodePush({
    installMode: CodePush.InstallMode.ON_NEXT_RESUME,
    minimumBackgroundDuration: 60,
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(Root);
