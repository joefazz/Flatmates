import * as React from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import splash_screen from '../../Assets/splash_screen.png';
import { LoginState } from '../types/ReduxTypes';
import { toConstantHeight, toConstantWidth } from '../utils/PercentageConversion';

interface Props {
    login: LoginState,
    navigation: {
        navigate: (route) => void;
    }
}

class AuthLoadingScreen extends React.Component<Props> {
    constructor(props) {
        super(props);
        this._bootstrap();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrap = () => {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(this.props.login.get('fbAccessToken') !== '' ? 'Home' : 'Login');
    };

  // Render any loading content that you like here
  render() {
        return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle='default' />
            <ImageBackground
                style={{ width: toConstantWidth(50), height: toConstantHeight(50) }}
                source={splash_screen}
                resizeMode={'stretch'}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:  {
        flex:  1
    }
})

const mapStateToProps = (state) => ({
    login:  state.get('login'),
});

export default connect(
    mapStateToProps
)(AuthLoadingScreen);