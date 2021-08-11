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
    BOLT_TRANSACTIONS,
    BoltTransData,
    BoltTransVariables,
    LAST_COLLECTION_TIME,
    LastCollectionTimeData,
    LastCollectionTimeVariables,
    TRANSACTIONS,
    TransactionsData,
    TransactionsVariables,
} from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { palette } from "../../../../../../global_styles/Palette";
import {
    COLLECT_EARNINGS,
    CollectEarningsData,
    VIEWED_TRANSACTION,
    ViewedTransactionData,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import {
    GET_UPDATE_FLAGS,
    GetUpdateFlagsData,
    GetUpdateFlagsVariables,
} from "../../gql/Queries";
import { useIsFocused } from "@react-navigation/native";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import { millisToCountdown } from "../../../../../../global_utils/TimeRepUtils";
import { firstWallet } from "../../../../../../global_state/FirstImpressionsState";
import BoltBox from "../../../../../../global_building_blocks/bolt_box/BoltBox";

const MIN_FILLER_WIDTH = 5;

enum TransType {
    Coin,
    Bolts,
}

interface Props {
    navigation: WalletNavProp;
}

const Wallet: React.FC<Props> = (props) => {
    const uid = localUid();
    const { openNew, openConvo, openUser, openShop, openPost } = useContext(
        TabNavContext
    );

    const [transType, setTransType] = useState<TransType>(TransType.Coin);

    const [barWidth, setBarWidth] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(Date.now());

    const [boltBarWidth, setBoltBarWidth] = useState<number>(0);

    const [instructionsVisible, showInstructions] = useState<boolean>(
        firstWallet()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
            notifyOnNetworkStatusChange: true,
        }
    );

    const {
        data: transData,
        error: transError,
        networkStatus: transNetworkStatus,
        refetch: transRefetch,
        fetchMore,
    } = useQuery<TransactionsData, TransactionsVariables>(TRANSACTIONS, {
        notifyOnNetworkStatusChange: true,
    });

    const {
        data: boltTransData,
        error: boltTransError,
        networkStatus: boltTransNetStatus,
        refetch: boltTransRefetch,
        fetchMore: boltTransFetchMore,
    } = useQuery<BoltTransData, BoltTransVariables>(BOLT_TRANSACTIONS, {
        notifyOnNetworkStatusChange: true,
    });

    /*
     * Mutations
     */
    const [collectEarnings] = useMutation<CollectEarningsData>(
        COLLECT_EARNINGS,
        {
            update(cache, { data }) {
                if (!!data?.collectEarnings) {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            coin(existing) {
                                existing = parseInt(existing);

                                return (
                                    existing + data.collectEarnings.coin
                                ).toString();
                            },
                            bolts(existing) {
                                existing = parseInt(existing);

                                return (
                                    existing + data.collectEarnings.bolts
                                ).toString();
                            },
                            lastCollectionTime() {
                                return data.collectEarnings.time;
                            },
                            transTotal() {
                                return "0";
                            },
                            boltTransTotal() {
                                return "0";
                            },
                        },
                    });
                }
            },
        }
    );

    /*
     * Handle viewing the transaction page
     */
    const [viewTransactionsScreen] = useMutation<ViewedTransactionData>(
        VIEWED_TRANSACTION,
        {
            optimisticResponse: {
                viewedTransactionUpdate: true,
            },
            update(cache) {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        newTransactionUpdate() {
                            return false;
                        },
                    },
                });
            },
        }
    );

    const { data: updateData } = useQuery<
        GetUpdateFlagsData,
        GetUpdateFlagsVariables
    >(GET_UPDATE_FLAGS, {
        variables: {
            uid,
        },
    });

    let newTransactionUpdate = false;

    if (!!updateData) {
        newTransactionUpdate = updateData.user.newTransactionUpdate;
    }

    const pageFocused = useIsFocused();

    useEffect(() => {
        return props.navigation.addListener("focus", () => {
            viewTransactionsScreen().then();
        });
    }, [props.navigation, viewTransactionsScreen]);

    useEffect(() => {
        if (pageFocused && newTransactionUpdate) {
            viewTransactionsScreen().then();
        }
    }, [pageFocused, newTransactionUpdate, viewTransactionsScreen]);

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const listRef = useRef<FlatList>(null);

    /*
     * Animation playground
     */
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    const [animationCoinAmount, setAnimationCoinAmount] = useState<number>(0);
    const [aniBoltAmount, setAniBoltAmount] = useState<number>(0);

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
        (!transData?.transactions &&
            transNetworkStatus === NetworkStatus.loading) ||
        (!boltTransData?.boltTransactions &&
            boltTransNetStatus === NetworkStatus.loading)
    ) {
        return <LoadingWheel />;
    }

    if (!!boltTransError) {
        return <ErrorMessage refresh={boltTransRefetch} />;
    }

    if (!!transError) {
        return <ErrorMessage refresh={transRefetch} />;
    }

    if (!!collectionError) {
        return <ErrorMessage refresh={collectionRefetch} />;
    }

    let total = 0;
    let maxWallet = 100;
    let walletBonusEnd = 0;

    let boltTotal = 0;
    let maxBoltWallet = 100;

    let finalFeed: TransactionType[] = [];
    let lastCollectionTime: number = 0;

    if (!!collectionData?.user) {
        maxWallet = parseInt(collectionData.user.maxWallet);
        walletBonusEnd = parseInt(collectionData.user.walletBonusEnd);

        const transTotal = parseInt(collectionData.user.transTotal);

        maxBoltWallet = parseInt(collectionData.user.maxBoltWallet);

        const boltTransTotal = parseInt(collectionData.user.boltTransTotal);

        if (walletBonusEnd > currentTime) {
            total = transTotal;
        } else {
            if (transTotal > maxWallet) {
                total = maxWallet;
            } else {
                total = transTotal;
            }
        }

        if (boltTransTotal > maxBoltWallet) {
            boltTotal = maxBoltWallet;
        } else {
            boltTotal = boltTransTotal;
        }
    }

    const finalCoinTrans = !!transData?.transactions
        ? transData.transactions
        : [];
    const finalBoltTrans = !!boltTransData?.boltTransactions
        ? boltTransData.boltTransactions
        : [];

    if (transType === TransType.Coin) {
        finalFeed = finalCoinTrans;
    } else {
        finalFeed = finalBoltTrans;
    }

    lastCollectionTime = !!collectionData?.user
        ? parseInt(collectionData.user.lastCollectionTime)
        : 0;

    const collectActive = total > 0 || boltTotal > 0;

    return (
        <>
            <InstructionsModal
                hideModal={() => {
                    showInstructions(false);
                }}
                visible={instructionsVisible}
            />
            <View style={basicLayouts.flexGrid1}>
                <FlatList
                    ref={listRef}
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
                                    {walletBonusEnd > currentTime ? (
                                        <View
                                            style={styles.bonusOuterContainer}
                                        >
                                            <View
                                                style={
                                                    styles.bonusInnerContainer
                                                }
                                            >
                                                <Text style={styles.bonusTitle}>
                                                    Infinite Wallet
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.bonusTimeRemaining
                                                    }
                                                >
                                                    {millisToCountdown(
                                                        walletBonusEnd -
                                                            currentTime
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                    ) : (
                                        <>
                                            <View style={styles.barHeader}>
                                                <View
                                                    style={styles.barHeaderLeft}
                                                >
                                                    <Text
                                                        style={
                                                            styles.maxCapacityText
                                                        }
                                                    >
                                                        Max:
                                                    </Text>
                                                    <CoinBox
                                                        coinSize={15}
                                                        amount={maxWallet}
                                                        showAbbreviated={false}
                                                        fontColor={
                                                            palette.mediumGray
                                                        }
                                                    />
                                                </View>
                                                <View
                                                    style={
                                                        styles.barHeaderRight
                                                    }
                                                >
                                                    <TouchableOpacity
                                                        style={
                                                            styles.upgradeButton
                                                        }
                                                        onPress={() =>
                                                            openShop("Wallet")
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.upgradeText
                                                            }
                                                        >
                                                            Upgrade
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.totalBar}
                                                onLayout={(e) =>
                                                    setBarWidth(
                                                        e.nativeEvent.layout
                                                            .width
                                                    )
                                                }
                                            >
                                                <View
                                                    style={[
                                                        styles.barFiller,
                                                        {
                                                            width:
                                                                (total /
                                                                    maxWallet) *
                                                                    (barWidth -
                                                                        MIN_FILLER_WIDTH) +
                                                                MIN_FILLER_WIDTH,
                                                        },
                                                    ]}
                                                />
                                            </View>
                                        </>
                                    )}
                                    <View style={styles.totalContainer}>
                                        <Text style={styles.totalTitle}>
                                            Total:
                                        </Text>
                                        <CoinBox
                                            amount={total}
                                            coinSize={25}
                                            fontSize={18}
                                            showAbbreviated={false}
                                        />
                                    </View>
                                </View>
                                <View style={styles.bottomEntryContainer}>
                                    <View style={styles.barHeader}>
                                        <View style={styles.barHeaderLeft}>
                                            <Text
                                                style={styles.maxCapacityText}
                                            >
                                                Max:
                                            </Text>
                                            <BoltBox
                                                boltSize={17}
                                                moveTextRight={2}
                                                amount={maxBoltWallet}
                                                showAbbreviated={false}
                                                fontColor={palette.mediumGray}
                                            />
                                        </View>
                                        <View style={styles.barHeaderRight}>
                                            <TouchableOpacity
                                                style={styles.upgradeButton}
                                                onPress={() =>
                                                    openShop("Wallet")
                                                }
                                            >
                                                <Text
                                                    style={styles.upgradeText}
                                                >
                                                    Upgrade
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View
                                        style={styles.totalBar}
                                        onLayout={(e) =>
                                            setBoltBarWidth(
                                                e.nativeEvent.layout.width
                                            )
                                        }
                                    >
                                        <View
                                            style={[
                                                styles.barFiller,
                                                {
                                                    width:
                                                        (boltTotal /
                                                            maxBoltWallet) *
                                                            (boltBarWidth -
                                                                MIN_FILLER_WIDTH) +
                                                        MIN_FILLER_WIDTH,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <View style={styles.totalContainer}>
                                        <Text style={styles.totalTitle}>
                                            Total:
                                        </Text>
                                        <BoltBox
                                            amount={boltTotal}
                                            boltSize={25}
                                            fontSize={18}
                                            moveTextRight={3}
                                            showAbbreviated={false}
                                        />
                                    </View>
                                </View>
                                <View style={styles.earningsFooter}>
                                    <Animated.View
                                        pointerEvents="none"
                                        style={{
                                            ...styles.shockBox,
                                            transform: [
                                                {
                                                    translateY: animatedHeight,
                                                },
                                            ],
                                            opacity: animatedOpacity,
                                        }}
                                    >
                                        <BoltBox
                                            showBoltPlus
                                            amount={aniBoltAmount}
                                            boltSize={40}
                                            fontSize={30}
                                            moveTextRight={5}
                                            paddingRight={10}
                                        />
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
                                            !collectActive
                                                ? {
                                                      backgroundColor:
                                                          palette.notDeepBlue,
                                                  }
                                                : {},
                                        ]}
                                        activeOpacity={collectActive ? 0.5 : 1}
                                        onPress={async () => {
                                            if (collectActive) {
                                                /*
                                                 * Handle the tutorial scenario
                                                 */
                                                shockTheNation();
                                                setAnimationCoinAmount(total);
                                                setAniBoltAmount(boltTotal);

                                                /*
                                                 * Otherwise, handle typical collection mutation
                                                 */
                                                try {
                                                    await collectEarnings({
                                                        optimisticResponse: {
                                                            collectEarnings: {
                                                                coin: total,
                                                                bolts: boltTotal,
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
                            <View style={styles.transChoiceContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.choiceButton,
                                        {
                                            backgroundColor:
                                                transType === TransType.Coin
                                                    ? palette.deepBlue
                                                    : palette.white,
                                        },
                                    ]}
                                    onPress={() => setTransType(TransType.Coin)}
                                >
                                    <Text
                                        style={[
                                            styles.choiceButtonText,
                                            {
                                                color:
                                                    transType === TransType.Coin
                                                        ? palette.white
                                                        : palette.hardGray,
                                            },
                                        ]}
                                    >
                                        Coin
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.choiceButton,
                                        {
                                            backgroundColor:
                                                transType === TransType.Bolts
                                                    ? palette.deepBlue
                                                    : palette.white,
                                        },
                                    ]}
                                    onPress={() =>
                                        setTransType(TransType.Bolts)
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.choiceButtonText,
                                            {
                                                color:
                                                    transType ===
                                                    TransType.Bolts
                                                        ? palette.white
                                                        : palette.hardGray,
                                            },
                                        ]}
                                    >
                                        Bolts
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {finalFeed.length === 0 && (
                                <View style={styles.noTransactionsContainer}>
                                    <Text style={styles.noTransactionText}>
                                        You don't have any recent transactions
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
                            openPost={openPost}
                            openChallenges={() => {
                                props.navigation.navigate("Profile", {
                                    screen: "UserChallenges",
                                });
                            }}
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
                                !!boltTransRefetch && boltTransRefetch();
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
                    onEndReached={async () => {
                        if (finalFeed.length > 0) {
                            const lastTime =
                                finalFeed[finalFeed.length - 1].time;

                            if (transType === TransType.Coin) {
                                !!fetchMore &&
                                    (await fetchMore({
                                        variables: {
                                            lastTime,
                                        },
                                    }));
                            } else {
                                !!boltTransFetchMore &&
                                    (await boltTransFetchMore({
                                        variables: {
                                            lastTime,
                                        },
                                    }));
                            }
                        }
                    }}
                />
            </View>
            <NewButton openNew={openNew} />
        </>
    );
};

export default Wallet;
