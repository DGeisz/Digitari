import * as React from "react";
import { Text, View } from "react-native";
import { styles } from "./CommunityHeaderStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import { CommunityType } from "../../../../../../global_types/CommunityTypes";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";
import { dateFormatter } from "../../../../../../global_utils/TimeRepUtils";

interface Props {
    community: CommunityType;
}

export default class CommunityHeader extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerHeader}>
                    <FontAwesome
                        name="users"
                        size={20}
                        color={palette.deepBlue}
                    />
                    <Text style={styles.nameText}>
                        {this.props.community.name}
                    </Text>
                </View>
                <View style={styles.headerBody}>
                    <Text style={styles.descriptionText}>
                        {this.props.community.description}
                    </Text>
                </View>
                <View style={styles.headerFooter}>
                    <View style={styles.footerLeft}>
                        <Text style={styles.followsText}>
                            <Text style={styles.followsCountText}>
                                {toRep(this.props.community.followers)}
                                <Text style={styles.followsText}>
                                    {" Followers"}
                                </Text>
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.footerRight}>
                        <Text style={styles.dateText}>
                            {`Created: ${dateFormatter(
                                this.props.community.timeCreated
                            )}`}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
