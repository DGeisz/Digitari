import React from "react";
import { Text, View } from "react-native";
import {
    tier2MinRanking,
    tier2responseCost,
    TierEnum,
} from "../../../../../../../global_types/TierTypes";
import { styles } from "./TierInfoStyles";
import Tier from "../../../../../../tier/Tier";
import BoltBox from "../../../../../../bolt_box/BoltBox";
import CoinBox from "../../../../../../coin_box/CoinBox";
import { convoReward } from "../../../../../../../global_types/ConvoTypes";

interface Props {
    tier: TierEnum;
}

const infoFontSize = 17;

const TierInfo: React.FC<Props> = (props) => {
    const minRanking = tier2MinRanking(props.tier);
    const rankingText =
        minRanking >= 0
            ? `${minRanking}+`
            : `(${!isNaN(minRanking) ? minRanking : "-∞"})+`;

    const responseCost = tier2responseCost(props.tier);
    const reward = convoReward(responseCost);

    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
                <Tier size={45} tier={props.tier} />
                <View style={styles.rankingContainer}>
                    <Text style={styles.rankingTitle}>Convo Streak</Text>
                    <Text style={styles.rankingText}>{rankingText}</Text>
                </View>
            </View>
            <View style={styles.infoBar}>
                <View style={styles.singleInfo}>
                    <Text style={styles.infoTitle}>Response cost</Text>
                    <CoinBox
                        amount={responseCost}
                        fontSize={infoFontSize}
                        coinSize={20}
                        showAbbreviated={false}
                    />
                </View>
                <View style={styles.singleInfo}>
                    <Text style={styles.infoTitle}>Convo reward</Text>
                    <BoltBox
                        amount={reward}
                        fontSize={infoFontSize}
                        boltSize={20}
                        showAbbreviated={false}
                    />
                </View>
            </View>
        </View>
    );
};

export default TierInfo;
