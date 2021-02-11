import React from "react";
import { allMocks } from "./src/global_gql/Mocks";
import { Platform, UIManager } from "react-native";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { MockedProvider } from "@apollo/client/testing";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { cache } from "./src/global_state/Cache";
import AppView from "./src/view_tree/AppView";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
    Auth: {
        identityPoolId: "us-east-2:eb17ae24-27f1-4e1b-87d5-70839cbd3ca1",
        region: "us-east-2",
        identityPoolRegion: "us-east-2",
        userPoolId: "us-east-2_yLvvBYODa",
        userPoolWebClientId: "297iqrpl2a6a6gbu84p6iivvo7",
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
