import React from "react";
import { Platform, UIManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { MockedProvider } from "@apollo/client/testing";
import { allMocks } from "./src/global_gql/Mocks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { cache } from "./src/global_state/Cache";
import AppView from "./src/view_tree/AppView";
import Amplify, { Auth } from "aws-amplify";
import * as SplashScreen from "expo-splash-screen";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    NormalizedCacheObject,
} from "@apollo/client";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";

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

const url =
    "https://yvetqqqrlbgklmrodh6dx5ix6a.appsync-api.us-east-2.amazonaws.com/graphql";
const region = "us-east-2";
const auth: AuthOptions = {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => {
        try {
            const session = await Auth.currentSession();

            return session.getIdToken().getJwtToken();
        } catch (e) {
            return "";
        }
    },
};

const httpLink = createHttpLink({ uri: url });

const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    httpLink,
    // createSubscriptionHandshakeLink({ url, region, auth }),
]);

const client = new ApolloClient({
    link,
    cache,
});

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function App() {
    // const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject>>(new ApolloClient({ link, cache }));

    // React.useEffect(() => {
    //     (async () => {
    //         await SplashScreen.preventAutoHideAsync();
    //
    //         await persistCache({
    //             cache,
    //             storage: new AsyncStorageWrapper(AsyncStorage)
    //         });
    //
    //         setClient(new ApolloClient({
    //             link,
    //             cache
    //         }));
    //     })();
    // }, []);

    return (
        <NavigationContainer>
            <ApolloProvider client={client}>
                {/*<MockedProvider cache={cache} mocks={allMocks} addTypename={false}>*/}
                <SafeAreaProvider>
                    <AppView />
                </SafeAreaProvider>
                {/*</MockedProvider>*/}
            </ApolloProvider>
        </NavigationContainer>
    );
}
