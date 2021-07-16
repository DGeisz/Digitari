import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
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
import { BOOST_WALLET_PRICE } from "../../../../../../global_types/UserTypes";
import { DOUBLE_NEWLINE } from "../../../../../../global_utils/StringUtils";
import { styles } from "./WalletStyles";
import { millisToCountdown } from "../../../../../../global_utils/TimeRepUtils";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";

const WalletShopPage: React.FC = () => {
    const uid = localUid();

    const [currentTime, setCurrentTime] = useState<number>(Date.now());

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

    if (!data?.user || loading) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const boostEnd = parseInt(data.user.walletBonusEnd);

    return (
        <ScrollView style={shopStyles.outerContainer}>
            <View style={shopStyles.container}>
                <View style={shopStyles.basicEntryContainer}>
                    <Text style={shopStyles.entryTitleText}>
                        Upgrade wallet
                    </Text>
                    <Text style={shopStyles.entryDescription}>
                        Time for a bigger wallet? {DOUBLE_NEWLINE}
                        <Text style={shopStyles.entryBigDescription}>
                            Upgrade your wallet's max capacity to{" "}
                            <Text style={shopStyles.boldBlue}>
                                {toCommaRep(1000)} digicoin
                            </Text>
                            .
                        </Text>
                    </Text>
                    <LockBuySelect
                        alreadyOwns={false}
                        purchaseTitle={"Upgrade"}
                        userBolts={data.user.bolts}
                        description={"boost your wallet"}
                        onConfirm={() => {}}
                        price={BOOST_WALLET_PRICE}
                        onSelect={() => {}}
                    />
                </View>
                <View style={shopStyles.entrySeparator} />
                <View style={shopStyles.basicEntryContainer}>
                    <Text style={shopStyles.entryTitleText}>Boost wallet</Text>
                    <View style={shopStyles.descriptionContainer}>
                        <Text style={shopStyles.entryDescription}>
                            Tired of always maxing out your wallet? Must be hard
                            being such a baller 🤑{DOUBLE_NEWLINE}
                            <Text style={shopStyles.entryBigDescription}>
                                Boost your wallet to get{" "}
                                <Text style={shopStyles.boldBlue}>
                                    24 hours
                                </Text>{" "}
                                of{" "}
                                <Text style={shopStyles.boldBlue}>
                                    infinite wallet capacity
                                </Text>
                                .
                            </Text>
                        </Text>
                    </View>
                    {boostEnd > currentTime ? (
                        <View style={styles.bonusOuterContainer}>
                            <View style={styles.bonusInnerContainer}>
                                <Text style={styles.bonusTitle}>
                                    Time remaining
                                </Text>
                                <Text style={styles.bonusTimeRemaining}>
                                    {millisToCountdown(boostEnd - currentTime)}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <LockBuySelect
                            alreadyOwns={false}
                            purchaseTitle={"Boost"}
                            userBolts={data.user.bolts}
                            description={"boost your wallet"}
                            onConfirm={() => {}}
                            price={BOOST_WALLET_PRICE}
                            onSelect={() => {}}
                        />
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default WalletShopPage;
