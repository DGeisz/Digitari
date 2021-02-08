import * as React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { styles } from "./ChallengeStyles";
import CoinBox from "../coin_box/CoinBox";
import { palette } from "../../global_styles/Palette";
import {
    challengeClasses,
    ChallengeType,
} from "../../global_types/ChallengeTypes";
import { toRep } from "../../global_utils/ValueRepUtils";
import { UserType } from "../../global_types/UserTypes";
import { FontAwesome } from "@expo/vector-icons";
import ChallengeTier from "./tier/ChallengeTier";

const { width } = Dimensions.get("window");

interface Props {
    challenge: ChallengeType;
    user: UserType;
}

interface State {
    fillWidth: number;
}

export default class Challenge extends React.PureComponent<Props, State> {
    state = {
        fillWidth: width / 4,
    };

    render() {
        let progress: number;

        switch (this.props.challenge.class) {
            case challengeClasses.coinSpent:
                progress = this.props.user.coinSpent;
                break;
            case challengeClasses.postCount:
                progress = this.props.user.postCount;
                break;
            case challengeClasses.donated2Other:
                progress = this.props.user.donated2Other;
                break;
            case challengeClasses.donated2User:
                progress = this.props.user.donated2User;
                break;
            case challengeClasses.responses2Other:
                progress = this.props.user.responses2Other;
                break;
            case challengeClasses.responses2User:
                progress = this.props.user.responses2User;
                break;
            case challengeClasses.successfulConvos:
                progress = this.props.user.successfulConvos;
                break;
            case challengeClasses.following:
                progress = this.props.user.following;
                break;
            case challengeClasses.followers:
                progress = this.props.user.followers;
                break;
            case challengeClasses.followersViaLink:
                progress = this.props.user.followersViaLink;
                break;
            case challengeClasses.comsCreated:
                progress = this.props.user.comsCreated;
                break;
            case challengeClasses.welcomeCount:
                progress = this.props.user.welcomeCount;
                break;
            case challengeClasses.invite2ComViaLink:
                progress = this.props.user.invite2ComViaLink;
                break;
            default:
                progress = 0;
        }

        console.log(this.props.challenge);

        return (
            <View style={styles.challengeContainer}>
                <View style={styles.challengeSideCoin}>
                    <ChallengeTier
                        tier={this.props.challenge.tier}
                        coinSize={30}
                    />
                </View>
                <View style={styles.challengeMain}>
                    <View style={styles.challengeMainTop}>
                        <View style={styles.challengeTopLeft}>
                            <View style={styles.challengeTextContainer}>
                                <Text style={styles.challengeText}>
                                    {this.props.challenge.description}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.infoButton}>
                                <FontAwesome
                                    name="info"
                                    size={20}
                                    color={palette.darkForestGreen}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.challengeTopRight}>
                            <CoinBox
                                coinSize={20}
                                amount={this.props.challenge.coinReward}
                                boxColor={palette.lightForestGreen}
                                showCoinPlus
                            />
                        </View>
                    </View>
                    <View style={styles.challengeMainBottom}>
                        <View style={styles.challengeBottomLeft}>
                            <View
                                style={styles.challengeProgressBar}
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
                                        { width: this.state.fillWidth },
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={styles.challengeBottomRight}>
                            <Text style={styles.challengeCompletionText}>
                                {`${toRep(progress)} / ${toRep(
                                    this.props.challenge.goal
                                )}`}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
