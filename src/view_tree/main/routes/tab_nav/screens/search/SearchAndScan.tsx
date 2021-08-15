import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SearchAndScanNavType } from "./SearchAndScanNavTypes";
import Scan from "./sub_screens/scan/Scan";
import Search from "./sub_screens/search/Search";
import TabLabel from "../../../../../../global_building_blocks/tab_label/TabLabel";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { TabNavContext } from "../../TabNavContext";

const Tab = createMaterialTopTabNavigator<SearchAndScanNavType>();

const SearchAndScan: React.FC = () => {
    const { openNew } = useContext(TabNavContext);

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name={"Search"}
                    component={Search}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Search"} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name={"Scan"}
                    component={Scan}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Scan"} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
            <NewButton openNew={openNew} />
        </>
    );
};

export default SearchAndScan;
