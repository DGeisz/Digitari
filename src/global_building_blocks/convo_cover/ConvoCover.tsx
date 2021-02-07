import * as React from "react";
import { styles } from "./ConvoCoverStyles";
import { View, Text, TouchableOpacity, LayoutAnimation } from "react-native";
import Tier from "../tier/Tier";
import { palette } from "../../global_styles/Palette";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { ConvoCoverType } from "../../global_types/ConvoCoverTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import { localSuid, localUid } from "../../global_state/UserState";
import UserLabel from "./building_blocks/user_label/UserLabel";
import { layoutAnimationConfig } from "../../global_animations/LayoutAnimationConfig";

interface Props {
    convoCover: ConvoCoverType;

    onPress?: () => void;
    showUserMap?: boolean;
    showUnViewedDot?: boolean;
    showBottomBorder?: boolean;
}

export default class ConvoCover extends React.PureComponent<Props> {
    static defaultProps = {
        showUnViewedDot: true,
        showBottomBorder: true,
        showUserMap: false,
    };

    state = {
        pressed: true,
    };

    render() {
        let name;
        let anonymous;
        let ranking;
        let viewed;

        const uid = localUid();
        const suid = localSuid();

        if (
            this.props.convoCover.sid === uid ||
            this.props.convoCover.sid === suid
        ) {
            name = this.props.convoCover.sname;
            anonymous = this.props.convoCover.sanony;
            ranking = this.props.convoCover.sranking;
            viewed = this.props.convoCover.sviewed;
        } else {
            name = this.props.convoCover.tname;
            anonymous = this.props.convoCover.tanony;
            ranking = this.props.convoCover.tranking;
            viewed = this.props.convoCover.tviewed;
        }

        return (
            <View style={styles.coverContainer}>
                <TouchableOpacity
                    style={styles.coverBodyContainer}
                    onPress={() => {
                        this.props.onPress && this.props.onPress();
                        LayoutAnimation.configureNext(layoutAnimationConfig);
                        this.setState({ pressed: false });
                    }}
                    activeOpacity={0.5}
                >
                    {this.state.pressed &&
                    this.props.showUnViewedDot &&
                    !viewed ? (
                        <View style={styles.dotBuffer}>
                            <View style={styles.dot} />
                        </View>
                    ) : (
                        <View style={styles.sideBuffer} />
                    )}
                    <View style={styles.main}>
                        <View style={styles.mainHeader}>
                            <View style={styles.mainHeaderLeft}>
                                {this.props.showUserMap ? (
                                    <>
                                        <View
                                            style={
                                                styles.mainHeaderTextContainer
                                            }
                                        >
                                            <Tier
                                                ranking={
                                                    this.props.convoCover
                                                        .sranking
                                                }
                                                size={14}
                                            />
                                            <UserLabel
                                                name={
                                                    this.props.convoCover.sname
                                                }
                                                anonymous={
                                                    this.props.convoCover.sanony
                                                }
                                            />
                                            <Text style={styles.arrowText}>
                                                {"  ➤  "}
                                            </Text>
                                            <Tier
                                                ranking={
                                                    this.props.convoCover
                                                        .tranking
                                                }
                                                size={14}
                                            />
                                            <UserLabel
                                                name={
                                                    this.props.convoCover.tname
                                                }
                                                anonymous={
                                                    this.props.convoCover.tanony
                                                }
                                            />
                                            <Text
                                                style={styles.mainHeaderDotText}
                                            >
                                                ·
                                            </Text>
                                            <Text style={styles.coverTimeText}>
                                                {millisToRep(
                                                    Date.now() -
                                                        this.props.convoCover
                                                            .time
                                                )}
                                            </Text>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Tier ranking={ranking} size={14} />
                                        <View
                                            style={
                                                styles.mainHeaderTextContainer
                                            }
                                        >
                                            <UserLabel
                                                name={name}
                                                anonymous={anonymous}
                                            />
                                            <Text
                                                style={styles.mainHeaderDotText}
                                            >
                                                ·
                                            </Text>
                                            <Text style={styles.coverTimeText}>
                                                {millisToRep(
                                                    Date.now() -
                                                        this.props.convoCover
                                                            .time
                                                )}
                                            </Text>
                                        </View>
                                    </>
                                )}
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
                {this.props.showBottomBorder && (
                    <View style={styles.bottomBorder} />
                )}
            </View>
        );
    }
}
