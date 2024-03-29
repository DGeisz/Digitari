import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./ChallengeStyles";
import CoinBox from "../coin_box/CoinBox";
import { palette } from "../../global_styles/Palette";
import {
    ChallengeType,
    ChallengeTypes,
    generateChallengeMessage,
} from "../../global_types/ChallengeTypes";
import { toRep } from "../../global_utils/ValueRepUtils";
import { UserType } from "../../global_types/UserTypes";
import ChallengeTier from "./tier/ChallengeTier";
import { GENERAL_CONTENT_WIDTH } from "../../global_constants/screen_constants";

interface Props {
    challenge: ChallengeType;
    user: UserType;
}

interface State {
    fillWidth: number;
}

export default class Challenge extends React.PureComponent<Props, State> {
    state = {
        fillWidth: GENERAL_CONTENT_WIDTH / 4,
    };

    render() {
        let progress: number;

        switch (this.props.challenge.stat) {
            case ChallengeTypes.ReceivedFromConvos:
                progress = parseInt(this.props.user.receivedFromConvos);
                break;
            case ChallengeTypes.SpentOnConvos:
                progress = parseInt(this.props.user.spentOnConvos);
                break;
            case ChallengeTypes.PostCount:
                progress = this.props.user.postCount;
                break;
            case ChallengeTypes.SuccessfulConvos:
                progress = this.props.user.successfulConvos;
                break;
            case ChallengeTypes.Followers:
                progress = this.props.user.followers;
                break;
            case ChallengeTypes.Following:
                /*
                 * Adjust for auto follow when account
                 * was created
                 */
                progress = this.props.user.following - 1;
                break;
            case ChallengeTypes.CommunityFollowers:
                progress = this.props.user.maxCommunityFollowers;
                break;
            default:
                progress = 0;
        }

        return (
            <View style={styles.challengeContainer}>
                <View style={styles.challengeSideCoin}>
                    <ChallengeTier
                        tier={this.props.challenge.class}
                        coinSize={35}
                    />
                </View>
                <View style={styles.challengeMain}>
                    <View style={styles.challengeMainTop}>
                        <View style={styles.challengeTopLeft}>
                            <View style={styles.challengeTextContainer}>
                                <Text style={styles.challengeText}>
                                    {generateChallengeMessage(
                                        this.props.challenge.stat,
                                        this.props.challenge.goal
                                    )}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.challengeTopRight}>
                            <Text style={styles.rewardTitle}>Reward</Text>
                            <CoinBox
                                coinSize={20}
                                amount={this.props.challenge.reward}
                                boxColor={palette.lightForestGreen}
                                showCoinPlus
                            />
                        </View>
                    </View>
                    <View style={styles.challengeMainBottom}>
                        <View style={styles.challengeBottomLeft}>
                            <View
                                style={[
                                    styles.challengeProgressBar,
                                    {
                                        borderColor:
                                            progress >=
                                            this.props.challenge.goal
                                                ? palette.quasiLightForestGreen
                                                : palette.deepBlue,
                                    },
                                ]}
                                onLayout={({
                                    nativeEvent: {
                                        layout: { width: pbWidth },
                                    },
                                }) => {
                                    this.setState({
                                        fillWidth:
                                            pbWidth *
                                            (progress /
                                                this.props.challenge.goal),
                                    });
                                }}
                            >
                                <View
                                    style={[
                                        styles.challengeProgressFill,
                                        {
                                            width: this.state.fillWidth,
                                            backgroundColor:
                                                progress >=
                                                this.props.challenge.goal
                                                    ? palette.quasiLightForestGreen
                                                    : palette.deepBlue,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={styles.challengeBottomRight}>
                            <Text style={styles.challengeCompletionText}>
                                {`${toRep(
                                    Math.min(
                                        progress,
                                        this.props.challenge.goal
                                    )
                                )} / ${toRep(this.props.challenge.goal)}`}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
