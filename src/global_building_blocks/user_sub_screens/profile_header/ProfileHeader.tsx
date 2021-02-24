import * as React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./ProfileHeaderStyles";
import { UserType } from "../../../global_types/UserTypes";
import Tier from "../../tier/Tier";
import { toRep } from "../../../global_utils/ValueRepUtils";
import CoinBox from "../../coin_box/CoinBox";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../../global_styles/Palette";

interface Props {
    user: UserType;
    isMe: boolean;
    handleFollow: () => void;
    handleUnFollow: () => void;
    handleSettings: () => void;
}

const ProfileHeader: React.FC<Props> = (props) => {
    const [showError, setShowError] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    return (
        <View pointerEvents="box-none">
            <View
                style={styles.profileHeaderContainer}
                pointerEvents="box-none"
            >
                {showError && (
                    <Text style={styles.followErrorText}>
                        {`You need ${props.user.followPrice} digicoin to follow this user`}
                    </Text>
                )}
                <View style={styles.profileSplit1} pointerEvents="box-none">
                    <View style={styles.split1Left} pointerEvents="none">
                        <Tier size={40} ranking={123} />
                        <View style={styles.userLevelContainer}>
                            <Text style={styles.profileUserText}>
                                {`${props.user.firstName} ${props.user.lastName}`}
                            </Text>
                            <Text style={styles.profileLevelText}>
                                {["Level:", props.user.level].join(" ")}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.split1Right}>
                        {props.isMe ? (
                            <TouchableOpacity onPress={props.handleSettings}>
                                <Ionicons
                                    name="settings"
                                    size={24}
                                    color={palette.mediumGray}
                                />
                            </TouchableOpacity>
                        ) : loading ? (
                            <ActivityIndicator
                                color={palette.deepBlue}
                                size="small"
                            />
                        ) : props.user.amFollowing ? (
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={async () => {
                                    props.handleUnFollow();
                                    setShowError(false);
                                }}
                            >
                                <Text style={styles.followButtonText}>
                                    Unfollow
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={async () => {
                                    setLoading(true);

                                    try {
                                        await props.handleFollow();
                                    } catch (_) {
                                        setShowError(true);
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                <View style={styles.followButtonTextContainer}>
                                    <Text style={styles.followButtonText}>
                                        Follow
                                    </Text>
                                </View>
                                <CoinBox
                                    amount={props.user.followPrice}
                                    fontSize={15}
                                    coinSize={23}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.profileSplit3} pointerEvents="none">
                    <Text style={styles.profileBioText}>{props.user.bio}</Text>
                </View>
                <View style={styles.profileSplit4} pointerEvents="none">
                    <View style={styles.split4Left}>
                        <TouchableOpacity
                            style={styles.followsButton}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.followNumeralText}>
                                {[toRep(props.user.followers)]}
                                <Text style={styles.followsText}>
                                    {" Followers"}
                                </Text>
                            </Text>
                            <Text style={styles.followNumeralText}>
                                {[toRep(props.user.following)]}
                                <Text style={styles.followingText}>
                                    {" Following"}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.split4Right}>
                        <CoinBox
                            amount={props.user.coin}
                            coinSize={25}
                            fontSize={15}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

ProfileHeader.defaultProps = {
    isMe: false,
};

export default ProfileHeader;
