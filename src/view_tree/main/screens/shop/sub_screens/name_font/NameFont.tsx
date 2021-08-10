import React from "react";
import { ScrollView, Text, View } from "react-native";
import { shopStyles } from "../../styles/ShopStyles";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { nameFontToStyle } from "./fonts/fonts";
import {
    nameFont2Name,
    nameFontPrice,
    nameFontRequirement,
    NameFontsEnum,
    profileColor2Style,
} from "../../../../../../global_types/ShopTypes";
import { localUid } from "../../../../../../global_state/UserState";
import { useMutation, useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import {
    BUY_NAME_FONT,
    BuyNameFontData,
    BuyNameFontVariables,
    SELECT_NAME_FONT,
    SelectNameFontData,
    SelectNameFontVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";

const NameFont: React.FC = () => {
    const uid = localUid();

    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    const [buyFont] = useMutation<BuyNameFontData, BuyNameFontVariables>(
        BUY_NAME_FONT,
        {
            update(cache, { data }) {
                if (typeof data?.buyNameFont === "number") {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            nameFontsPurchased(existing) {
                                return [...existing, data.buyNameFont];
                            },
                            bolts(existing) {
                                existing = parseInt(existing);

                                return (
                                    existing - nameFontPrice(data.buyNameFont)
                                ).toString();
                            },
                        },
                    });
                }
            },
        }
    );

    const [selectFont] = useMutation<
        SelectNameFontData,
        SelectNameFontVariables
    >(SELECT_NAME_FONT, {
        update(cache, { data }) {
            if (typeof data?.selectNameFont === "number") {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        nameFont() {
                            return data.selectNameFont;
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

    const level = data.user.level;
    const ranking = data.user.ranking;

    return (
        <ScrollView style={shopStyles.outerContainer}>
            <View style={shopStyles.container}>
                <View style={shopStyles.headerContainer}>
                    <Text style={shopStyles.headerTitle}>Name Font</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.shopDescription}>
                            Want people to forget your name? Of course you
                            don't.{DOUBLE_NEWLINE}
                            Lucky for you, here are some juicy fonts to keep
                            that from ever happening.
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
                                level={level}
                                ranking={ranking}
                                requirement={nameFontRequirement(font)}
                                description={"unlock this font"}
                                purchaseTitle={"Unlock Font"}
                                price={nameFontPrice(font)}
                                userBolts={parseInt(data?.user.bolts)}
                                alreadyOwns={data?.user.nameFontsPurchased.includes(
                                    font
                                )}
                                alreadySelected={data?.user.nameFont === font}
                                onConfirm={async () => {
                                    try {
                                        await buyFont({
                                            variables: {
                                                font,
                                            },
                                            optimisticResponse: {
                                                buyNameFont: font,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Buy name font error",
                                                e
                                            );
                                        }
                                    }
                                }}
                                onSelect={async () => {
                                    try {
                                        await selectFont({
                                            variables: {
                                                font,
                                            },
                                            optimisticResponse: {
                                                selectNameFont: font,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Select name font error",
                                                e
                                            );
                                        }
                                    }
                                }}
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
