import React from "react";
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
    bioColor2Name,
    bioColorPrice,
    BioColors,
    bioColorToStyle,
    stickerPrice,
} from "../../../../../../global_types/ShopTypes";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { bioFont2Style } from "../bio_font/fonts/fonts";
import { EXAMPLE_BIO } from "../../building_blocks/example_bio/example_bio";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import {
    BUY_BIO_COLOR,
    BuyBioColorData,
    BuyBioColorVariables,
    SELECT_BIO_COLOR,
    SelectBioColorData,
    SelectBioColorVariables,
} from "./gql/Mutation";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";

const BioColor: React.FC = () => {
    const uid = localUid();

    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    const [buyColor] = useMutation<BuyBioColorData, BuyBioColorVariables>(
        BUY_BIO_COLOR,
        {
            update(cache, { data }) {
                if (typeof data?.buyBioColor === "number") {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            bioColorsPurchased(existing) {
                                return [...existing, data.buyBioColor];
                            },
                            bolts(existing) {
                                return (
                                    existing - bioColorPrice(data.buyBioColor)
                                );
                            },
                        },
                    });
                }
            },
        }
    );

    const [selectColor] = useMutation<
        SelectBioColorData,
        SelectBioColorVariables
    >(SELECT_BIO_COLOR, {
        update(cache, { data }) {
            if (typeof data?.selectBioColor === "number") {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        bioColor() {
                            return data.selectBioColor;
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
                    <Text style={shopStyles.headerTitle}>Bio Color</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.shopDescription}>
                            Let's get serious for just a sec.{DOUBLE_NEWLINE}
                            Do you
                            <Text style={shopStyles.shopItalics}> need</Text> a
                            special color for your bio? No. But do you
                            <Text style={shopStyles.shopItalics}> want</Text> a
                            special color for your bio?{DOUBLE_NEWLINE}
                            Why yes, yes you do.
                        </Text>
                    </View>
                </View>
                {Object.values(BioColors)
                    .filter((color) => !isNaN(Number(color)))
                    .map((_color) => {
                        const color = _color as BioColors;

                        return (
                            <ShopItem
                                key={color}
                                title={bioColor2Name(color)}
                                description={"unlock this color"}
                                purchaseTitle={"Unlock Color"}
                                price={bioColorPrice(color)}
                                userBolts={data?.user.bolts}
                                alreadyOwns={data?.user.bioColorsPurchased.includes(
                                    color
                                )}
                                alreadySelected={data?.user.bioColor === color}
                                onConfirm={async () => {
                                    try {
                                        await buyColor({
                                            variables: {
                                                color,
                                            },
                                            optimisticResponse: {
                                                buyBioColor: color,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Buy bio color error",
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
                                                selectBioColor: color,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Select bio color error",
                                                e
                                            );
                                        }
                                    }
                                }}
                            >
                                <Text
                                    style={[
                                        bioFont2Style(data?.user.bioFont),
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
