import React from "react";
import { Text, View } from "react-native";
import {
    tier2convoReward,
    tier2MinRanking,
    tier2responseCost,
    tier2Wage,
    TierEnum,
} from "../../../../../../../global_types/TierTypes";
import { styles } from "./TierInfoStyles";
import Tier from "../../../../../../tier/Tier";
import CoinBox from "../../../../../../coin_box/CoinBox";
import { palette } from "../../../../../../../global_styles/Palette";

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
    const tierWage = tier2Wage(props.tier)[1];

    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
                <Tier size={45} tier={props.tier} />
                <View style={styles.rankingContainer}>
                    <Text style={styles.rankingTitle}>Ranking</Text>
                    <Text style={styles.rankingText}>{rankingText}</Text>
                </View>
            </View>
            <View style={styles.infoBar}>
                <View style={styles.singleInfo}>
                    <Text style={styles.infoTitle}>Response cost</Text>
                    <CoinBox
                        amount={tier2responseCost(props.tier)}
                        fontSize={infoFontSize}
                        coinSize={20}
                        showAbbreviated={false}
                    />
                </View>
                <View style={styles.singleInfo}>
                    <Text style={styles.infoTitle}>Convo reward</Text>
                    <CoinBox
                        boxColor={palette.lightForestGreen}
                        paddingRight={7}
                        showCoinPlus
                        amount={tier2convoReward(props.tier)}
                        fontSize={infoFontSize}
                        coinSize={20}
                        showAbbreviated={false}
                    />
                </View>
            </View>
        </View>
    );
};

export default TierInfo;
