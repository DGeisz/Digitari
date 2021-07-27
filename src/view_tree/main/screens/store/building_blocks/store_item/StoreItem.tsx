import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./StoreItemStyles";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../../../global_styles/Palette";

interface Props {
    title: string;
    coinAmount: number;
    price: string;
    onSelect: () => Promise<void>;
}

const StoreItem: React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>
                {props.title.split(" ").slice(0, 3).join(" ")}
            </Text>
            <View style={styles.coinContainer}>
                <CoinBox
                    coinSize={40}
                    fontSize={25}
                    amount={props.coinAmount}
                    showCoinPlus
                    showAbbreviated={false}
                />
            </View>
            {loading ? (
                <ActivityIndicator color={palette.deepBlue} size="large" />
            ) : (
                <TouchableOpacity
                    style={styles.priceContainer}
                    onPress={async () => {
                        setLoading(true);

                        try {
                            await props.onSelect();
                        } finally {
                        }

                        setLoading(false);
                    }}
                >
                    <Text style={styles.priceText}>{props.price}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default StoreItem;
