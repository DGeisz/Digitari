import * as React from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./NewCommunityStyles";
import { palette } from "../../../../../../global_styles/Palette";

interface Props {}

const NewCommunity: React.FC<Props> = () => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.newCommunityContainer}
            onPress={Keyboard.dismiss}
        >
            <Input
                placeholder="Community name"
                labelStyle={{ color: palette.deepBlue }}
                label="Name"
            />
            <Input
                placeholder="Community description"
                labelStyle={{ color: palette.deepBlue }}
                label="Description"
                multiline
            />
        </TouchableOpacity>
    );
};

export default NewCommunity;
