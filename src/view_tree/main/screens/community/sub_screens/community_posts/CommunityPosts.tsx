import React, { useContext, useState } from "react";
import {
    Animated,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { TabNavContext } from "../../../../routes/tab_nav/TabNavContext";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    GET_COMMUNITY_POSTS,
    GetCommunityPostsData,
    GetCommunityPostsVariables,
} from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import Post from "../../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../../global_styles/Palette";
import { globalScreenStyles } from "../../../../../../global_styles/GlobalScreenStyles";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { TierEmoji, TierEnum } from "../../../../../../global_types/TierTypes";
import { styles } from "./CommunityPostStyles";

interface Props {
    routeKey: string;
    cmid: string;
}

const CommunityPosts: React.FC<Props> = (props) => {
    const [tier, setTier] = useState<TierEnum | undefined>(undefined);

    const { openPost, openCommunity, openUser, openNewMessage } = useContext(
        TabNavContext
    );

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        GetCommunityPostsData,
        GetCommunityPostsVariables
    >(GET_COMMUNITY_POSTS, {
        variables: {
            cmid: props.cmid,
            tier,
        },
        notifyOnNetworkStatusChange: true,
    });

    const scrollPropsAndRef = useCollapsibleScene(props.routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(0);

    if (!data?.communityPosts && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    const finalFeed = !!data?.communityPosts
        ? data.communityPosts.filter((post) => !!post)
        : [];

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            ListHeaderComponent={() => {
                return (
                    <ScrollView horizontal style={styles.tierBar}>
                        <View style={styles.tierBarContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === undefined
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(undefined)}
                                key={[props.cmid, "all"].join(":")}
                            >
                                <Text
                                    style={[
                                        styles.tierOptionText,
                                        {
                                            color:
                                                tier === undefined
                                                    ? palette.white
                                                    : palette.hardGray,
                                        },
                                    ]}
                                >
                                    All
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.Angel
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.Angel)}
                                key={[props.cmid, "angel"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.Angel}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.HeartEyes
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.HeartEyes)}
                                key={[props.cmid, "heart"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.HeartEyes}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.Sunglasses
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.Sunglasses)}
                                key={[props.cmid, "sun"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.Sunglasses}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.Hugging
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.Hugging)}
                                key={[props.cmid, "hug"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.Hugging}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.Grinning
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.Grinning)}
                                key={[props.cmid, "grin"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.Grinning}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.Smiling
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.Smiling)}
                                key={[props.cmid, "smile"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.Smiling}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.SlightlySmiling
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() =>
                                    setTier(TierEnum.SlightlySmiling)
                                }
                                key={[props.cmid, "ssmile"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.SlightlySmiling}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.Frowning
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.Frowning)}
                                key={[props.cmid, "frown"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.Frowning}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.Steam
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.Steam)}
                                key={[props.cmid, "steam"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.Steam}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tierOption,
                                    tier === TierEnum.AngryHorns
                                        ? { backgroundColor: palette.deepBlue }
                                        : {},
                                ]}
                                onPress={() => setTier(TierEnum.AngryHorns)}
                                key={[props.cmid, "horns"].join(":")}
                            >
                                <Text style={styles.tierOptionText}>
                                    {TierEmoji.AngryHorns}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                );
            }}
            data={finalFeed}
            renderItem={({ item }) => (
                <Post
                    openUser={openUser}
                    openCommunity={openCommunity}
                    openPost={openPost}
                    onMessage={openNewMessage}
                    post={item}
                />
            )}
            keyExtractor={(item, index) =>
                [item.id, "comPosts", index].join(":")
            }
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        setFetchMoreLen(0);
                        refetch && refetch();
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
            onEndReached={async () => {
                if (finalFeed.length > fetchMoreLen) {
                    const lastTime = finalFeed[finalFeed.length - 1].time;
                    const ffLen = finalFeed.length;

                    setFetchMoreLen(ffLen);

                    !!fetchMore &&
                        (await fetchMore({
                            variables: {
                                lastTime,
                                tier,
                            },
                        }));
                }
            }}
            ListFooterComponent={() => {
                return networkStatus === NetworkStatus.fetchMore ? (
                    <LoadingWheel />
                ) : (
                    <View style={globalScreenStyles.listFooterBuffer} />
                );
            }}
        />
    );
};

export default CommunityPosts;
