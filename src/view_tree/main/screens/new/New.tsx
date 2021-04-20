import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { styles } from "./NewStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import { NewNavProp } from "../../MainEntryNavTypes";

interface Props {
    navigation: NewNavProp;
}

const New: React.FC<Props> = (props) => {
    return (
        <View style={styles.newContainer}>
            <TouchableOpacity style={styles.newPostButton} activeOpacity={0.5}>
                <FontAwesome name="pencil" size={24} color={palette.white} />
                <Text style={styles.newPostButtonText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.newCommunityButton}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate("NewCommunity")}
            >
                <FontAwesome name="users" size={24} color={palette.deepBlue} />
                <Text style={styles.newCommunityButtonText}>Community</Text>
            </TouchableOpacity>
        </View>
    );
};

export default New;
