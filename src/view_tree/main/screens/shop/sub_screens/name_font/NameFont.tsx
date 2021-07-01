import React from "react";
import { ScrollView, Text, View } from "react-native";
import { shopStyles } from "../../styles/ShopStyles";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import {
    nameFont2Name,
    NameFonts,
} from "../../../../../../global_types/UserTypes";
import { nameFontToStyle } from "./fonts/fonts";

const NameFont: React.FC = () => {
    return (
        <ScrollView style={shopStyles.outerContainer}>
            <View style={shopStyles.container}>
                {Object.values(NameFonts).map((nameFont) => (
                    <ShopItem key={nameFont} title={nameFont2Name(nameFont)}>
                        <Text
                            style={[
                                nameFontToStyle(nameFont),
                                { textAlign: "center" },
                            ]}
                        >
                            Danny Geisz
                        </Text>
                    </ShopItem>
                ))}
            </View>
        </ScrollView>
    );
};

export default NameFont;
