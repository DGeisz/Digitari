import React from "react";
import { ScrollView, Text, View } from "react-native";
import { shopStyles } from "../../styles/ShopStyles";
import { palette } from "../../../../../../global_styles/Palette";
import { localUid } from "../../../../../../global_state/UserState";
import { useMutation, useQuery } from "@apollo/client";
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
    profileColor2Name,
    profileColor2Style,
    ProfileColors,
    stickerPrice,
} from "../../../../../../global_types/ShopTypes";
import { nameFontToStyle } from "../name_font/fonts/fonts";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import {
    BUY_NAME_COLOR,
    BuyNameColorData,
    BuyNameColorsVariables,
    SELECT_NAME_COLOR,
    SelectNameColorDate,
    SelectNameColorVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";

const NameColor: React.FC = () => {
    const uid = localUid();

    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    const [buyColor] = useMutation<BuyNameColorData, BuyNameColorsVariables>(
        BUY_NAME_COLOR,
        {
            update(cache, { data }) {
                if (typeof data?.buyNameColor === "number") {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            nameColorsPurchased(existing) {
                                return [...existing, data.buyNameColor];
                            },
                            bolts(existing) {
                                existing = parseInt(existing);

                                return (
                                    existing - nameColorPrice(data.buyNameColor)
                                ).toString();
                            },
                        },
                    });
                }
            },
        }
    );

    const [selectColor] = useMutation<
        SelectNameColorDate,
        SelectNameColorVariables
    >(SELECT_NAME_COLOR, {
        update(cache, { data }) {
            if (typeof data?.selectNameColor === "number") {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        nameColor() {
                            return data.selectNameColor;
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
                    .map((fColor) => {
                        const color = fColor as ProfileColors;

                        return (
                            <ShopItem
                                key={color}
                                title={profileColor2Name(color)}
                                description={"unlock this color"}
                                purchaseTitle={"Unlock Color"}
                                price={nameColorPrice(color)}
                                userBolts={parseInt(data?.user.bolts)}
                                alreadyOwns={data?.user.nameColorsPurchased.includes(
                                    color
                                )}
                                alreadySelected={data?.user.nameColor === color}
                                onConfirm={async () => {
                                    try {
                                        await buyColor({
                                            variables: {
                                                color,
                                            },
                                            optimisticResponse: {
                                                buyNameColor: color,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Buy name color error",
                                                e
                                            );
                                        }
                                    }
                                }}
                                onSelect={async () => {
                                    try {
                                        await selectColor({
                                            variables: {
                                                color,
                                            },
                                            optimisticResponse: {
                                                selectNameColor: color,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Select name color error",
                                                e
                                            );
                                        }
                                    }
                                }}
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
