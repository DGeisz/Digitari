import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NewConvos from "./sub_screens/new_convos/NewConvos";
import ActiveConvos from "./sub_screens/active_convos/ActiveConvos";
import TabLabel from "../../../../../global_building_blocks/tab_label/TabLabel";

interface Props {}

const Tab = createMaterialTopTabNavigator();

const Convos: React.FC<Props> = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="NewConvos"
                component={NewConvos}
                options={{
                    tabBarLabel: ({ color }) => (
                        <TabLabel title={"New"} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ActiveConvos"
                component={ActiveConvos}
                options={{
                    tabBarLabel: ({ color }) => (
                        <TabLabel title={"Active"} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Convos;
