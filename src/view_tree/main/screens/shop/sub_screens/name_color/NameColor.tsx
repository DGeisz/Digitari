import React from "react";
import { ScrollView, Text, View } from "react-native";
import { shopStyles } from "../../styles/ShopStyles";
import { palette } from "../../../../../../global_styles/Palette";
import { localUid } from "../../../../../../global_state/UserState";
import { useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import {
    nameColorPrice,
    nameFontEnum2FontName,
    NameFontsEnum,
    profileColor2Name,
    profileColor2Style,
    ProfileColors,
} from "../../../../../../global_types/ShopTypes";
import { nameFontToStyle } from "../name_font/fonts/fonts";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";

const NameColor: React.FC = () => {
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
                    <Text style={shopStyles.headerTitle}>Name Color</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.shopDescription}>
                            I think we can agree your profile could use some
                            more color. {DOUBLE_NEWLINE}I wonder where we should
                            put it...😉
                        </Text>
                    </View>
                </View>
                {Object.values(ProfileColors)
                    .filter((color) => !isNaN(Number(color)))
                    .map((color) => {
                        color = color as ProfileColors;

                        return (
                            <ShopItem
                                key={color}
                                title={profileColor2Name(color)}
                                description={"unlock this color"}
                                purchaseTitle={"Unlock Color"}
                                price={nameColorPrice(color)}
                                userBolts={data?.user.bolts}
                                alreadyOwns={data?.user.nameColorsPurchased.includes(
                                    color
                                )}
                                alreadySelected={data?.user.nameColor === color}
                            >
                                <Text
                                    style={[
                                        nameFontToStyle(data?.user.nameFont),
                                        profileColor2Style(color),
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

export default NameColor;
