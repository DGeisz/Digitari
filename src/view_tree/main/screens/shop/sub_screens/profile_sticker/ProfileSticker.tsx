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
    nameFont2Name,
    NameFontsEnum,
    profileColor2Style,
    ProfileStickers,
    stickerPrice,
    stickerToEmoji,
    stickerToName,
} from "../../../../../../global_types/ShopTypes";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { nameFontToStyle } from "../name_font/fonts/fonts";
import { styles } from "./ProfileStickerStyles";
import {
    DOUBLE_NEWLINE,
    NEWLINE,
} from "../../../../../../global_utils/StringUtils";

const ProfileSticker: React.FC = () => {
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
                    <Text style={shopStyles.headerTitle}>Profile Icon</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.shopDescription}>
                            Feelin' a little zesty? Maybe you wanna shake things
                            up a bit? Give your profile some extra shazam?
                            {DOUBLE_NEWLINE}
                            Then pick an icon, silly. They're all the rage these
                            days.
                        </Text>
                    </View>
                </View>
                {Object.values(ProfileStickers)
                    .filter((sticker) => !isNaN(Number(sticker)))
                    .map((sticker) => {
                        sticker = sticker as ProfileStickers;

                        return (
                            <ShopItem
                                key={sticker}
                                title={stickerToName(sticker)}
                                description={"unlock this icon"}
                                purchaseTitle={"Unlock Icon"}
                                price={stickerPrice(sticker)}
                                userBolts={data?.user.bolts}
                                alreadyOwns={data?.user.profileStickersPurchased.includes(
                                    sticker
                                )}
                                alreadySelected={
                                    data?.user.profileSticker === sticker
                                }
                            >
                                {!!sticker ? (
                                    <Text style={styles.icon}>
                                        {stickerToEmoji(sticker)}
                                    </Text>
                                ) : (
                                    <Text style={styles.noneText}>None</Text>
                                )}
                            </ShopItem>
                        );
                    })}
            </View>
        </ScrollView>
    );
};

export default ProfileSticker;
