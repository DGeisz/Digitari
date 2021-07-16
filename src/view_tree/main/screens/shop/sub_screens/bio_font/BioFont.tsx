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
    bioColorToStyle,
    bioFont2Name,
    bioFontPrice,
    BioFontsEnum,
    stickerPrice,
} from "../../../../../../global_types/ShopTypes";
import ShopItem from "../../building_blocks/shop_item/ShopItem";
import { bioFont2Style } from "./fonts/fonts";
import { EXAMPLE_BIO } from "../../building_blocks/example_bio/example_bio";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import {
    BUY_BIO_FONT,
    BuyBioFontData,
    BuyBioFontsVariables,
    SELECT_BIO_FONT,
    SelectBioFontData,
    SelectBioFontVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";

const BioFont: React.FC = () => {
    const uid = localUid();

    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    const [buyFont] = useMutation<BuyBioFontData, BuyBioFontsVariables>(
        BUY_BIO_FONT,
        {
            update(cache, { data }) {
                if (typeof data?.buyBioFont === "number") {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            bioFontsPurchased(existing) {
                                return [...existing, data.buyBioFont];
                            },
                            bolts(existing) {
                                existing = parseInt(existing);

                                return (
                                    existing - bioFontPrice(data.buyBioFont)
                                ).toString();
                            },
                        },
                    });
                }
            },
        }
    );

    const [selectFont] = useMutation<SelectBioFontData, SelectBioFontVariables>(
        SELECT_BIO_FONT,
        {
            update(cache, { data }) {
                if (typeof data?.selectBioFont === "number") {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            bioFont() {
                                return data.selectBioFont;
                            },
                        },
                    });
                }
            },
        }
    );

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
                            Frankly, picking fonts is way more fun than it has
                            any right to be.{DOUBLE_NEWLINE}
                            Why stop with just your name?
                        </Text>
                    </View>
                </View>
                {Object.values(BioFontsEnum)
                    .filter((font) => !isNaN(Number(font)))
                    .map((_font) => {
                        const font = _font as BioFontsEnum;

                        return (
                            <ShopItem
                                key={font}
                                title={bioFont2Name(font)}
                                description={"unlock this font"}
                                purchaseTitle={"Unlock Font"}
                                price={bioFontPrice(font)}
                                userBolts={parseInt(data?.user.bolts)}
                                alreadyOwns={data?.user.bioFontsPurchased.includes(
                                    font
                                )}
                                alreadySelected={data?.user.bioFont === font}
                                onConfirm={async () => {
                                    try {
                                        await buyFont({
                                            variables: {
                                                font,
                                            },
                                            optimisticResponse: {
                                                buyBioFont: font,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Buy bio font error",
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
                                                selectBioFont: font,
                                            },
                                        });
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Select bio font error",
                                                e
                                            );
                                        }
                                    }
                                }}
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
