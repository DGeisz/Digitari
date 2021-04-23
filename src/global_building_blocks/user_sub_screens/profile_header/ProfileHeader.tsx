import React, { useState } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
} from "react-native";
import { styles } from "./ProfileHeaderStyles";
import { UserType } from "../../../global_types/UserTypes";
import Tier from "../../tier/Tier";
import { toRep } from "../../../global_utils/ValueRepUtils";
import CoinBox from "../../coin_box/CoinBox";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { palette } from "../../../global_styles/Palette";
import BioModal from "./building_blocks/bio_modal/BioModal";

interface Props {
    user: UserType;
    isMe: boolean;
    openFollows: () => void;
    handleFollow: () => void;
    handleUnFollow: () => void;
    handleSettings: () => void;
}

const ProfileHeader: React.FC<Props> = (props) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [editBioVisible, showEditBio] = useState<boolean>(false);

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
                <View style={styles.profileSplit0}>
                    <View style={styles.split0Left}>
                        {!!props.user.imgUrl ? (
                            <Image
                                style={styles.userImage}
                                source={{ uri: props.user.imgUrl }}
                            />
                        ) : (
                            <View style={styles.userIconContainer}>
                                <FontAwesome
                                    name="user"
                                    color={palette.white}
                                    size={30}
                                />
                            </View>
                        )}
                        {props.isMe && (
                            <>
                                <BioModal
                                    imgUrl={props.user.imgUrl}
                                    bio={props.user.bio}
                                    visible={editBioVisible}
                                    hideModal={() => {
                                        showEditBio(false);
                                        Keyboard.dismiss();
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => showEditBio(true)}
                                >
                                    <Text style={styles.editProfileText}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={styles.split0Right}>
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
                <View style={styles.profileSplit1} pointerEvents="box-none">
                    <View style={styles.split1Left} pointerEvents="none">
                        <Tier size={40} ranking={props.user.ranking} />
                        <View style={styles.userLevelContainer}>
                            <Text style={styles.profileUserText}>
                                {`${props.user.firstName} ${props.user.lastName}`}
                            </Text>
                            <Text style={styles.profileLevelText}>
                                {["Level:", props.user.level].join(" ")}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.profileSplit3} pointerEvents="none">
                    <Text style={styles.profileBioText}>{props.user.bio}</Text>
                </View>
                <View style={styles.profileSplit4} pointerEvents="box-none">
                    <View style={styles.split4Left}>
                        <TouchableOpacity
                            style={styles.followsButton}
                            activeOpacity={0.5}
                            onPress={props.openFollows}
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
