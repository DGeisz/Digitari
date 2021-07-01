import React from "react";
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
import BoltBox from "../../../../../bolt_box/BoltBox";

interface Props {
    user: UserType;
    openFollows: () => void;
}

interface State {
    fillWidth: number;
    tookWidth: boolean;
    showTierModal: boolean;
}

export default class StatsHeader extends React.PureComponent<Props, State> {
    state = {
        fillWidth: 0,
        tookWidth: false,
        showTierModal: false,
    };

    render() {
        const [level, levelGoal, levelProgress] = calculateLevelInfo(
            this.props.user.coinSpent
        );

        return (
            <View style={styles.statsContainer}>
                <View style={styles.statsLeft}>
                    <View style={styles.statsTitleContainer}>
                        <Text style={styles.statsTitleText}>
                            Tier Breakdown
                        </Text>
                        <TierInfoModal user={this.props.user} />
                    </View>
                    <View style={styles.leftSplit1}>
                        <TierModal
                            visible={this.state.showTierModal}
                            hide={() => this.setState({ showTierModal: false })}
                        />
                        <TouchableOpacity
                            onPress={() =>
                                this.setState({ showTierModal: true })
                            }
                        >
                            <Tier size={38} ranking={this.props.user.ranking} />
                        </TouchableOpacity>
                        <View style={styles.rankingContainer}>
                            <Text style={styles.rankingTitle}>Ranking</Text>
                            <Text style={styles.statsRankingText}>
                                {toCommaRep(this.props.user.ranking)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.leftSplit2}>
                        <SuccessfulConvos
                            conversations={this.props.user.successfulConvos}
                        />
                        <BeenBlocked
                            beenBlocked={this.props.user.beenBlocked}
                        />
                        <Blocked blocked={this.props.user.blocked} />
                    </View>
                    <View style={styles.leftSplit3}>
                        <View style={styles.split3Left}>
                            <Text style={styles.statsLevelText}>
                                {`Level ${toCommaRep(level)}`}
                            </Text>
                        </View>
                        <View style={styles.split3Right}>
                            <Text style={styles.statsProgressText}>
                                {`${toRep(levelProgress)} / ${toRep(
                                    levelGoal
                                )}`}
                            </Text>
                        </View>
                        <LevelInfoModal user={this.props.user} />
                    </View>
                    <View style={styles.leftSplit4}>
                        <View
                            style={styles.statsProgressBar}
                            onLayout={({
                                nativeEvent: {
                                    layout: { width },
                                },
                            }) => {
                                if (!this.state.tookWidth) {
                                    this.setState({
                                        tookWidth: true,
                                        fillWidth: width,
                                    });
                                }
                            }}
                        >
                            <View
                                style={[
                                    styles.statsProgressFill,
                                    {
                                        width:
                                            this.state.fillWidth *
                                            (levelProgress / levelGoal),
                                    },
                                ]}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.statsRight}>
                    <View style={styles.statsRightTop}>
                        <Text style={styles.statsWalletText}>Savings</Text>
                        <BoltBox
                            amount={this.props.user.bolts}
                            boltSize={30}
                            fontSize={18}
                            showAbbreviated={false}
                            moveTextRight={2}
                        />
                        <CoinBox
                            amount={this.props.user.coin}
                            coinSize={30}
                            fontSize={18}
                            showAbbreviated={false}
                        />
                    </View>
                    <View style={styles.statsRightBottom}>
                        <TouchableOpacity onPress={this.props.openFollows}>
                            <Text style={styles.statsFollowsText}>
                                Followers
                            </Text>
                            <Text style={styles.followsCountText}>
                                {toCommaRep(this.props.user.followers)}
                            </Text>
                            <Text style={styles.statsFollowsText}>
                                Following
                            </Text>
                            <Text style={styles.followsCountText}>
                                {toCommaRep(this.props.user.following)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
