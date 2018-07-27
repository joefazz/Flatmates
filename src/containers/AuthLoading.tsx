import React from 'react';
import { Text, AsyncStorage, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Auth0 from 'react-native-auth0';
import splash_screen from '../../Assets/splash_screen.png';
import { LoginState } from '../types/ReduxTypes';
import { toConstantHeight, toConstantWidth } from '../utils/PercentageConversion';
import Client from '../Client';
import { USER_LOGIN_QUERY } from '../graphql/queries';
import { UserLoginQuery } from '../graphql/Types';
import { ApolloQueryResult } from 'apollo-client';
import { FontFactory } from '../consts/font';
import { Colors } from '../consts';
import { DOMAIN } from '../consts/endpoint';
import { clientId } from './Login';
import client from '../Client';
import { UPDATE_USER_MUTATION } from '../graphql/mutations';
import { VERIFY_EMAIL_MUTATION } from '../graphql/mutations/User/VerifyEmail';

interface Props {
    screenProps: { isRehydrated: boolean };
    login: LoginState;
    navigation: {
        navigate: (route, params?) => void;
    };
}

interface State { }

class AuthLoadingScreen extends React.Component<Props, State> {
    componentDidUpdate() {
        if (this.props.screenProps.isRehydrated) {
            this._bootstrap();
        }
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrap = async () => {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if (this.props.login.email) {
            const { data }: ApolloQueryResult<UserLoginQuery> = await Client.query<UserLoginQuery>({
                variables: { email: this.props.login.email },
                query: USER_LOGIN_QUERY,
                fetchPolicy: 'network-only'
            });

            if (!!data.user && data.user.email_verified) {
                this.props.navigation.navigate('Home');
            }

            if (!!data.user && !data.user.email_verified) {
                let result = await fetch('https://flatmates-auth.eu.auth0.com/oauth/token',
                    {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            grant_type: 'client_credentials',
                            client_id: 'kJyhKNP7jn6drUFIP4vWD98eTjsnJKQ6',
                            client_secret: '18V1vcmTOJVDHt7OGm6WGfASCAcRTqruUsGTPjimmbqQwBBhyBKeGw58DvSQa2gd',
                            audience: 'https://flatmates-auth.eu.auth0.com/api/v2/'
                        })
                    });

                let json = await result.json();

                let userDetails = await fetch(`https://flatmates-auth.eu.auth0.com/api/v2/users?q=email:${data.user.email}&search_engine=v3`, { headers: { authorization: `Bearer ${json.access_token}` } }).then(res => res.json())

                console.log(userDetails);

                if (userDetails[0].email_verified) {
                    client.mutate({ mutation: VERIFY_EMAIL_MUTATION, variables: { id: data.user.id, email_verified: true } });
                    this.props.navigation.navigate('Home', { isReadOnly: false });
                } else {
                    alert('Verify your email address in order to access the full app\'s functionality')
                    this.props.navigation.navigate('Feed', { isReadOnly: true });
                }

            }

            if (data.user === null) {
                AsyncStorage.clear();
                this.props.navigation.navigate('Login');
            }
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}
                    source={splash_screen}
                    resizeMode={'cover'}
                />
                {/* <Text
                    style={{
                        position: 'absolute',
                        top: toConstantHeight(80),

                        fontSize: 24,
                        ...FontFactory({ weight: 'Bold' }),
                        color: 'white'
                    }}
                >
                    {!this.props.screenProps.isRehydrated ? 'Fetching data...' : 'Done'}
                </Text> */}
                <ActivityIndicator style={{
                    position: 'absolute',
                    top: toConstantHeight(80)
                }} size={'large'} color={Colors.white} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.brandPrimaryColor
    }
});

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, {})(AuthLoadingScreen);
