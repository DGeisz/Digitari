import React from "react";
import { ScrollView, Text, View } from "react-native";
import { shopStyles } from "../../styles/ShopStyles";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { nameFontToStyle } from "./fonts/fonts";
import {
    nameFont2Name,
    nameFontEnum2FontName,
    NameFontsEnum,
} from "../../../../../../global_types/ShopTypes";

const NameFont: React.FC = () => {
    return (
        <ScrollView style={shopStyles.outerContainer}>
            <View style={shopStyles.container}>
                <View style={shopStyles.headerContainer}>
                    <Text style={shopStyles.headerTitle}>Name Font</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.shopDescription}>
                            The font used for your name on your profile and on
                            your posts.
                        </Text>
                    </View>
                </View>
                {Object.values(NameFontsEnum)
                    .filter((font) => !isNaN(Number(font)))
                    .map((nameFont) => (
                        <ShopItem
                            key={nameFont}
                            title={nameFont2Name(nameFont as NameFontsEnum)}
                        >
                            <Text
                                style={[
                                    nameFontToStyle(
                                        nameFontEnum2FontName(
                                            nameFont as NameFontsEnum
                                        )
                                    ),
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
