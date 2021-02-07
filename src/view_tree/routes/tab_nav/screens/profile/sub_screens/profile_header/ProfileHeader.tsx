import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ProfileHeaderStyles";
import { Ionicons } from "@expo/vector-icons";
import Tier from "../../../../../../../global_building_blocks/tier/Tier";
import CoinBox from "../../../../../../../global_building_blocks/coin_box/CoinBox";
import { UserType } from "../../../../../../../global_types/UserTypes";
import { toRep } from "../../../../../../../global_utils/ValueRepUtils";
import { palette } from "../../../../../../../global_styles/Palette";

interface Props {
    user: UserType;
}

const ProfileHeader: React.FC<Props> = ({ user }) => {
    return (
        <>
            <View style={styles.profileHeaderContainer}>
                <View style={styles.profileSplit1}>
                    <View style={styles.split1Left}>
                        <Tier size={40} ranking={123} />
                        <View style={styles.userLevelContainer}>
                            <Text style={styles.profileUserText}>
                                {user.user}
                            </Text>
                            <Text style={styles.profileLevelText}>
                                {["Level:", user.level].join(" ")}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.split1Right}>
                        <Ionicons
                            name="settings"
                            size={24}
                            color={palette.mediumGray}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileSplit3}>
                    <Text style={styles.profileBioText}>{user.bio}</Text>
                </View>
                <View style={styles.profileSplit4}>
                    <View style={styles.split4Left}>
                        <TouchableOpacity
                            style={styles.followsButton}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.followNumeralText}>
                                {[toRep(user.followers)]}
                                <Text style={styles.followsText}>
                                    {" Followers"}
                                </Text>
                            </Text>
                            <Text style={styles.followNumeralText}>
                                {[toRep(user.following)]}
                                <Text style={styles.followingText}>
                                    {" Following"}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.split4Right}>
                        <CoinBox
                            amount={user.coin}
                            coinSize={25}
                            fontSize={15}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

export default ProfileHeader;
