import * as React from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import ProfileHeader from "./sub_screens/profile_header/ProfileHeader";
import UserPosts from "./sub_screens/user_posts/UserPosts";
import TabLabel from "../../../../../global_building_blocks/tab_label/TabLabel";
import UserConvos from "./sub_screens/user_convos/UserConvos";
import { exampleUser } from "../../../../../global_types/UserTypes";
import UserStats from "./sub_screens/user_stats/UserStats";

interface Props {}

const Tab = createMaterialTopTabNavigator();

const Profile: React.FC<Props> = () => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <ScrollView onScroll={({nativeEvent: {contentOffset: {x, y}}}) => {console.log("Offset:", x, y)}}
            scrollEventThrottle={16}>
                <ProfileHeader user={exampleUser} />
                <Tab.Navigator tabBarOptions={{}}>
                    <Tab.Screen
                        name="UserPosts"
                        component={UserPosts}
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Posts"} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="UserConvos"
                        component={UserConvos}
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Convos"} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="UserStats"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Stats"} color={color} />
                            ),
                        }}
                    >
                        {() => <UserStats user={exampleUser} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </ScrollView>
        </View>
    );
};

export default Profile;
