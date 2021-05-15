import React, { useEffect } from "react";
import TabNav from "./routes/tab_nav/TabNav";
import Convo from "./screens/convo/Convo";
import NewResponse from "./screens/new_response/NewResponse";
import PostScreen from "./screens/post_screen/PostScreen";
import AccountSettings from "./screens/account_settings/AccountSettings";
import { getTabNavHeaderTitle } from "./routes/tab_nav/TabNavUtils";
import { createStackNavigator } from "@react-navigation/stack";
import { MainEntryStack } from "./MainEntryNavTypes";
import NewCommunity from "./screens/new/screens/new_community/NewCommunity";
import Community from "./screens/community/Community";
import User from "./screens/user/User";
import Follows from "./screens/follows/Follows";
import NewPost from "./screens/new/screens/new_post/NewPost";
import { useRealtimeUpdates } from "./hooks/use_realtime_updates/use_realtime_updates";
import { useMutation } from "@apollo/client";
import {
    REGISTER_PUSH,
    RegisterPushData,
    RegisterPushVariables,
} from "./gql/Mutations";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import ReportPost from "./screens/reports/report_post/ReportPost";
import ReportConvo from "./screens/reports/report_convo/ReportConvo";
import ReportUser from "./screens/reports/report_user/ReportUser";
import ReportCommunity from "./screens/reports/report_community/ReportCommunity";

const RootStack = createStackNavigator<MainEntryStack>();

const MainEntry: React.FC = () => {
    /*
     * Handle realtime subscriptions
     */
    useRealtimeUpdates();

    /*
     * Handle push notifications
     */
    const [registerPush] = useMutation<RegisterPushData, RegisterPushVariables>(
        REGISTER_PUSH
    );

    /*
     * Register for push notifications
     */
    useEffect(() => {
        if (Constants.isDevice) {
            (async () => {
                try {
                    const {
                        status: existingStatus,
                    } = await Notifications.getPermissionsAsync();

                    let finalStatus = existingStatus;

                    if (existingStatus !== "granted") {
                        const {
                            status,
                        } = await Notifications.requestPermissionsAsync();

                        finalStatus = status;
                    }

                    if (finalStatus !== "granted") {
                        /*
                         * We officially failed to get permission to send push
                         */

                        return;
                    }

                    const token = (await Notifications.getExpoPushTokenAsync())
                        .data;

                    try {
                        await registerPush({
                            variables: {
                                token,
                            },
                        });
                    } catch (_) {
                        console.log("Already registered, or perhaps error");
                    }
                } catch (e) {
                    console.log("Error in push registration flow");
                }
            })();
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
            }).then();
        }
    }, []);

    return (
        <RootStack.Navigator
            initialRouteName="TabNav"
            screenOptions={{
                headerTruncatedBackTitle: "",
                headerBackTitle: "",
            }}
        >
            <RootStack.Screen
                name="TabNav"
                component={TabNav}
                options={({ route }) => {
                    return {
                        headerTitle: getTabNavHeaderTitle(route),
                    };
                }}
            />
            <RootStack.Screen name="Convo" component={Convo} />
            <RootStack.Screen
                name="NewResponse"
                component={NewResponse}
                options={{ title: "New Message" }}
                initialParams={{ tname: "", pid: "", responseCost: 0 }}
            />
            <RootStack.Screen
                name="PostScreen"
                component={PostScreen}
                options={{ title: "Post" }}
            />
            <RootStack.Screen
                name="AccountSettings"
                component={AccountSettings}
            />
            <RootStack.Screen
                name="NewCommunity"
                options={{ title: "New Community" }}
                component={NewCommunity}
            />
            <RootStack.Screen
                name="Community"
                component={Community}
                initialParams={{ cmid: "" }}
            />
            <RootStack.Screen
                name="User"
                component={User}
                initialParams={{ uid: "" }}
            />
            <RootStack.Screen
                name="Follows"
                component={Follows}
                initialParams={{ uid: "", name: "" }}
                options={({ route }) => ({ title: route.params.name })}
            />
            <RootStack.Screen
                name="NewPost"
                component={NewPost}
                options={{ title: "New Post" }}
            />
            {/*
             * Reporting
             */}
            <RootStack.Screen
                name="ReportPost"
                component={ReportPost}
                options={{ title: "Report post" }}
            />
            <RootStack.Screen
                name="ReportConvo"
                component={ReportConvo}
                options={{ title: "Report convo" }}
            />
            <RootStack.Screen
                name="ReportUser"
                component={ReportUser}
                options={{ title: "Report user" }}
            />
            <RootStack.Screen
                name="ReportCommunity"
                component={ReportCommunity}
                options={{ title: "Report community" }}
            />
        </RootStack.Navigator>
    );
};

export default MainEntry;
