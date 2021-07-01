import React from "react";
import { ScrollView, Text, View } from "react-native";
import { shopStyles } from "../../styles/ShopStyles";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { nameFontToStyle } from "./fonts/fonts";
import {
    nameFont2Name,
    nameFontEnum2FontName,
    NameFontsEnum,
    profileColor2Style,
} from "../../../../../../global_types/ShopTypes";
import { localUid } from "../../../../../../global_state/UserState";
import { useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";

const NameFont: React.FC = () => {
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
                    .map((nameFont) => {
                        const font = nameFont as NameFontsEnum;

                        return (
                            <ShopItem
                                key={nameFont}
                                title={nameFont2Name(font)}
                                description={"buy font"}
                                purchaseTitle={"Buy Font"}
                                price={20}
                                userBolts={data?.user.bolts}
                                alreadyOwns={data?.user.nameFontsPurchased.includes(
                                    font
                                )}
                                alreadySelected={data?.user.nameFont === font}
                            >
                                <Text
                                    style={[
                                        nameFontToStyle(font),
                                        profileColor2Style(
                                            data?.user.nameColor
                                        ),
                                    ]}
                                >
                                    {`${data?.user.firstName} ${data?.user.lastName}`}
                                </Text>
                            </ShopItem>
                        );
                    })}
            </View>
        </ScrollView>
    );
};

export default NameFont;
