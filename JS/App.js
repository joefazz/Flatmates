import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { BackHandler, AsyncStorage } from 'react-native';

import store from './redux/store';
import RootNavigation from './navigators/Root';

export class App extends React.Component {
    componentDidMount() {
        AsyncStorage.clear();
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
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
        return (
            <RootNavigation 
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav})} />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.get('nav')
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