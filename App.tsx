import React from "react";
import MainEntry from "./src/view_tree/MainEntry";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MockedProvider } from "@apollo/client/testing";
import { allMocks } from "./src/global_gql/Mocks";
import { Platform, UIManager } from "react-native";

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
                    <MainEntry />
                </SafeAreaProvider>
            </MockedProvider>
        </NavigationContainer>
    );
}
