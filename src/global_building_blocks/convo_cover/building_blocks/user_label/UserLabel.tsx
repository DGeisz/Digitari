import React from "react";
import { Text } from "react-native";
import { styles } from "./UserLabelStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";

const MAX_NAME_LEN = 10;

interface Props {
    name: string;
    anonymous: boolean;
}

export default class UserLabel extends React.PureComponent<Props> {
    render() {
        const name =
            this.props.name.length > MAX_NAME_LEN
                ? [this.props.name.substring(0, MAX_NAME_LEN), "..."].join("")
                : this.props.name;

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
            return <Text style={styles.labelUserText}>{name}</Text>;
        }
    }
}
