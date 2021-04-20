import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import { FollowsNavProp, FollowsRouteProp } from "../../MainEntryNavTypes";
import Followers from "./sub_screens/followers/Followers";
import Following from "./sub_screens/following/Following";

const Tab = createMaterialTopTabNavigator();

interface Props {
    navigation: FollowsNavProp;
    route: FollowsRouteProp;
}

const Follows: React.FC<Props> = (props) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={"Followers"}
                options={{
                    tabBarLabel: ({ color }) => (
                        <TabLabel title={"Followers"} color={color} />
                    ),
                }}
            >
                {() => (
                    <Followers
                        onSelectUser={(uid: string) =>
                            props.navigation.navigate("User", {
                                uid,
                            })
                        }
                        tid={props.route.params.uid}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name={"Following"}
                options={{
                    tabBarLabel: ({ color }) => (
                        <TabLabel title={"Following"} color={color} />
                    ),
                }}
            >
                {() => (
                    <Following
                        onSelectUser={(uid: string) =>
                            props.navigation.navigate("User", {
                                uid,
                            })
                        }
                        onSelectCommunity={(cmid: string) =>
                            props.navigation.navigate("Community", { cmid })
                        }
                        sid={props.route.params.uid}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default Follows;
