import React from "react";
import MainEntry from "./src/view_tree/MainEntry";
import { allMocks } from "./src/global_gql/Mocks";
import { Platform, UIManager, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MockedProvider } from "@apollo/client/testing";
import { SafeAreaProvider } from "react-native-safe-area-context";

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function App() {
    return (
        <NavigationContainer>
            <MockedProvider mocks={allMocks} addTypename={false}>
                <SafeAreaProvider>
                    {/*<View/>*/}
                    <MainEntry />
                </SafeAreaProvider>
            </MockedProvider>
        </NavigationContainer>
    );
}
