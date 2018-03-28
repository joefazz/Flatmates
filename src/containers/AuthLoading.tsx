import * as React from "react";
import { Image, StatusBar, StyleSheet, View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import splash_screen from "../../Assets/splash_screen.png";
import { LoginState } from "../types/ReduxTypes";
import { toConstantHeight, toConstantWidth } from "../utils/PercentageConversion";
import Client from "../Client";
import { USER_LOGIN_QUERY } from "../graphql/queries";
import { UserLoginQuery } from "../graphql/Types";
import { ApolloQueryResult } from "apollo-client";

interface Props {
    login: LoginState;
    navigation: {
        navigate: (route) => void;
    };
}

class AuthLoadingScreen extends React.Component<Props> {
    constructor(props) {
        super(props);
        this._bootstrap();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrap = async () => {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        const { data }: ApolloQueryResult<UserLoginQuery> = await Client.query<UserLoginQuery>({
            variables: { facebookUserId: this.props.login.fbUserId },
            query: USER_LOGIN_QUERY
        });

        if (data.user === null) {
            AsyncStorage.clear()
                .then(() => this.props.navigation.navigate("Login"))
                .catch((error) => console.log(error));
        } else if (this.props.login.fbAccessToken && this.props.login.fbAccessToken !== "") {
            if (!data.user.isVerified) {
                this.props.navigation.navigate("Home");
            } else {
                this.props.navigation.navigate("ReadOnly");
            }
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={"default"} />
                <Image
                    style={{ width: toConstantWidth(100), height: toConstantHeight(100) }}
                    source={splash_screen}
                    resizeMode={"cover"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps)(AuthLoadingScreen);
