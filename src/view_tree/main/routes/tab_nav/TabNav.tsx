import React, { useContext, useEffect, useRef } from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import MainFeed from "./screens/main_feed/MainFeed";
import Wallet from "./screens/wallet/Wallet";
import Convos from "./screens/convos/Convos";
import Profile from "./screens/profile/Profile";
import Search from "./screens/search/Search";
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
import { getTierWage } from "../../../../global_types/TierTypes";
import CoinIndicator from "./building_blocks/coin_indicator/CoinIndicator";
import ChallengeCompleteModal from "./building_blocks/challenge_complete_modal/ChallengeCompleteModal";
import { addNewReceipt } from "../../../../global_state/CoinUpdates";
import { TutorialContext } from "../../../context/tutorial_context/TutorialContext";
import { tutorialUser } from "./screens/profile/data/tutorial_user/tutorial_user";

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

    const { data } = useQuery<GetUpdateFlagsData, GetUpdateFlagsVariables>(
        GET_UPDATE_FLAGS,
        {
            variables: {
                uid: localUid(),
            },
        }
    );

    /*
     * Handle opening the tutorial
     */
    const { tutorialActive } = useContext(TutorialContext);

    let newConvoUpdate = false;
    let newTransactionUpdate = false;

    if (!!data?.user) {
        newConvoUpdate = data.user.newConvoUpdate;
        newTransactionUpdate = data.user.newTransactionUpdate;

        if (
            getTierWage(data.user.ranking, data.user.lastCollectionTime)[0] >=
            10
        ) {
            newTransactionUpdate = true;
        }
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
                }}
            >
                <ChallengeCompleteModal
                    openWallet={() => {
                        props.navigation.navigate("TabNav", {
                            screen: "Wallet",
                        });
                    }}
                />
                <Tab.Navigator
                    initialRouteName={tutorialActive ? "Profile" : "MainFeed"}
                    tabBarOptions={{
                        showLabel: false,
                        inactiveTintColor: "gray",
                    }}
                >
                    <Tab.Screen
                        name="MainFeed"
                        component={MainFeed}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Entypo name="home" size={size} color={color} />
                            ),
                        }}
                        listeners={{
                            tabPress: (e) => {
                                if (tutorialActive) {
                                    e.preventDefault();
                                }
                            },
                        }}
                    />
                    <Tab.Screen
                        name="Convos"
                        component={Convos}
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
                        listeners={{
                            tabPress: (e) => {
                                if (tutorialActive) {
                                    e.preventDefault();
                                }
                            },
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={Search}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name={"search"}
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                        listeners={{
                            tabPress: (e) => {
                                if (tutorialActive) {
                                    e.preventDefault();
                                }
                            },
                        }}
                    />
                    <Tab.Screen
                        name="Wallet"
                        component={Wallet}
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
                        listeners={{
                            tabPress: (e) => {
                                if (tutorialActive) {
                                    e.preventDefault();
                                }
                            },
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name={"user"}
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                        listeners={{
                            tabPress: (e) => {
                                if (tutorialActive) {
                                    e.preventDefault();
                                }
                            },
                        }}
                    />
                </Tab.Navigator>
            </TabNavContext.Provider>
        </>
    );
};

export default TabNav;
