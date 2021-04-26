import React from "react";
import { styles } from "./StatsHeaderStyles";
import { Text, View } from "react-native";
import { UserType } from "../../../../../global_types/UserTypes";
import Tier from "../../../../tier/Tier";
import { toRep } from "../../../../../global_utils/ValueRepUtils";
import {
    BeenBlocked,
    Blocked,
    SuccessfulConvos,
} from "../../../../big_three/BigThree";
import { getNextLevelCoinThreshold } from "../../../../../global_utils/LevelRepUtils";
import CoinBox from "../../../../coin_box/CoinBox";

interface Props {
    user: UserType;
}

interface State {
    fillWidth: number;
    tookWidth: boolean;
}

export default class StatsHeader extends React.PureComponent<Props, State> {
    state = {
        fillWidth: 0,
        tookWidth: false,
    };

    render() {
        return (
            <View style={styles.statsContainer}>
                <View style={styles.statsLeft}>
                    <Text style={styles.statsTitleText}>Tier Breakdown</Text>
                    <View style={styles.leftSplit1}>
                        <Tier size={30} ranking={this.props.user.ranking} />
                        <Text style={styles.statsRankingText}>
                            {toRep(this.props.user.ranking)}
                        </Text>
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
                                {`Level ${this.props.user.level}`}
                            </Text>
                        </View>
                        <View style={styles.split3Right}>
                            <Text style={styles.statsProgressText}>
                                {`${toRep(this.props.user.coinSpent)} / ${toRep(
                                    getNextLevelCoinThreshold(
                                        this.props.user.coinSpent
                                    )
                                )}`}
                            </Text>
                        </View>
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
                                            (this.props.user.coinSpent /
                                                getNextLevelCoinThreshold(
                                                    this.props.user.coinSpent
                                                )),
                                    },
                                ]}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.statsRight}>
                    <View style={styles.statsRightTop}>
                        <Text style={styles.statsWalletText}>Wallet</Text>
                        <CoinBox
                            amount={this.props.user.coin}
                            coinSize={30}
                            fontSize={18}
                        />
                    </View>
                    <View style={styles.statsRightBottom}>
                        <Text style={styles.followsCountText}>
                            {this.props.user.followers}
                            <Text style={styles.statsFollowsText}>
                                {" Followers"}
                            </Text>
                        </Text>
                        <Text style={styles.followsCountText}>
                            {this.props.user.following}
                            <Text style={styles.statsFollowsText}>
                                {" Following"}
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
