import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { WalletNavProp } from "../../TabNavTypes";
import { styles } from "./WalletStyles";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { TransactionType } from "../../../../../../global_types/TransactionTypes";
import Transaction from "./building_blocks/transaction/Transaction";
import { localUid } from "../../../../../../global_state/UserState";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import {
    LAST_COLLECTION_TIME,
    LastCollectionTimeData,
    LastCollectionTimeVariables,
    TRANSACTION_ACCUMULATION,
    TransactionAccumulationData,
    TRANSACTIONS,
    TransactionsData,
    TransactionsVariables,
} from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { ranking2Wage } from "../../../../../../global_types/TierTypes";
import { millisInHour } from "../../../../../../global_utils/TimeRepUtils";
import { palette } from "../../../../../../global_styles/Palette";
import { COLLECT_EARNINGS, CollectEarningsData } from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { QUERY_TYPENAME } from "../../../../../../global_gql/Schema";

interface Props {
    navigation: WalletNavProp;
}

const Wallet: React.FC<Props> = (props) => {
    const uid = localUid();
    const { openNew, openConvo, openUser } = useContext(TabNavContext);

    /*
     * Queries
     */
    const {
        data: collectionData,
        networkStatus: collectionStatus,
        error: collectionError,
        refetch: collectionRefetch,
    } = useQuery<LastCollectionTimeData, LastCollectionTimeVariables>(
        LAST_COLLECTION_TIME,
        {
            variables: {
                uid,
            },
            fetchPolicy: "cache-and-network",
            notifyOnNetworkStatusChange: true,
        }
    );

    const {
        data: accData,
        error: accErr,
        networkStatus: accNetworkStatus,
        refetch: accRefetch,
    } = useQuery<TransactionAccumulationData>(TRANSACTION_ACCUMULATION, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
    });

    const {
        data: transData,
        error: transError,
        networkStatus: transNetworkStatus,
        refetch: transRefetch,
    } = useQuery<TransactionsData, TransactionsVariables>(TRANSACTIONS, {
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        props.navigation.addListener("focus", () => {
            accRefetch && accRefetch();
        });
    }, []);

    /*
     * Mutations
     */
    const [collectEarnings] = useMutation<CollectEarningsData>(
        COLLECT_EARNINGS,
        {
            update(cache, { data, errors }) {
                if (!!data?.collectEarnings) {
                    cache.modify({
                        id: cache.identify({
                            __typename: QUERY_TYPENAME,
                        }),
                        fields: {
                            transactionAccumulation() {
                                return 0;
                            },
                        },
                    });

                    const _ = cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            coin(existing) {
                                return existing + data.collectEarnings.coin;
                            },
                            lastCollectionTime() {
                                return data.collectEarnings.time;
                            },
                        },
                    });
                }
            },
        }
    );

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    /*
     * Animation playground
     */
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    const [animationCoinAmount, setAnimationCoinAmount] = useState<number>(0);

    /*
     * Function to send the animation up that signifies
     * the user just made some dough
     */
    const shockTheNation = () => {
        animatedHeight.setValue(0);
        animatedOpacity.setValue(1);

        const animationDuration = 600;

        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: -200,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animatedOpacity, {
                toValue: 0,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start(() => {
            animatedOpacity.setValue(0);
        });
    };

    if (
        (!collectionData?.user && collectionStatus === NetworkStatus.loading) ||
        (!accData?.transactionAccumulation &&
            accNetworkStatus === NetworkStatus.loading &&
            !transData?.transactions &&
            transNetworkStatus === NetworkStatus.loading)
    ) {
        return <LoadingWheel />;
    }

    if (!!transError) {
        return <ErrorMessage refresh={transRefetch} />;
    }

    if (!!collectionError) {
        return <ErrorMessage refresh={collectionRefetch} />;
    }

    if (!!accErr) {
        return <ErrorMessage refresh={accRefetch} />;
    }

    let tierWage = 0;
    let daily = 0;
    let accumulation = 0;

    if (!!accData?.transactionAccumulation) {
        accumulation = accData.transactionAccumulation;
    }

    if (!!collectionData?.user) {
        const [hourlyWage, dailyWage] = ranking2Wage(
            collectionData.user.ranking
        );
        daily = dailyWage;

        tierWage = Math.min(
            Math.floor(
                hourlyWage *
                    ((Date.now() -
                        parseInt(collectionData.user.lastCollectionTime)) /
                        millisInHour)
            ),
            daily
        );
    }

    let total = tierWage + accumulation;

    const finalFeed: TransactionType[] = !!transData?.transactions
        ? transData.transactions
        : [];

    const lastCollectionTime: number = !!collectionData?.user
        ? parseInt(collectionData.user.lastCollectionTime)
        : 0;

    return (
        <>
            <View style={basicLayouts.flexGrid1}>
                <FlatList
                    style={styles.walletList}
                    ListHeaderComponent={
                        <>
                            <View style={styles.earningsContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.headerTitle}>
                                        Earnings
                                    </Text>
                                </View>
                                <View style={styles.entryContainer}>
                                    <Text style={styles.entryTitle}>
                                        Tier wage
                                    </Text>
                                    <CoinBox
                                        amount={tierWage}
                                        coinSize={20}
                                        fontSize={15}
                                        outOfCoin={daily}
                                        showAbbreviated={false}
                                    />
                                </View>
                                <View style={styles.entryContainer}>
                                    <Text style={styles.entryTitle}>
                                        Transaction total
                                    </Text>
                                    <CoinBox
                                        amount={accumulation}
                                        coinSize={20}
                                        fontSize={15}
                                        showAbbreviated={false}
                                    />
                                </View>
                                <View style={styles.entryContainer}>
                                    <Text style={styles.totalTitle}>Total</Text>
                                    <CoinBox
                                        amount={total}
                                        coinSize={30}
                                        fontSize={20}
                                        showAbbreviated={false}
                                    />
                                </View>
                                <View style={styles.earningsFooter}>
                                    <Animated.View
                                        style={[
                                            {
                                                transform: [
                                                    {
                                                        translateY: animatedHeight,
                                                    },
                                                ],
                                                opacity: animatedOpacity,
                                            },
                                        ]}
                                    >
                                        <CoinBox
                                            showCoinPlus
                                            amount={animationCoinAmount}
                                            coinSize={40}
                                            fontSize={30}
                                        />
                                    </Animated.View>
                                    <TouchableOpacity
                                        style={[
                                            styles.collectButton,
                                            total === 0
                                                ? {
                                                      backgroundColor:
                                                          palette.notDeepBlue,
                                                  }
                                                : {},
                                        ]}
                                        activeOpacity={total === 0 ? 1 : 0.5}
                                        onPress={async () => {
                                            if (total > 0) {
                                                shockTheNation();
                                                setAnimationCoinAmount(total);
                                                try {
                                                    await collectEarnings({
                                                        optimisticResponse: {
                                                            collectEarnings: {
                                                                coin: total,
                                                                time: Date.now().toString(),
                                                            },
                                                        },
                                                    });

                                                    await collectionRefetch();
                                                } catch (_) {}
                                            }
                                        }}
                                    >
                                        <Text style={styles.collectButtonText}>
                                            Collect
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.headerBuffer} />
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerTitle}>
                                    Transactions
                                </Text>
                            </View>
                            {finalFeed.length === 0 && (
                                <View style={styles.noTransactionsContainer}>
                                    <Text style={styles.noTransactionText}>
                                        You haven't had any transactions
                                        recently
                                    </Text>
                                </View>
                            )}
                        </>
                    }
                    data={finalFeed}
                    renderItem={({ item, index }) => (
                        <Transaction
                            showBottomBorder={index === finalFeed.length - 1}
                            transaction={item}
                            openConvo={openConvo}
                            openUser={openUser}
                            lastCollectionTime={lastCollectionTime}
                        />
                    )}
                    keyExtractor={(item, index) => ["wallet", index].join(":")}
                    refreshControl={
                        <RefreshControl
                            refreshing={
                                transNetworkStatus === NetworkStatus.refetch ||
                                stillSpin
                            }
                            onRefresh={() => {
                                setStillSpin(true);
                                !!transRefetch && transRefetch();
                                !!accRefetch && accRefetch();
                                !!collectionRefetch && collectionRefetch();

                                setTimeout(() => {
                                    setStillSpin(false);
                                }, 1000);
                            }}
                            colors={[
                                palette.deepBlue,
                                palette.darkForestGreen,
                                palette.oceanSurf,
                            ]}
                            tintColor={palette.deepBlue}
                        />
                    }
                    ListFooterComponent={<View style={styles.listFooter} />}
                />
            </View>
            <NewButton openNew={openNew} />
        </>
    );
};

export default Wallet;
