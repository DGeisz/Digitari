import React from "react";
import MainEntry from "./src/components/MainEntry";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import Post from "./src/building_blocks/post/Post";
import { postExampleNoLink } from "./src/building_blocks/post/PostTypes";


export default function App() {
    // Used for creating new components
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <MainEntry />
            </SafeAreaProvider>
        </NavigationContainer>
    );
}
