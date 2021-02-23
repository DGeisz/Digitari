import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ProfileHeaderStyles";
import { Ionicons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { UserType } from "../../../global_types/UserTypes";
import Tier from "../../tier/Tier";
import { palette } from "../../../global_styles/Palette";
import { toRep } from "../../../global_utils/ValueRepUtils";
import CoinBox from "../../coin_box/CoinBox";

interface Props {
    user: UserType;
}

const ProfileHeader: React.FC<Props> = ({ user }) => {
    return (
        <View pointerEvents="box-none">
            <View
                style={styles.profileHeaderContainer}
                pointerEvents="box-none"
            >
                <View style={styles.profileSplit1} pointerEvents="box-none">
                    <View style={styles.split1Left} pointerEvents="none">
                        <Tier size={40} ranking={123} />
                        <View style={styles.userLevelContainer}>
                            <Text style={styles.profileUserText}>
                                {`${user.firstName} ${user.lastName}`}
                            </Text>
                            <Text style={styles.profileLevelText}>
                                {["Level:", user.level].join(" ")}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.split1Right}
                        onPress={() => Auth.signOut().then()}
                    >
                        <Ionicons
                            name="settings"
                            size={24}
                            color={palette.mediumGray}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileSplit3} pointerEvents="none">
                    <Text style={styles.profileBioText}>{user.bio}</Text>
                </View>
                <View style={styles.profileSplit4} pointerEvents="none">
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
        </View>
    );
};

export default ProfileHeader;
