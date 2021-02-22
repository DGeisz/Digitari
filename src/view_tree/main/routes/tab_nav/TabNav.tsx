import * as React from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import MainFeed from "./screens/main_feed/MainFeed";
import Wallet from "./screens/wallet/Wallet";
import Convos from "./screens/convos/Convos";
import Profile from "./screens/profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavProp } from "../../MainEntryNavTypes";
import { TabNavContext } from "./TabNavContext";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

interface Props {
    navigation: TabNavProp;
}

const TabNav: React.FC<Props> = (props) => {
    const openPost = (pid: string) => {
        props.navigation.navigate("PostScreen", { pid });
    };

    const openConvo = (cid: string) => {
        props.navigation.navigate("Convo", { cid });
    };

    const openNewMessage = (
        tname: string,
        pid: string,
        responseCost: number
    ) => {
        props.navigation.navigate("NewResponse", { tname, pid, responseCost });
    };

    const openNew = () => {
        props.navigation.navigate("New");
    };

    return (
        <TabNavContext.Provider
            value={{
                openPost,
                openConvo,
                openNewMessage,
                openNew,
            }}
        >
            <Tab.Navigator
                initialRouteName="MainFeed"
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
                />
                <Tab.Screen
                    name="Convos"
                    component={Convos}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name={"ios-chatbubbles"}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Wallet"
                    component={Wallet}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="wallet" size={size} color={color} />
                        ),
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
                />
            </Tab.Navigator>
        </TabNavContext.Provider>
    );
};

export default TabNav;
