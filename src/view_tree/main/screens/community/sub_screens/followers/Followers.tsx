import React from "react";
import { useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { Text, View, Animated } from "react-native";
import FollowEntity from "../../../../../../global_building_blocks/follow_entity/FollowEntity";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import {
    GET_FOLLOWERS,
    GetFollowersData,
    GetFollowersVariables,
} from "./gql/Queries";
import { styles } from "./FollowersStyles";

interface Props {
    routeKey: string;
    tid: string;
    onSelectUser: (uid: string) => void;
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

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);

    console.log(data);

    if (loading || !data?.followers) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (data.followers.length > 0) {
        return (
            <Animated.FlatList
                {...scrollPropsAndRef}
                data={data.followers}
                style={styles.followersList}
                renderItem={({ item }) => (
                    <FollowEntity
                        entity={item}
                        onSelectCommunity={() => {}}
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
                    This community doesn't have any followers
                </Text>
            </View>
        );
    }
};

export default Followers;
