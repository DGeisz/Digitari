import React, { useEffect, useState } from "react";
import { Platform, UIManager } from "react-native";
import * as Linking from "expo-linking";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import {
    initialWindowMetrics,
    SafeAreaProvider,
} from "react-native-safe-area-context";
import AppView from "./src/view_tree/AppView";
import Amplify from "aws-amplify";
import { ApolloProvider } from "@apollo/client";
import * as Notifications from "expo-notifications";
import { PushNotificationType } from "./src/global_types/PushTypes";
import { enableScreens } from "react-native-screens";
import { useApollo } from "./src/global_gql/hooks/use_apollo/use_apollo";
import { setStatusBarStyle } from "expo-status-bar";
import { EventType } from "expo-linking";
import AppLoading from "expo-app-loading";

/*
 * Font imports
 */
import { useFonts } from "expo-font";
import { Graduate_400Regular } from "@expo-google-fonts/graduate";
import { Orbitron_700Bold } from "@expo-google-fonts/orbitron";
import { Sancreek_400Regular } from "@expo-google-fonts/sancreek";
import { Codystar_400Regular } from "@expo-google-fonts/codystar";
import { PrincessSofia_400Regular } from "@expo-google-fonts/princess-sofia";
import { Frijole_400Regular } from "@expo-google-fonts/frijole";
import { Creepster_400Regular } from "@expo-google-fonts/creepster";
import { HomemadeApple_400Regular } from "@expo-google-fonts/homemade-apple";
import { Nosifer_400Regular } from "@expo-google-fonts/nosifer";
import { UnifrakturMaguntia_400Regular } from "@expo-google-fonts/unifrakturmaguntia";
import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import { ButterflyKids_400Regular } from "@expo-google-fonts/butterfly-kids";
import { BungeeShade_400Regular } from "@expo-google-fonts/bungee-shade";
import { Bangers_400Regular } from "@expo-google-fonts/bangers";
import { FasterOne_400Regular } from "@expo-google-fonts/faster-one";
import { CaesarDressing_400Regular } from "@expo-google-fonts/caesar-dressing";
import { Ballet_400Regular } from "@expo-google-fonts/ballet";
import { Monoton_400Regular } from "@expo-google-fonts/monoton";

/*
* For Info.plist:
* Put in NSExceptionDomains
        <key>localhost</key>
        <dict>
          <key>NSExceptionAllowsInsecureHTTPLoads</key>
          <true/>
        </dict>
* */

setStatusBarStyle("dark");
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
        initialRouteName: "TabNav",
        screens: {
            TabNav: {
                path: "tabs",
                screens: {
                    Wallet: "wallet",
                },
            },
            NewPost: "new-post",
            User: "user/:uid",
            Community: "community/:cmid",
            Convo: "convo/:cvid/:pid",
            PostScreen: "post/:pid",
        },
    },
    subscribe(listener) {
        const eventHandler = (event: EventType) => {
            listener(prefix + "tabs");
            listener(event.url);
        };

        Linking.addEventListener("url", eventHandler);

        const subscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
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
                        listener(prefix + "wallet");
                        break;
                    case PushNotificationType.UserFollowedCommunity:
                        listener(prefix + "wallet");
                        break;
                    case PushNotificationType.CoinDonated:
                        listener(prefix + "wallet");
                        break;
                    case PushNotificationType.ChallengeComplete:
                        listener(prefix + "wallet");
                        break;
                    case PushNotificationType.PostBlocked:
                        listener(prefix + `user/${notificationContent}`);
                        break;
                    case PushNotificationType.UserJoined:
                        listener(prefix + "wallet");
                        break;
                }
            }
        );

        return () => {
            Linking.removeEventListener("url", eventHandler);
            subscription.remove();
        };
    },
};

export default function App() {
    const client = useApollo();

    const [fontsLoaded] = useFonts({
        Graduate_400Regular,
        Orbitron_700Bold,
        Sancreek_400Regular,
        Codystar_400Regular,
        PrincessSofia_400Regular,
        Frijole_400Regular,
        Creepster_400Regular,
        HomemadeApple_400Regular,
        Nosifer_400Regular,
        UnifrakturMaguntia_400Regular,
        PressStart2P_400Regular,
        BungeeShade_400Regular,
        Bangers_400Regular,
        FasterOne_400Regular,
        CaesarDressing_400Regular,
        Ballet_400Regular,
        Monoton_400Regular,
        ButterflyKids_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

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
