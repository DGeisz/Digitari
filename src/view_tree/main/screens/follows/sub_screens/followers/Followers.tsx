import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import {
    GET_FOLLOWERS,
    GetFollowersData,
    GetFollowersVariables,
} from "./gql/Queries";
import { styles } from "./FollowersStyles";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import FollowEntity from "../../../../../../global_building_blocks/follow_entity/FollowEntity";

interface Props {
    tid: string;
    onSelectCommunity: (cmid: string) => void;
    onSelectUser: (uid: string) => void;
    isUser: boolean;
}

const Followers: React.FC<Props> = (props) => {
    const { data, error, refetch, loading, fetchMore } = useQuery<
        GetFollowersData,
        GetFollowersVariables
    >(GET_FOLLOWERS, {
        variables: {
            tid: props.tid,
        },
    });

    console.log(data);

    if (loading || !data?.followers) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (data.followers.length > 0) {
        return (
            <FlatList
                data={data.followers}
                style={styles.followersList}
                renderItem={({ item }) => (
                    <FollowEntity
                        entity={item}
                        onSelectCommunity={props.onSelectCommunity}
                        onSelectUser={props.onSelectUser}
                        isFollower={true}
                    />
                )}
                keyExtractor={(_, index) => {
                    return [props.tid, "follower", index].join(":");
                }}
                onEndReached={() => {
                    if (data?.followers && data.followers.length > 0) {
                        const lastTime =
                            data.followers[data.followers.length - 1].time;

                        fetchMore({
                            variables: {
                                tid: props.tid,
                                lastTime,
                            },
                        }).then();
                    }
                }}
            />
        );
    } else {
        return (
            <View style={styles.noFollowersContainer}>
                <Text style={styles.noFollowersText}>
                    This user doesn't have any followers
                </Text>
            </View>
        );
    }
};

export default Followers;
