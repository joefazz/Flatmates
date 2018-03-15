import * as React from "react";
import { ActivityIndicator, ImageBackground, StatusBar, StyleSheet, View } from "react-native";
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
            this.props.navigation.navigate("Login");
        } else if (this.props.login.fbAccessToken && this.props.login.fbAccessToken !== "") {
            if (data.user.isVerified) {
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
                <ActivityIndicator />
                <StatusBar barStyle={"default"} />
                <ImageBackground
                    style={{ width: toConstantWidth(50), height: toConstantHeight(50) }}
                    source={splash_screen}
                    resizeMode={"stretch"}
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
