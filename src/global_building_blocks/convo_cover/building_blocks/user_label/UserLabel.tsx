import React from "react";
import { Text } from "react-native";
import { styles } from "./UserLabelStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";

interface Props {
    name: string;
    anonymous: boolean;
}

export default class UserLabel extends React.PureComponent<Props> {
    render() {
        if (this.props.anonymous) {
            return (
                <MaterialCommunityIcons
                    style={styles.incognitoStyle}
                    name="incognito"
                    size={17}
                    color={palette.hardGray}
                />
            );
        } else {
            return <Text style={styles.labelUserText}>{this.props.name}</Text>;
        }
    }
}
