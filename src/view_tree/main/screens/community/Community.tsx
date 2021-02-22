import * as React from "react";
import { View } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import CommunityHeader from "./sub_screens/community_header/CommunityHeader";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import { exampleCommunity } from "../../../../global_types/CommunityTypes";

interface Props {}

const Tab = createMaterialCollapsibleTopTabNavigator();

const Community: React.FC<Props> = () => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <Tab.Navigator
                collapsibleOptions={{
                    renderHeader: () => (
                        <CommunityHeader community={exampleCommunity} />
                    ),
                    headerHeight: 250,
                }}
            >
                <Tab.Screen
                    name="CommunityPosts"
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Posts"} color={color} />
                        ),
                    }}
                >
                    {() => <View />}
                </Tab.Screen>
                <Tab.Screen
                    name="CommunityConvos"
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Convos"} color={color} />
                        ),
                    }}
                >
                    {() => <View />}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
};

export default Community;
