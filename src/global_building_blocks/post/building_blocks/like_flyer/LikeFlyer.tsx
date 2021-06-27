import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import CoinFlyer from "./building_blocks/coin_flyer/CoinFlyer";

interface Props {
    coinId: number;
}

const LikeFlyer: React.FC<Props> = (props) => {
    const [coinIds, setCoinIds] = useState<number[]>([]);

    useEffect(() => {
        if (!!props.coinId) {
            if (coinIds.length < 10 && !coinIds.includes(props.coinId)) {
                const newIds = [...coinIds, props.coinId];

                setCoinIds(newIds);
            }
        }
    }, [props.coinId]);

    const removeFlyer = useMemo(
        () => (coinId: number) => {
            setCoinIds((ids) => ids.filter((id) => id !== coinId));
        },
        []
    );

    return (
        <View style={{ position: "absolute" }}>
            {coinIds.map((coinId) => (
                <CoinFlyer key={coinId} id={coinId} removeFlyer={removeFlyer} />
            ))}
        </View>
    );
};

export default LikeFlyer;
