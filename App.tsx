import React from "react";
import { allMocks } from "./src/global_gql/Mocks";
import { Platform, UIManager } from "react-native";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { MockedProvider } from "@apollo/client/testing";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { cache } from "./src/global_state/Cache";
import AppView from "./src/view_tree/AppView";
import Amplify from "aws-amplify";
import * as SplashScreen from "expo-splash-screen";

Amplify.configure({
    Auth: {
        identityPoolId: "us-east-2:d50a353c-1d9f-4bd3-9494-9b5e6d5aadaa",
        region: "us-east-2",
        identityPoolRegion: "us-east-2",
        userPoolId: "us-east-2_yLvvBYODa",
        userPoolWebClientId: "5f052aptiplnl2mu8mmh2t1ahc",
        oauth: {
            domain: "digitari.auth.us-east-2.amazoncognito.com",
            scope: ["email", "openid", "profile"],
            redirectSignIn: Linking.makeUrl(),
            redirectSignOut: Linking.makeUrl(),
            responseType: "code",
        },
    },
});

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function App() {
    React.useEffect(() => {
        (async () => {
            await SplashScreen.preventAutoHideAsync();
        })();
    });

    return (
        <NavigationContainer>
            <MockedProvider mocks={allMocks} cache={cache}>
                <SafeAreaProvider>
                    <AppView />
                </SafeAreaProvider>
            </MockedProvider>
        </NavigationContainer>
    );
}
