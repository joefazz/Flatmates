import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { BackHandler, AsyncStorage, Image, Platform } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Button } from 'react-native-elements';

import store from './redux/store';
import RootNavigation from './navigators/Root';
import * as Global from './styles/Global';
import Splash from '../Assets/splash_screen.png'

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        }        
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.login.isRehydrated !== nextProps.login.isRehydrated || this.state.isReady !== nextState.isReady;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }

    async _loadAssetsAsync() {
        console.log('are we doing anything useful')
        try {
            await Font.loadAsync([
                {'FontAwesome': require('@expo/vector-icons/fonts/FontAwesome.ttf')},
                {'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')}]);
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    onBackPressed = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        } 

        dispatch(NavigationActions.back());
        return true;
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading startAsync={this._loadAssetsAsync}
                onFinish={() => this.setState({ isReady: true })}
                onError={console.warn}/>            
        }

        if (!this.props.login.isRehydrated) {
            return <Image source={Splash} style={{...Global.fullScreen}} />;
        }

        return (
            <RootNavigation 
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav})} />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.get('nav'),
    login: state.get('login').toJS()
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}