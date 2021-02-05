import * as React from "react";
import { ScrollView, View } from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import ProfileHeader from "./sub_screens/profile_header/ProfileHeader";
import UserPosts from "./sub_screens/user_posts/UserPosts";
import TabLabel from "../../../../../global_building_blocks/tab_label/TabLabel";
import UserConvos from "./sub_screens/user_convos/UserConvos";
import UserRankings from "./sub_screens/user_ranking/UserRanking";
import UserChallenges from "./sub_screens/user_challenges/UserChallenges";

interface Props {}

const Tab = createMaterialTopTabNavigator();

const Profile: React.FC<Props> = () => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <ScrollView>
                <ProfileHeader/>
                <Tab.Navigator tabBarOptions={{}}>
                    <Tab.Screen name="UserPosts" component={UserPosts} options={{
                        tabBarLabel: ({color}) => <TabLabel title={"Posts"} color={color}/>
                    }}/>
                    <Tab.Screen name="UserConvos" component={UserConvos} options={{
                        tabBarLabel: ({color}) => <TabLabel title={"Convos"} color={color}/>,
                    }}/>
                    <Tab.Screen name="UserRanking" component={UserRankings} options={{
                        tabBarLabel: ({color}) => <TabLabel title={"Ranking"} color={color}/>
                    }}/>
                </Tab.Navigator>
            </ScrollView>
        </View>
        );
};

export default Profile;
