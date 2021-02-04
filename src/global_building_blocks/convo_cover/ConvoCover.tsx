import * as React from "react";
import { styles } from "./ConvoCoverStyles";
import { View, Text, TouchableOpacity } from "react-native";
import Tier from "../tier/Tier";
import { palette } from "../../global_styles/Palette";
import { Entypo } from "@expo/vector-icons";
import { ConvoCoverType } from "../../global_types/ConvoCoverTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";

interface Props {
    convoCover: ConvoCoverType;
    onPress?: () => void;
    active?: boolean;
    showBottomBorder?: boolean;
}

const defaultProps = {
    active: true,
    showBottomBorder: true,
};

const ConvoCover: React.FC<Props> = ({
    convoCover,
    onPress,
    active,
    showBottomBorder,
}) => {
    return (
        <TouchableOpacity
            style={styles.coverContainer}
            onPress={() => {
                if (active && onPress) onPress();
            }}
            activeOpacity={active ? 0.5 : 1}
        >
            <View style={styles.sideBuffer} />
            <View
                style={[
                    styles.main,
                    showBottomBorder
                        ? {}
                        : { borderBottomColor: palette.transparent },
                ]}
            >
                <View style={styles.mainHeader}>
                    <View style={styles.mainHeaderLeft}>
                        <Tier ranking={123} size={12} />
                        <View style={styles.mainHeaderTextContainer}>
                            <Text style={styles.coverUserText}>
                                {convoCover.user}
                            </Text>
                            <Text style={styles.mainHeaderDotText}>·</Text>
                            <Text style={styles.coverTimeText}>
                                {millisToRep(Date.now() - convoCover.time)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mainHeaderRight}>
                        <Entypo
                            name="chevron-right"
                            size={20}
                            color={palette.lightGray}
                        />
                    </View>
                </View>
                <View style={styles.mainBody}>
                    <Text style={styles.mainBodyText} numberOfLines={1}>
                        {convoCover.msg}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

ConvoCover.defaultProps = defaultProps;

export default ConvoCover;
