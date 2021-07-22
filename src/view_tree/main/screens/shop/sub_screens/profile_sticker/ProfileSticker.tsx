import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { localUid } from "../../../../../../global_state/UserState";
import { useMutation, useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { shopStyles } from "../../styles/ShopStyles";
import {
    ProfileStickers,
    stickerPrice,
    stickerRequirement,
    stickerToEmoji,
    stickerToName,
} from "../../../../../../global_types/ShopTypes";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { styles } from "./ProfileStickerStyles";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import {
    BUY_STICKER,
    BuyStickerData,
    BuyStickerVariables,
    SELECT_STICKER,
    SelectStickerData,
    SelectStickerVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { calculateLevelInfo } from "../../../../../../global_utils/LevelUtils";

const ProfileSticker: React.FC = () => {
    const uid = localUid();

    const [iconLoading, setLoading] = useState<ProfileStickers | null>(null);

    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    const [buySticker] = useMutation<BuyStickerData, BuyStickerVariables>(
        BUY_STICKER,
        {
            update(cache, { data }) {
                if (typeof data?.buySticker === "number") {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            profileStickersPurchased(existing) {
                                return [...existing, data.buySticker];
                            },
                            bolts(existing) {
                                existing = parseInt(existing);

                                return (
                                    existing - stickerPrice(data.buySticker)
                                ).toString();
                            },
                        },
                    });
                }
            },
        }
    );

    const [selectSticker] = useMutation<
        SelectStickerData,
        SelectStickerVariables
    >(SELECT_STICKER, {
        update(cache, { data }) {
            if (typeof data?.selectSticker === "number") {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        profileSticker() {
                            return data.selectSticker;
                        },
                    },
                });
            }
        },
    });

    if (!data?.user || loading) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const level = calculateLevelInfo(parseInt(data.user.coinSpent))[0];
    const ranking = data.user.ranking;

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
                        const finalSticker = sticker as ProfileStickers;

                        return (
                            <ShopItem
                                key={finalSticker}
                                loading={iconLoading === finalSticker}
                                title={stickerToName(finalSticker)}
                                level={level}
                                ranking={ranking}
                                requirement={stickerRequirement(finalSticker)}
                                description={"unlock this icon"}
                                purchaseTitle={"Unlock Icon"}
                                price={stickerPrice(finalSticker)}
                                userBolts={parseInt(data?.user.bolts)}
                                alreadyOwns={data?.user.profileStickersPurchased.includes(
                                    finalSticker
                                )}
                                alreadySelected={
                                    data?.user.profileSticker === finalSticker
                                }
                                onConfirm={async () => {
                                    setLoading(finalSticker);

                                    try {
                                        await buySticker({
                                            variables: {
                                                sticker: finalSticker,
                                            },
                                            optimisticResponse: {
                                                buySticker: finalSticker,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log("Buy sticker error", e);
                                        }
                                    }

                                    setLoading(null);
                                }}
                                onSelect={async () => {
                                    setLoading(finalSticker);

                                    try {
                                        await selectSticker({
                                            variables: {
                                                sticker: finalSticker,
                                            },
                                            optimisticResponse: {
                                                selectSticker: finalSticker,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Select sticker error",
                                                e
                                            );
                                        }
                                    }

                                    setLoading(null);
                                }}
                            >
                                {!!sticker ? (
                                    <Text style={styles.icon}>
                                        {stickerToEmoji(finalSticker)}
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
