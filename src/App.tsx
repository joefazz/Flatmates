import Mapbox from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox/lib/services/geocoding';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Platform, AsyncStorage, StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import client from './Client';
import { MAPBOX_API_TOKEN } from './consts/strings';
import CodePush from "react-native-code-push";
import RootNavigation from './navigators/Root';
import store from './redux/store';
import OneSignal from 'react-native-onesignal';
import * as RNIap from 'react-native-iap';
import { Sentry } from 'react-native-sentry';

export const iapSKUs = Platform.select({
    ios: ['flatmates.5_applications', 'flatmates.15_applications', 'flatmates.infinite_applications'],
    android: ['flatmates.5_applications', 'flatmates.10_application', 'flatmates.infinite_applications']
});

Mapbox.setAccessToken(MAPBOX_API_TOKEN);

Sentry.config(
    'https://ff264cadb5f4403d8b6dbfd86e610646:41e9999cbe0745ab9fc6d069d656fee0@sentry.io/1216809', {
        deactivateStacktraceMerging: false
    }
).install();

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

interface Props { }

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
        this.prepareIAP();

        CodePush.getUpdateMetadata().then((update) => {
            if (update.isFirstRun) {
                Sentry.setVersion(update.appVersion + '-codepush:' + update.label);
                Alert.alert('Flatmates has updated!', update.label, [{ text: 'OK', style: 'default' }]);
            }
        });
    }

    prepareIAP = async () => {
        try {
            await RNIap.prepare();
        } catch (error) {
            console.warn(error);
        }
    };

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

export default CodePush({ installMode: CodePush.InstallMode.ON_NEXT_RESUME, minimumBackgroundDuration: 60, checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME })(Root);