import React, { useEffect } from "react";
import { Platform, UIManager } from "react-native";
import * as Linking from "expo-linking";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import {
    initialWindowMetrics,
    SafeAreaProvider,
} from "react-native-safe-area-context";
import { cache } from "./src/global_state/Cache";
import AppView from "./src/view_tree/AppView";
import Amplify, { Auth } from "aws-amplify";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import { AUTH_TYPE } from "aws-appsync";
import { ApolloClient, ApolloLink, ApolloProvider } from "@apollo/client";
import * as Notifications from "expo-notifications";
import * as ScreenOrientation from "expo-screen-orientation";
import { OrientationLock } from "expo-screen-orientation";
import { PushNotificationType } from "./src/global_types/PushTypes";
import { enableScreens } from "react-native-screens";
import { useApollo } from "./src/global_gql/hooks/use_apollo/use_apollo";

enableScreens();

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
                case PushNotificationType.CoinDonated:
                    listener(prefix + `user/${notificationContent}`);
                    break;
            }
        });
    },
};

export default function App() {
    useEffect(() => {
        ScreenOrientation.lockAsync(OrientationLock.PORTRAIT).then();
    }, []);

    const client = useApollo();

    return (
        <NavigationContainer linking={linking}>
            <ApolloProvider client={client}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <AppView />
                </SafeAreaProvider>
            </ApolloProvider>
        </NavigationContainer>
    );
}
