import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../../../routes/tab_nav/screens/profile/gql/Queries";
import { localUid } from "../../../../../../global_state/UserState";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { shopStyles } from "../../styles/ShopStyles";
import LockBuySelect from "../../building_blocks/lock_buy_select/LockBuySelect";
import {
    BOOST_WALLET_PRICE,
    calculateWalletUpgrade,
    USER_TYPENAME,
} from "../../../../../../global_types/UserTypes";
import { styles } from "./WalletStyles";
import {
    millisInDay,
    millisToCountdown,
} from "../../../../../../global_utils/TimeRepUtils";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";
import {
    BOOST_WALLET,
    BoostWalletData,
    BoostWalletVariables,
    UPGRADE_WALLET,
    UpgradeWalletData,
    UpgradeWalletVariables,
} from "./gql/Mutations";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../../../global_styles/Palette";

const WalletShopPage: React.FC = () => {
    const uid = localUid();

    const [currentTime, setCurrentTime] = useState<number>(Date.now());

    const [boostLoading, setBoostLoading] = useState<boolean>(false);
    const [upgradeLoading, setUpgradeLoading] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    /*
     * Fetch user
     */
    const { data, error, loading, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, { variables: { uid } });

    /*
     * Mutations
     */
    const [upgradeWallet] = useMutation<
        UpgradeWalletData,
        UpgradeWalletVariables
    >(UPGRADE_WALLET, {
        update(cache, { data }) {
            if (!!data?.upgradeWallet) {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        maxWallet() {
                            return data.upgradeWallet.maxWallet;
                        },
                        bolts() {
                            return data.upgradeWallet.bolts;
                        },
                    },
                });
            }
        },
    });

    const [boostWallet] = useMutation<BoostWalletData, BoostWalletVariables>(
        BOOST_WALLET,
        {
            update(cache, { data }) {
                if (!!data?.boostWallet) {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            walletBonusEnd() {
                                return (Date.now() + millisInDay).toString();
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

    const boostEnd = parseInt(data.user.walletBonusEnd);

    const [nextPrice, nextSize] = calculateWalletUpgrade(
        parseInt(data.user.maxWallet)
    );

    return (
        <ScrollView style={shopStyles.outerContainer}>
            <View style={shopStyles.container}>
                <View style={shopStyles.basicEntryContainer}>
                    <Text style={shopStyles.entryTitleText}>
                        Upgrade wallet
                    </Text>
                    <Text style={shopStyles.entryDescription}>
                        Time for a bigger wallet?
                    </Text>
                    <View style={shopStyles.entryItemContainer}>
                        <Text style={shopStyles.entryBigDescription}>
                            Upgrade Max Capacity to:
                            {/*Upgrade your wallet's max capacity to{" "}*/}
                            {/*<Text style={shopStyles.boldBlue}>*/}
                            {/*    {toCommaRep(nextSize)} digicoin*/}
                            {/*</Text>*/}
                            {/*.*/}
                        </Text>
                        <View style={{ height: 6 }} />
                        <CoinBox
                            amount={nextSize}
                            showAbbreviated={false}
                            coinSize={32}
                            fontSize={23}
                            boxColor={palette.softDeepBlue}
                            paddingRight={8}
                        />
                        <LockBuySelect
                            alreadyOwns={false}
                            purchaseTitle={"Upgrade"}
                            loading={upgradeLoading}
                            userBolts={parseInt(data.user.bolts)}
                            description={"upgrade your wallet"}
                            price={nextPrice}
                            onSelect={() => {}}
                            onConfirm={async () => {
                                setUpgradeLoading(true);

                                try {
                                    await upgradeWallet();
                                } catch (e) {
                                    if (__DEV__) {
                                        console.log(
                                            "Error upgrading wallet: ",
                                            e
                                        );
                                    }
                                }

                                setUpgradeLoading(false);
                            }}
                        />
                    </View>
                </View>
                <View style={shopStyles.entrySeparator} />
                <View style={shopStyles.basicEntryContainer}>
                    <Text style={shopStyles.entryTitleText}>Boost wallet</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.entryDescription}>
                            Tired of always maxing out your wallet? Must be hard
                            being such a baller 🤑
                        </Text>
                    </View>
                    <View style={shopStyles.entryItemContainer}>
                        <Text style={shopStyles.entryBigDescription}>
                            Boost your wallet to get{" "}
                            <Text style={shopStyles.boldBlue}>24 hours</Text> of{" "}
                            <Text style={shopStyles.boldBlue}>
                                infinite wallet capacity
                            </Text>
                            .
                        </Text>
                        {boostEnd > currentTime ? (
                            <View style={styles.bonusOuterContainer}>
                                <View style={styles.bonusInnerContainer}>
                                    <Text style={styles.bonusTitle}>
                                        Time remaining
                                    </Text>
                                    <Text style={styles.bonusTimeRemaining}>
                                        {millisToCountdown(
                                            boostEnd - currentTime
                                        )}
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <LockBuySelect
                                alreadyOwns={false}
                                loading={boostLoading}
                                purchaseTitle={"Boost"}
                                userBolts={parseInt(data.user.bolts)}
                                description={"boost your wallet"}
                                onConfirm={async () => {
                                    setBoostLoading(true);

                                    try {
                                        await boostWallet();
                                        await refetch();
                                    } catch (e) {
                                        if (__DEV__) {
                                            console.log(
                                                "Error boosting wallet: ",
                                                e
                                            );
                                        }
                                    }

                                    setBoostLoading(false);
                                }}
                                price={BOOST_WALLET_PRICE}
                                onSelect={() => {}}
                            />
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default WalletShopPage;
