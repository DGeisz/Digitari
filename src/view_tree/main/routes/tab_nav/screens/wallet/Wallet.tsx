import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { WalletNavProp } from "../../TabNavTypes";
import { styles } from "./WalletStyles";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import {
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";
import Transaction from "./building_blocks/transaction/Transaction";
import { localUid } from "../../../../../../global_state/UserState";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    LAST_COLLECTION_TIME,
    LastCollectionTimeData,
    LastCollectionTimeVariables,
    TRANSACTION_ACCUMULATION,
    TransactionAccumulationData,
} from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { ranking2Wage } from "../../../../../../global_types/TierTypes";
import { millisInHour } from "../../../../../../global_utils/TimeRepUtils";

interface Props {
    navigation: WalletNavProp;
}

const Wallet: React.FC<Props> = (props) => {
    const uid = localUid();
    const { openNew, openConvo, openUser } = useContext(TabNavContext);

    const {
        data: collectionData,
        loading: collectionLoading,
        error: collectionError,
        refetch: collectionRefetch,
    } = useQuery<LastCollectionTimeData, LastCollectionTimeVariables>(
        LAST_COLLECTION_TIME,
        {
            variables: {
                uid,
            },
        }
    );

    const {
        data: accData,
        error: accErr,
        networkStatus,
        refetch: accRefetch,
    } = useQuery<TransactionAccumulationData>(TRANSACTION_ACCUMULATION, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
    });

    console.log(
        "Acc loading",
        collectionLoading,
        !!accData?.transactionAccumulation
    );

    useEffect(() => {
        props.navigation.addListener("focus", () => {
            accRefetch && accRefetch();
        });
    }, []);

    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (
        collectionLoading ||
        (!accData?.transactionAccumulation &&
            networkStatus === NetworkStatus.loading)
    ) {
        return <LoadingWheel />;
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

    const finalFeed: TransactionType[] = [
        {
            tid: "",
            time: Date.now().toString(),
            coin: 10000,
            message: `dern donated to your post: "Here be the lions"`,
            transactionType: TransactionTypesEnum.User,
            data: "asdfa",
        },
        {
            tid: "",
            time: Date.now().toString(),
            coin: 1,
            message: `dern donated to your post: "Here be the lions, for they seek to destory, and shall find the meat they desire"`,
            transactionType: TransactionTypesEnum.User,
            data: "asdf",
        },
    ];

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
                                        Transaction sum
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
                                    <TouchableOpacity
                                        style={styles.collectButton}
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
                        </>
                    }
                    data={finalFeed}
                    renderItem={({ item }) => (
                        <Transaction
                            transaction={item}
                            openConvo={openConvo}
                            openUser={openUser}
                        />
                    )}
                    keyExtractor={(item, index) => ["wallet", index].join(":")}
                    ListFooterComponent={<View style={styles.listFooter} />}
                />
            </View>
            <NewButton openNew={openNew} />
        </>
    );
};

export default Wallet;
