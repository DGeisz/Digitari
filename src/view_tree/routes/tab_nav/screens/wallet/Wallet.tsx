import * as React from "react";
import { View } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import Challenge from "../../../../../global_building_blocks/challenge/Challenge";
import { exampleChallenge } from "../../../../../global_types/ChallengeTypes";

interface Props {}

const Wallet: React.FC<Props> = () => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <Challenge challenge={exampleChallenge} />
        </View>
    );
};

export default Wallet;
