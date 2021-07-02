import React from "react";
import { ScrollView, Text, View } from "react-native";
import { localUid } from "../../../../../../global_state/UserState";
import { useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { shopStyles } from "../../styles/ShopStyles";
import {
    bioColor2Name,
    BioColors,
    bioColorToStyle,
    BioFontsEnum,
    ProfileColors,
} from "../../../../../../global_types/ShopTypes";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { bioFont2Style } from "../bio_font/fonts/fonts";
import { EXAMPLE_BIO } from "../../building_blocks/example_bio/example_bio";
import { palette } from "../../../../../../global_styles/Palette";

const BioColor: React.FC = () => {
    const uid = localUid();

    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    if (!data?.user || loading) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <ScrollView style={shopStyles.outerContainer}>
            <View style={shopStyles.container}>
                <View style={shopStyles.headerContainer}>
                    <Text style={shopStyles.headerTitle}>Bio Color</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.shopDescription}>
                            The font color used for your profile bio.
                        </Text>
                    </View>
                </View>
                {Object.values(BioColors)
                    .filter((color) => !isNaN(Number(color)))
                    .map((color) => {
                        color = color as BioColors;

                        return (
                            <ShopItem
                                key={color}
                                title={bioColor2Name(color)}
                                description={"buy color"}
                                purchaseTitle={"Buy Color"}
                                price={20}
                                userBolts={data?.user.bolts}
                                alreadyOwns={data?.user.bioColorsPurchased.includes(
                                    color
                                )}
                                alreadySelected={data?.user.bioColor === color}
                            >
                                <Text
                                    style={[
                                        bioFont2Style(
                                            BioFontsEnum.WhenTypewriters
                                        ),
                                        bioColorToStyle(color),
                                    ]}
                                >
                                    {!!data?.user.bio
                                        ? data.user.bio
                                        : EXAMPLE_BIO}
                                </Text>
                            </ShopItem>
                        );
                    })}
            </View>
        </ScrollView>
    );
};

export default BioColor;
