import React, { useState } from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import MainFeed from "./screens/main_feed/MainFeed";
import Wallet from "./screens/wallet/Wallet";
import Convos from "./screens/convos/Convos";
import Profile from "./screens/profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavProp } from "../../MainEntryNavTypes";
import { TabNavContext } from "./TabNavContext";
import { TabNavTab } from "./TabNavTypes";
import { View } from "react-native";
import { styles } from "./TabNavStyles";
import UpdateIndicator from "./building_blocks/update_indicator/UpdateIndicator";
import { useQuery } from "@apollo/client";
import { localUid } from "../../../../global_state/UserState";
import {
    GET_UPDATE_FLAGS,
    GetUpdateFlagsData,
    GetUpdateFlagsVariables,
} from "./gql/Queries";
import CoinIndicator from "./building_blocks/coin_indicator/CoinIndicator";
import { firstTimeOpeningApp } from "../../../../global_state/FirstImpressionsState";
import SearchAndScan from "./screens/search/SearchAndScan";

const Tab = createBottomTabNavigator<TabNavTab>();

interface Props {
    navigation: TabNavProp;
}

const TabNav: React.FC<Props> = (props) => {
    const openPost = (pid: string) => {
        props.navigation.push("PostScreen", { pid });
    };

    const openConvo = (cvid: string, pid: string) => {
        props.navigation.push("Convo", { cvid, pid });
    };

    const openNewMessage = (
        tname: string,
        pid: string,
        responseCost: number
    ) => {
        props.navigation.push("NewResponse", { tname, pid, responseCost });
    };

    const openNew = () => {
        props.navigation.push("NewPost", {});
    };

    const openCommunity = (cmid: string) => {
        props.navigation.push("Community", { cmid });
    };

    const openUser = (uid: string) => {
        props.navigation.push("User", { uid });
    };

    const openFollows = (name: string, uid: string) => {
        props.navigation.push("Follows", { uid, name });
    };

    const openReport = (pid: string) => {
        props.navigation.push("ReportPost", { pid });
    };

    const openReportUser = (uid: string) => {
        props.navigation.push("ReportUser", { uid });
    };

    const openSettings = () => {
        props.navigation.push("Settings");
    };

    const openShop = (screen?: string) => {
        if (!!screen) {
            props.navigation.push("Shop", {
                screen,
            });
        } else {
            props.navigation.push("Shop");
        }
    };

    const openLevelUp = () => {
        props.navigation.push("LevelUp");
    };

    const [feedScrollIndex, setFeedScrollIndex] = useState<number>(0);
    const [convosScrollIndex, setConvosScrollIndex] = useState<number>(0);
    const [searchScrollIndex, setSearchScrollIndex] = useState<number>(0);
    const [transScrollIndex, setTransScrollIndex] = useState<number>(0);
    const [profileScrollIndex, setProfileScrollIndex] = useState<number>(0);

    const { data } = useQuery<GetUpdateFlagsData, GetUpdateFlagsVariables>(
        GET_UPDATE_FLAGS,
        {
            variables: {
                uid: localUid(),
            },
        }
    );

    let newConvoUpdate = false;
    let newTransactionUpdate = false;

    if (!!data?.user) {
        newConvoUpdate = data.user.newConvoUpdate;
        newTransactionUpdate = data.user.newTransactionUpdate;
    }

    return (
        <>
            <TabNavContext.Provider
                value={{
                    openPost,
                    openConvo,
                    openNewMessage,
                    openNew,
                    openCommunity,
                    openUser,
                    openFollows,
                    openReport,
                    openReportUser,
                    openSettings,
                    openShop,
                    openLevelUp,
                    feedScrollIndex,
                    convosScrollIndex,
                    searchScrollIndex,
                    transScrollIndex,
                    profileScrollIndex,
                }}
            >
                <Tab.Navigator
                    initialRouteName={
                        firstTimeOpeningApp() ? "Profile" : "MainFeed"
                    }
                    tabBarOptions={{
                        showLabel: false,
                        inactiveTintColor: "gray",
                    }}
                >
                    <Tab.Screen
                        name="MainFeed"
                        component={MainFeed}
                        listeners={{
                            tabPress() {
                                setFeedScrollIndex((index) => index + 1);
                            },
                        }}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <View style={styles.iconContainer}>
                                    <Entypo
                                        name="home"
                                        size={size}
                                        color={color}
                                    />
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Convos"
                        component={Convos}
                        listeners={{
                            tabPress() {
                                setConvosScrollIndex((index) => index + 1);
                            },
                        }}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <View style={styles.iconContainer}>
                                    {newConvoUpdate && <UpdateIndicator />}
                                    <Ionicons
                                        name={"ios-chatbubbles"}
                                        size={size}
                                        color={color}
                                    />
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchAndScan}
                        listeners={{
                            tabPress() {
                                setSearchScrollIndex((index) => index + 1);
                            },
                        }}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name={"search"}
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Wallet"
                        component={Wallet}
                        listeners={{
                            tabPress() {
                                setTransScrollIndex((index) => index + 1);
                            },
                        }}
                        options={{
                            tabBarIcon: ({ color, size }) => {
                                return (
                                    <View>
                                        {newTransactionUpdate && (
                                            <UpdateIndicator />
                                        )}
                                        <Entypo
                                            name="wallet"
                                            size={size}
                                            color={color}
                                        />
                                        <CoinIndicator />
                                    </View>
                                );
                            },
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        listeners={{
                            tabPress() {
                                setProfileScrollIndex((index) => index + 1);
                            },
                        }}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name={"user"}
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </TabNavContext.Provider>
        </>
    );
};

export default TabNav;
