import React from "react";
import { View } from "react-native";
import { transactionReceipts } from "../../../../../../global_state/CoinUpdates";
import SingleCoin from "./building_blocks/single_coin/SingleCoin";
import { TransactionReceipt } from "../../../../../../global_types/TransactionTypes";
import { useReactiveVar } from "@apollo/client";

const CoinIndicator: React.FC = () => {
    const receipts = useReactiveVar(transactionReceipts);

    return (
        <View style={{ position: "absolute" }}>
            {receipts.slice(0, 10).map((receipt) => (
                <SingleCoin receipt={receipt} key={receipt.id} />
            ))}
        </View>
    );
};

export default CoinIndicator;
