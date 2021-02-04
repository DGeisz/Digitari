import * as React from "react";
import {Text} from "react-native";

interface Props {
    size: number,
    ranking: number
}

const Tier: React.FC<Props> = ({size}) => {
    return (
        <Text style={{fontSize: size}}>
            😊
        </Text>
    );
};

export default Tier;