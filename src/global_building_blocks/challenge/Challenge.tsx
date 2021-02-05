import * as React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./ChallengeStyles";
import CoinBox from "../coin_box/CoinBox";
import { palette } from "../../global_styles/Palette";
import { ChallengeType } from "../../global_types/ChallengeTypes";
import { toRep } from "../../global_utils/ValueRepUtils";

const { width } = Dimensions.get("window");

interface Props {
    challenge: ChallengeType;
}

interface State {
    fillWidth: number;
}

export default class Challenge extends React.PureComponent<Props, State> {
    state = {
        fillWidth: width / 4,
    };

    render() {
        return (
            <View style={styles.challengeContainer}>
                <View style={styles.challengeTop}>
                    <View style={styles.challengeTopLeft}>
                        <Text style={styles.challengeText}>
                            {this.props.challenge.description}
                        </Text>
                    </View>
                    <View style={styles.challengeTopRight}>
                        <CoinBox
                            coinSize={20}
                            amount={this.props.challenge.coin}
                            boxColor={palette.lightForestGreen}
                            showCoinPlus
                        />
                    </View>
                </View>
                <View style={styles.challengeBottom}>
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
                                        (this.props.challenge.progress /
                                            this.props.challenge.total),
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
                            {`${toRep(this.props.challenge.progress)} / ${toRep(
                                this.props.challenge.total
                            )}`}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
