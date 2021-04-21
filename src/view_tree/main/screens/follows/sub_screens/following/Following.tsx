import React, { useState } from "react";
import {
    GET_FOLLOWING,
    GetFollowingData,
    GetFollowingVariables,
} from "./gql/Queries";
import { useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FollowEntity from "../../../../../../global_building_blocks/follow_entity/FollowEntity";
import { styles } from "./FollowingStyles";
import { palette } from "../../../../../../global_styles/Palette";
import { FollowEntityEnum } from "../../../../../../global_types/FollowEntityType";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import { localUid } from "../../../../../../global_state/UserState";

interface Props {
    sid: string;
    onSelectCommunity: (cmid: string) => void;
    onSelectUser: (uid: string) => void;
}

const activeColor = palette.white;
const inactiveColor = palette.mediumGray;

const Following: React.FC<Props> = (props) => {
    const uid = localUid();

    const [followEntity, setFollowEntity] = useState<
        FollowEntityEnum | undefined
    >(undefined);

    const { data, error, refetch, fetchMore, loading } = useQuery<
        GetFollowingData,
        GetFollowingVariables
    >(GET_FOLLOWING, {
        variables: {
            sid: props.sid,
            entityType: followEntity,
        },
        fetchPolicy: uid === props.sid ? "network-only" : "cache-first",
    });

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <View style={basicLayouts.flexGrid1}>
            <View style={styles.followEntityBar}>
                <TouchableOpacity
                    style={[
                        styles.followEntity,
                        followEntity === undefined
                            ? { backgroundColor: palette.deepBlue }
                            : {},
                    ]}
                    onPress={() => setFollowEntity(undefined)}
                >
                    <Text
                        style={[
                            styles.followEntityText,
                            {
                                color:
                                    followEntity === undefined
                                        ? activeColor
                                        : inactiveColor,
                            },
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.followEntity,
                        followEntity === FollowEntityEnum.user
                            ? { backgroundColor: palette.deepBlue }
                            : {},
                    ]}
                    onPress={() => setFollowEntity(FollowEntityEnum.user)}
                >
                    <Text
                        style={[
                            styles.followEntityText,
                            {
                                color:
                                    followEntity === FollowEntityEnum.user
                                        ? activeColor
                                        : inactiveColor,
                            },
                        ]}
                    >
                        Users
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.followEntity,
                        followEntity === FollowEntityEnum.community
                            ? { backgroundColor: palette.deepBlue }
                            : {},
                    ]}
                    onPress={() => setFollowEntity(FollowEntityEnum.community)}
                >
                    <Text
                        style={[
                            styles.followEntityText,
                            {
                                color:
                                    followEntity === FollowEntityEnum.community
                                        ? activeColor
                                        : inactiveColor,
                            },
                        ]}
                    >
                        Communities
                    </Text>
                </TouchableOpacity>
            </View>
            {loading || !data?.following ? (
                <LoadingWheel />
            ) : data.following.length > 0 ? (
                <>
                    <FlatList
                        data={data.following}
                        style={styles.followingList}
                        renderItem={({ item }) => (
                            <FollowEntity
                                entity={item}
                                onSelectCommunity={props.onSelectCommunity}
                                onSelectUser={props.onSelectUser}
                                isFollower={false}
                            />
                        )}
                        keyExtractor={(_, index) => {
                            return [props.sid, "follower", index].join(":");
                        }}
                        onEndReached={() => {
                            if (data?.following && data.following.length > 0) {
                                const lastTime =
                                    data.following[data.following.length - 1]
                                        .time;

                                fetchMore({
                                    variables: {
                                        tid: props.sid,
                                        lastTime,
                                    },
                                }).then();
                            }
                        }}
                    />
                </>
            ) : (
                <View style={styles.noFollowingContainer}>
                    <Text style={styles.noFollowingText}>
                        This user isn't following{" "}
                        {followEntity === FollowEntityEnum.user
                            ? "any users"
                            : followEntity === FollowEntityEnum.community
                            ? "any communities"
                            : "anyone"}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Following;
