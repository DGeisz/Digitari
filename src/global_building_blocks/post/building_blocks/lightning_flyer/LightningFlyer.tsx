import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { styles } from "./LightningFlyerStyles";
import BoltFlyer from "./building_blocks/bolt_flyer/BoltFlyer";

interface Props {
    boltId: number;
}

const LightningFlyer: React.FC<Props> = (props) => {
    const [boltIds, setBoltIds] = useState<number[]>([]);

    useEffect(() => {
        if (!!props.boltId) {
            if (boltIds.length < 10 && !boltIds.includes(props.boltId)) {
                const newIds = [...boltIds, props.boltId];

                setBoltIds(newIds);
            }
        }
    }, [props.boltId]);

    const removeFlyer = useMemo(
        () => (boltId: number) => {
            setBoltIds((ids) => ids.filter((id) => id !== boltId));
        },
        []
    );

    return (
        <View style={styles.flyerContainer}>
            {boltIds.map((boltId) => (
                <BoltFlyer key={boltId} id={boltId} removeFlyer={removeFlyer} />
            ))}
        </View>
    );
};

export default LightningFlyer;
