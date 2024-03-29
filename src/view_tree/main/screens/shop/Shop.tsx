import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BasicProfile from "./sub_screens/basic_profile/BasicProfile";
import NameFont from "./sub_screens/name_font/NameFont";
import NameColor from "./sub_screens/name_color/NameColor";
import BioFont from "./sub_screens/bio_font/BioFont";
import BioColor from "./sub_screens/bio_color/BioColor";
import ProfileSticker from "./sub_screens/profile_sticker/ProfileSticker";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../../global_constants/screen_constants";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import { firstShop } from "../../../../global_state/FirstImpressionsState";
import WalletShopPage from "./sub_screens/wallet/Wallet";

const ShopTab = createMaterialTopTabNavigator();

const Shop: React.FC = () => {
    const [instructionsModalVisible, showInstructionsModal] = useState<boolean>(
        firstShop()
    );

    return (
        <>
            <InstructionsModal
                hideModal={() => showInstructionsModal(false)}
                visible={instructionsModalVisible}
            />
            <ShopTab.Navigator
                initialRouteName="BasicProfile"
                tabBarOptions={
                    SCREEN_LARGER_THAN_CONTENT
                        ? {}
                        : {
                              scrollEnabled: true,
                              tabStyle: {
                                  flex: 0,
                                  width: 120,
                                  padding: 0,
                              },
                          }
                }
            >
                <ShopTab.Screen
                    name="BasicProfile"
                    component={BasicProfile}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Basic Profile"} color={color} />
                        ),
                    }}
                />
                <ShopTab.Screen
                    name="Wallet"
                    component={WalletShopPage}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Wallet"} color={color} />
                        ),
                    }}
                />
                <ShopTab.Screen
                    name="ProfileSticker"
                    component={ProfileSticker}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Profile Icon"} color={color} />
                        ),
                    }}
                />
                <ShopTab.Screen
                    name="NameFont"
                    component={NameFont}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Name Font"} color={color} />
                        ),
                    }}
                />
                <ShopTab.Screen
                    name="NameColor"
                    component={NameColor}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Name Color"} color={color} />
                        ),
                    }}
                />
                <ShopTab.Screen
                    name="BioFont"
                    component={BioFont}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Bio Font"} color={color} />
                        ),
                    }}
                />
                <ShopTab.Screen
                    name="BioColor"
                    component={BioColor}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Bio Color"} color={color} />
                        ),
                    }}
                />
            </ShopTab.Navigator>
        </>
    );
};

export default Shop;
