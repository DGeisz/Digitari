import React, { useState } from "react";
import { styles } from "./StatsHeaderStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { UserType } from "../../../../../global_types/UserTypes";
import Tier from "../../../../tier/Tier";
import { toCommaRep, toRep } from "../../../../../global_utils/ValueRepUtils";
import {
    BeenBlocked,
    Blocked,
    SuccessfulConvos,
} from "../../../../big_three/BigThree";
import CoinBox from "../../../../coin_box/CoinBox";
import TierInfoModal from "./building_blocks/tier_info_modal/TierInfoModal";
import { calculateLevelInfo } from "../../../../../global_utils/LevelUtils";
import TierModal from "../../../profile_header/building_blocks/tier_modal/TierModal";
import LevelInfoModal from "./building_blocks/level_info_modal/LevelInfoModal";
import BoltBox from "../../../../bolt_box/BoltBox";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../global_styles/Palette";
import BoltsModal from "../../../profile_header/building_blocks/bolts_modal/BoltsModal";
import DigicoinModal from "../../../profile_header/building_blocks/digicoin_modal/DigicoinModal";

interface Props {
    user: UserType;
    openFollows: () => void;
}

const StatsHeader: React.FC<Props> = (props) => {
    const [fillWidth, setFillWidth] = useState<number>(0);
    const [tookWidth, setTookWidth] = useState<boolean>(false);
    const [tierModalVisible, showTierModal] = useState<boolean>(false);
    const [levelModalVisible, showLevelModal] = useState<boolean>(false);

    const [coinModalVisible, showCoinModal] = useState<boolean>(false);
    const [boltsModalVisible, showBoltsModal] = useState<boolean>(false);

    const [level, levelGoal, levelProgress] = calculateLevelInfo(
        parseInt(props.user.coinSpent)
    );

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsLeft}>
                <View style={styles.statsTitleContainer}>
                    <Text style={styles.statsTitleText}>Tier Breakdown</Text>
                    <TierInfoModal user={props.user} />
                </View>
                <View style={styles.leftSplit1}>
                    <TierModal
                        visible={tierModalVisible}
                        hide={() => showTierModal(false)}
                    />
                    <TouchableOpacity onPress={() => showTierModal(true)}>
                        <Tier size={38} ranking={props.user.ranking} />
                    </TouchableOpacity>
                    <View style={styles.rankingContainer}>
                        <Text style={styles.rankingTitle}>Ranking</Text>
                        <Text style={styles.statsRankingText}>
                            {toCommaRep(props.user.ranking)}
                        </Text>
                    </View>
                </View>
                <View style={styles.leftSplit2}>
                    <SuccessfulConvos
                        conversations={props.user.successfulConvos}
                    />
                    <BeenBlocked beenBlocked={props.user.beenBlocked} />
                    <Blocked blocked={props.user.blocked} />
                </View>
                <View style={styles.leftSplit3}>
                    <View style={styles.split3Left}>
                        <Text style={styles.statsLevelText}>
                            {`Level ${toCommaRep(level)}`}
                        </Text>
                    </View>
                    <View style={styles.split3Right}>
                        <Text style={styles.statsProgressText}>
                            {`${toRep(levelProgress)} / ${toRep(levelGoal)}`}
                        </Text>
                    </View>
                    <LevelInfoModal
                        user={props.user}
                        visible={levelModalVisible}
                        hide={() => showLevelModal(false)}
                    />
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => showLevelModal(true)}
                    >
                        <FontAwesome
                            name="info"
                            style={styles.icon}
                            color={palette.deepBlue}
                            size={18}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.leftSplit4}>
                    <View
                        style={styles.statsProgressBar}
                        onLayout={({
                            nativeEvent: {
                                layout: { width },
                            },
                        }) => {
                            if (!tookWidth) {
                                setTookWidth(true);
                                setFillWidth(width);
                            }
                        }}
                    >
                        <View
                            style={[
                                styles.statsProgressFill,
                                {
                                    width:
                                        fillWidth * (levelProgress / levelGoal),
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.statsRight}>
                <View style={styles.statsRightTop}>
                    <Text style={styles.statsWalletText}>Savings</Text>
                    <BoltsModal
                        visible={boltsModalVisible}
                        hide={() => showBoltsModal(false)}
                    />
                    <TouchableOpacity onPress={() => showBoltsModal(true)}>
                        <BoltBox
                            amount={parseInt(props.user.bolts)}
                            boltSize={30}
                            fontSize={18}
                            showAbbreviated={false}
                            moveTextRight={2}
                        />
                    </TouchableOpacity>
                    <DigicoinModal
                        visible={coinModalVisible}
                        hide={() => showCoinModal(false)}
                    />
                    <TouchableOpacity onPress={() => showCoinModal(true)}>
                        <CoinBox
                            amount={parseInt(props.user.coin)}
                            coinSize={30}
                            fontSize={18}
                            showAbbreviated={false}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.statsRightBottom}>
                    <TouchableOpacity onPress={props.openFollows}>
                        <Text style={styles.statsFollowsText}>Followers</Text>
                        <Text style={styles.followsCountText}>
                            {toCommaRep(props.user.followers)}
                        </Text>
                        <Text style={styles.statsFollowsText}>Following</Text>
                        <Text style={styles.followsCountText}>
                            {toCommaRep(props.user.following)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default StatsHeader;
