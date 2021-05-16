import React from "react";
import { styles } from "./ConvoCoverStyles";
import { View, Text, TouchableOpacity } from "react-native";
import Tier from "../tier/Tier";
import { palette } from "../../global_styles/Palette";
import { Entypo } from "@expo/vector-icons";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import { localUid } from "../../global_state/UserState";
import UserLabel from "./building_blocks/user_label/UserLabel";
import { ConvoType } from "../../global_types/ConvoTypes";

interface Props {
    convo: ConvoType;

    displayActive: boolean;
    openConvo?: (cvid: string, pid: string) => void;
    showUnViewedDot?: boolean;
    showBottomBorder?: boolean;
}

export default class ConvoCover extends React.Component<Props> {
    static defaultProps = {
        showUnViewedDot: true,
        showBottomBorder: true,
    };

    shouldComponentUpdate(
        nextProps: Readonly<Props>,
        nextState: Readonly<{}>,
        nextContext: any
    ): boolean {
        return (
            this.props.convo !== nextProps.convo ||
            this.props.showUnViewedDot !== nextProps.showUnViewedDot ||
            this.props.showBottomBorder !== nextProps.showBottomBorder
        );
    }

    componentDidUpdate(
        prevProps: Readonly<Props>,
        prevState: Readonly<{}>,
        snapshot?: any
    ) {
        console.log(
            prevProps.convo === this.props.convo,
            prevProps.openConvo === this.props.openConvo
        );
    }

    render() {
        const uid = localUid();

        const viewed =
            this.props.convo.tid === uid
                ? this.props.convo.tviewed
                : this.props.convo.sviewed;

        const displayTime = this.props.displayActive
            ? parseInt(this.props.convo.lastTime)
            : parseInt(this.props.convo.initialTime);

        const displayMessage = this.props.displayActive
            ? this.props.convo.lastMsg
            : this.props.convo.initialMsg;

        return (
            <View style={styles.coverContainer}>
                <TouchableOpacity
                    style={styles.coverBodyContainer}
                    onPress={() => {
                        this.props.openConvo &&
                            this.props.openConvo(
                                this.props.convo.id,
                                this.props.convo.pid
                            );
                    }}
                    activeOpacity={0.5}
                >
                    {this.props.showUnViewedDot && !viewed ? (
                        <View style={styles.dotBuffer}>
                            <View style={styles.dot} />
                        </View>
                    ) : (
                        <View style={styles.sideBuffer} />
                    )}
                    <View style={styles.main}>
                        <View style={styles.mainHeader}>
                            <View style={styles.mainHeaderLeft}>
                                <View style={styles.mainHeaderTextContainer}>
                                    {/*<View style={styles.headerTop}>*/}
                                    <Tier
                                        ranking={this.props.convo.sranking}
                                        size={14}
                                    />
                                    <UserLabel
                                        name={this.props.convo.sname}
                                        anonymous={this.props.convo.sanony}
                                    />
                                    <Text style={styles.arrowText}>
                                        {"  ➤  "}
                                    </Text>
                                    <Tier
                                        ranking={this.props.convo.tranking}
                                        size={14}
                                    />
                                    <UserLabel
                                        name={this.props.convo.tname}
                                        anonymous={false}
                                    />
                                    <Text style={styles.mainHeaderDotText}>
                                        ·
                                    </Text>
                                    <Text style={styles.coverTimeText}>
                                        {millisToRep(Date.now() - displayTime)}
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
                                {displayMessage}
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
