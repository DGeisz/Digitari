import React, { useEffect } from "react";
import { Platform, UIManager } from "react-native";
import * as Linking from "expo-linking";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { cache } from "./src/global_state/Cache";
import AppView from "./src/view_tree/AppView";
import Amplify, { Auth } from "aws-amplify";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import { AUTH_TYPE } from "aws-appsync";
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import * as Notifications from "expo-notifications";
import { PushNotificationType } from "./src/global_types/PushTypes";

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
    // httpLink,
    createSubscriptionHandshakeLink({ url, region, auth }),
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

const prefix = Linking.createURL("/");

const linking: LinkingOptions = {
    prefixes: [prefix],
    config: {
        screens: {
            TabNav: {
                screens: {
                    Wallet: "wallet",
                },
            },
            NewPost: "new-post",
            User: "user/:uid",
            Convo: "convo/:cvid/:pid",
        },
    },
    subscribe(listener) {
        Notifications.addNotificationResponseReceivedListener((response) => {
            const data = response.notification.request.content.data;

            const notificationType = data.type as PushNotificationType;
            const notificationContent = data.content as string;

            switch (notificationType) {
                case PushNotificationType.ConvoBlocked:
                    listener(prefix + `convo/${notificationContent}`);
                    break;
                case PushNotificationType.NewConvo:
                    listener(prefix + `convo/${notificationContent}`);
                    break;
                case PushNotificationType.ConvoFinished:
                    listener(prefix + `convo/${notificationContent}`);
                    break;
                case PushNotificationType.ConvoDismissed:
                    listener(prefix + `convo/${notificationContent}`);
                    break;
                case PushNotificationType.Message:
                    listener(prefix + `convo/${notificationContent}`);
                    break;
                case PushNotificationType.UserFollowed:
                    listener(prefix + `user/${notificationContent}`);
                    break;
                case PushNotificationType.UserFollowedCommunity:
                    listener(prefix + `user/${notificationContent}`);
                    break;
            }
        });
    },
};

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
    useEffect(() => {
        console.log("Here's the prefix!:", prefix);
    }, []);

    return (
        <NavigationContainer linking={linking}>
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
