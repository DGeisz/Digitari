import React from "react";
import { View, Text } from "react-native";
import { styles } from "./ShopItemStyles";
import LockBuySelect from "../lock_buy_select/LockBuySelect";

interface Props {
    title: string;
}

const ShopItem: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.childrenContainer}>{props.children}</View>
            <LockBuySelect
                alreadyOwns={false}
                purchaseTitle={"Buy Font"}
                userBolts={20}
                description={"buy font"}
                onConfirm={() => {}}
                price={50}
                onSelect={() => {}}
            />
        </View>
    );
};

export default ShopItem;
