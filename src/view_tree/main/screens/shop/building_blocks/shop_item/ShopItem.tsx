import React from "react";
import { View, Text } from "react-native";
import { styles } from "./ShopItemStyles";
import LockBuySelect from "../lock_buy_select/LockBuySelect";

interface Props {
    title: string;
    alreadyOwns: boolean;
    userBolts: number;
    price: number;
    purchaseTitle: string;
    description: string;
    alreadySelected: boolean;
}

const ShopItem: React.FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.childrenContainer}>{props.children}</View>
            <LockBuySelect
                alreadySelected={props.alreadySelected}
                alreadyOwns={props.alreadyOwns}
                purchaseTitle={props.purchaseTitle}
                userBolts={props.userBolts}
                description={props.description}
                onConfirm={() => {}}
                price={props.price}
                onSelect={() => {}}
            />
        </View>
    );
};

export default ShopItem;
