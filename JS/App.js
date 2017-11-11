import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { BackHandler, AsyncStorage, Image } from 'react-native';

import store from './redux/store';
import RootNavigation from './navigators/Root';
import * as Global from './styles/Global';
import Splash from '../Assets/splash_screen.png'

export class App extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.login.isRehydrated !== nextProps.login.isRehydrated;
    }



    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
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
        if (!this.props.login.isRehydrated) {
            return (
                <Image style={{...Global.fullScreen}} source={Splash} />
            );
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