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
    bioColorToStyle,
    bioFont2Name,
    BioFontsEnum,
} from "../../../../../../global_types/ShopTypes";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { bioFont2Style } from "./fonts/fonts";
import { EXAMPLE_BIO } from "../../building_blocks/example_bio/example_bio";

const BioFont: React.FC = () => {
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
                    <Text style={shopStyles.headerTitle}>Bio Font</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.shopDescription}>
                            The font used for your profile bio.
                        </Text>
                    </View>
                </View>
                {Object.values(BioFontsEnum)
                    .filter((font) => !isNaN(Number(font)))
                    .map((font) => {
                        font = font as BioFontsEnum;

                        return (
                            <ShopItem
                                key={font}
                                title={bioFont2Name(font)}
                                description={"buy font"}
                                purchaseTitle={"Buy Font"}
                                price={20}
                                userBolts={data?.user.bolts}
                                alreadyOwns={data?.user.bioFontsPurchased.includes(
                                    font
                                )}
                                alreadySelected={data?.user.bioFont === font}
                            >
                                <Text
                                    style={[
                                        bioFont2Style(font),
                                        bioColorToStyle(data?.user.bioColor),
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

export default BioFont;
