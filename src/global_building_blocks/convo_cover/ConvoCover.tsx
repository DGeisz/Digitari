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

export default class ConvoCover extends React.PureComponent<Props> {
    static defaultProps = {
        active: true,
        showBottomBorder: true,
    };

    render() {
        return (
            <TouchableOpacity
                style={styles.coverContainer}
                onPress={() => {
                    if (this.props.active && this.props.onPress)
                        this.props.onPress();
                }}
                activeOpacity={this.props.active ? 0.5 : 1}
            >
                <View style={styles.sideBuffer} />
                <View
                    style={[
                        styles.main,
                        this.props.showBottomBorder
                            ? {}
                            : { borderBottomColor: palette.transparent },
                    ]}
                >
                    <View style={styles.mainHeader}>
                        <View style={styles.mainHeaderLeft}>
                            <Tier ranking={123} size={12} />
                            <View style={styles.mainHeaderTextContainer}>
                                <Text style={styles.coverUserText}>
                                    {this.props.convoCover.user}
                                </Text>
                                <Text style={styles.mainHeaderDotText}>·</Text>
                                <Text style={styles.coverTimeText}>
                                    {millisToRep(
                                        Date.now() - this.props.convoCover.time
                                    )}
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
                            {this.props.convoCover.msg}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
