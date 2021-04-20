import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";

const Tab = createMaterialTopTabNavigator();

const Follows: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={"Followers"}
                component={View}
                options={{
                    tabBarLabel: ({ color }) => (
                        <TabLabel title={"Followers"} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={"Following"}
                component={View}
                options={{
                    tabBarLabel: ({ color }) => (
                        <TabLabel title={"Following"} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Follows;
