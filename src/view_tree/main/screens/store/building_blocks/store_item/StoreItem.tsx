import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./StoreItemStyles";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";

interface Props {
    title: string;
    coinAmount: number;
    price: string;
    onSelect: () => void;
}

const StoreItem: React.FC<Props> = (props) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{props.title}</Text>
            <View style={styles.coinContainer}>
                <CoinBox
                    coinSize={40}
                    fontSize={25}
                    amount={props.coinAmount}
                    showCoinPlus
                    showAbbreviated={false}
                />
            </View>
            <TouchableOpacity
                style={styles.priceContainer}
                onPress={props.onSelect}
            >
                <Text style={styles.priceText}>{props.price}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StoreItem;
