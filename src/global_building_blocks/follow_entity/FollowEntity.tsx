import React from "react";
import { styles } from "./FollowEntityStyles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
    FollowEntityEnum,
    FollowEntityType,
} from "../../global_types/FollowEntityType";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../global_styles/Palette";

interface Props {
    entity: FollowEntityType;
    onSelectCommunity: (cmid: string) => void;
    onSelectUser: (uid: string) => void;
    isFollower: boolean;
}

const FollowEntity: React.FC<Props> = (props) => {
    return (
        <TouchableOpacity
            style={styles.entityContainer}
            activeOpacity={0.5}
            onPress={() => {
                if (
                    props.entity.entityType === FollowEntityEnum.user ||
                    props.isFollower
                ) {
                    props.onSelectUser(
                        props.isFollower ? props.entity.sid : props.entity.tid
                    );
                } else {
                    props.onSelectCommunity(props.entity.tid);
                }
            }}
        >
            <View style={styles.entityLeft}>
                {props.entity.entityType === FollowEntityEnum.user ||
                props.isFollower ? (
                    !!props.entity.imgUrl ? (
                        <Image
                            style={styles.userImageContainer}
                            source={{
                                uri: props.entity.imgUrl,
                            }}
                        />
                    ) : (
                        <View style={styles.userIconContainer}>
                            <FontAwesome
                                name="user"
                                color={palette.white}
                                size={23}
                            />
                        </View>
                    )
                ) : (
                    <View style={styles.communityIconContainer}>
                        <FontAwesome
                            name="users"
                            color={palette.deepBlue}
                            size={23}
                        />
                    </View>
                )}
                <Text style={styles.entityNameText}>{props.entity.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FollowEntity;
