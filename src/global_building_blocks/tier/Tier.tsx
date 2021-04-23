import React from "react";
import { Text } from "react-native";
import {
    ranking2Tier,
    tier2Emoji,
    TierEmoji,
} from "../../global_types/TierTypes";

interface Props {
    size: number;
    ranking?: number;
    tier?: number;
}

export default class Tier extends React.PureComponent<Props> {
    render() {
        let emoji = TierEmoji.SlightlySmiling;

        if (typeof this.props.ranking !== "undefined") {
            emoji = tier2Emoji(ranking2Tier(this.props.ranking));
        } else if (typeof this.props.tier !== "undefined") {
            emoji = tier2Emoji(this.props.tier);
        }

        return <Text style={{ fontSize: this.props.size }}>{emoji}</Text>;
    }
}
