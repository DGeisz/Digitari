import React, { useContext, useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { Text, View, Animated, RefreshControl } from "react-native";
import FollowEntity from "../../../../../../global_building_blocks/follow_entity/FollowEntity";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import {
    GET_FOLLOWERS,
    GetFollowersData,
    GetFollowersVariables,
} from "./gql/Queries";
import { styles } from "./FollowersStyles";
import { palette } from "../../../../../../global_styles/Palette";
import { CommunityContext } from "../../CommunityContext";

const Followers: React.FC = () => {
    const context = useContext(CommunityContext);

    const { data, error, refetch, networkStatus, fetchMore } = useQuery<
        GetFollowersData,
        GetFollowersVariables
    >(GET_FOLLOWERS, {
        variables: {
            tid: context.tid,
        },
    });

    const scrollPropsAndRef = useCollapsibleScene("CommunityFollowers");
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (networkStatus === NetworkStatus.loading && !data?.followers) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.followers && data.followers.length > 0) {
        return (
            <Animated.FlatList
                {...scrollPropsAndRef}
                data={data.followers}
                style={styles.followersList}
                renderItem={({ item }) => (
                    <FollowEntity
                        entity={item}
                        onSelectCommunity={() => {}}
                        onSelectUser={context.onSelectUser}
                        isFollower={true}
                    />
                )}
                keyExtractor={(_, index) => {
                    return [context.tid, "follower", index].join(":");
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={
                            networkStatus === NetworkStatus.refetch || stillSpin
                        }
                        onRefresh={() => {
                            setStillSpin(true);
                            refetch && refetch();
                            !!context.refreshHeader && context.refreshHeader();
                            setTimeout(() => {
                                setStillSpin(false);
                            }, 1000);
                        }}
                        colors={[
                            palette.deepBlue,
                            palette.darkForestGreen,
                            palette.oceanSurf,
                        ]}
                        tintColor={palette.deepBlue}
                    />
                }
                onEndReached={() => {
                    if (data?.followers && data.followers.length > 0) {
                        const lastTime =
                            data.followers[data.followers.length - 1].time;

                        fetchMore({
                            variables: {
                                tid: context.tid,
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
