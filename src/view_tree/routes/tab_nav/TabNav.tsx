import * as React from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import MainFeed from "./screens/main_feed/MainFeed";
import Wallet from "./screens/wallet/Wallet";
import Convos from "./screens/convos/Convos";
import Profile from "./screens/profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

interface Props {}

const TabNav: React.FC<Props> = () => {
    return (
        <Tab.Navigator
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
                        <FontAwesome name={"user"} size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNav;
