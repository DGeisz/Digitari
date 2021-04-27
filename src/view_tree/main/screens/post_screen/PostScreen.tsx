import React, { useState } from "react";
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    PostScreenNavProp,
    PostScreenRouteProp,
} from "../../MainEntryNavTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    POST,
    POST_CONVOS,
    POST_CONVOS_PER_PAGE,
    PostConvosData,
    PostConvosVariables,
    PostData,
    PostVariables,
} from "./gql/Queries";
import { ConvoOrder } from "../../../../global_types/ConvoTypes";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import ConvoCover from "../../../../global_building_blocks/convo_cover/ConvoCover";
import { styles } from "./PostScreenStyles";
import Post from "../../../../global_building_blocks/post/Post";
import { palette } from "../../../../global_styles/Palette";
import { globalScreenStyles } from "../../../../global_styles/GlobalScreenStyles";
import { NEW_CONVOS_PER_PAGE } from "../../routes/tab_nav/screens/convos/sub_screens/new_convos/gql/Queries";

interface Props {
    route: PostScreenRouteProp;
    navigation: PostScreenNavProp;
}

const PostScreen: React.FC<Props> = (props) => {
    const { pid } = props.route.params;

    const [ordering, setOrdering] = useState<ConvoOrder>(ConvoOrder.ranking);

    const {
        data: postData,
        loading: postLoading,
        error: postError,
        refetch: postRefetch,
    } = useQuery<PostData, PostVariables>(POST, {
        variables: {
            pid,
        },
    });

    const {
        data: convosData,
        networkStatus,
        error: convosError,
        refetch: convosRefetch,
        fetchMore,
    } = useQuery<PostConvosData, PostConvosVariables>(POST_CONVOS, {
        variables: {
            pid,
            orderingType: ordering,
        },
        notifyOnNetworkStatusChange: true,
    });

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(
        POST_CONVOS_PER_PAGE - 5
    );
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (postLoading || !postData?.post) {
        return <LoadingWheel />;
    }

    if (postLoading || !postData?.post) {
        return <LoadingWheel />;
    }

    if (postError) {
        return <ErrorMessage refresh={postRefetch} />;
    }

    if (convosError) {
        return <ErrorMessage refresh={convosRefetch} />;
    }

    const finalFeed = !!convosData?.postConvos ? convosData.postConvos : [];
    const post = postData.post;

    return (
        <FlatList
            style={styles.listContainer}
            ListHeaderComponent={() => (
                <>
                    <View style={styles.headerContainer}>
                        <Post
                            postIsLink={false}
                            abbreviateAddOn={false}
                            post={post}
                            openUser={(uid: string) =>
                                props.navigation.navigate("User", { uid })
                            }
                            openCommunity={(cmid: string) =>
                                props.navigation.navigate("Community", { cmid })
                            }
                            noBottomMargin
                        />
                        <View style={styles.postConvosBuffer} />
                        <View style={styles.convosContainer}>
                            <Text style={styles.convosTitleText}>Convos</Text>
                            <View style={styles.orderOptionContainer}>
                                <Text style={styles.orderByTitle}>
                                    Order by
                                </Text>
                                <View style={styles.orderOptionBar}>
                                    <TouchableOpacity
                                        style={[
                                            styles.orderOption,
                                            ordering === ConvoOrder.ranking
                                                ? {
                                                      backgroundColor:
                                                          palette.deepBlue,
                                                  }
                                                : {},
                                        ]}
                                        onPress={() =>
                                            setOrdering(ConvoOrder.ranking)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.orderOptionText,
                                                ordering === ConvoOrder.ranking
                                                    ? { color: palette.white }
                                                    : {},
                                            ]}
                                        >
                                            Tier
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.orderOption,
                                            ordering === ConvoOrder.time
                                                ? {
                                                      backgroundColor:
                                                          palette.deepBlue,
                                                  }
                                                : {},
                                        ]}
                                        onPress={() =>
                                            setOrdering(ConvoOrder.time)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.orderOptionText,
                                                ordering === ConvoOrder.time
                                                    ? { color: palette.white }
                                                    : {},
                                            ]}
                                        >
                                            Time
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    {networkStatus === NetworkStatus.loading ||
                    networkStatus === NetworkStatus.refetch ||
                    networkStatus === NetworkStatus.setVariables ||
                    !convosData?.postConvos ? (
                        <LoadingWheel />
                    ) : finalFeed.length === 0 ? (
                        <View style={styles.noConvos}>
                            <Text style={styles.noConvosText}>
                                This post doesn't have any convos
                            </Text>
                        </View>
                    ) : null}
                </>
            )}
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        convosRefetch && convosRefetch();
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
            data={finalFeed}
            renderItem={({ item }) => (
                <ConvoCover
                    displayActive
                    showUnViewedDot={false}
                    convo={item}
                    openConvo={(cvid) =>
                        props.navigation.navigate("Convo", { cvid, pid })
                    }
                />
            )}
            onEndReached={async () => {
                if (finalFeed.length > fetchMoreLen) {
                    const ffLen = finalFeed.length;

                    setFetchMoreLen(ffLen);

                    !!fetchMore &&
                        (await fetchMore({
                            variables: {
                                orderingType: ordering,
                                offset: ffLen,
                            },
                        }));
                }
            }}
            keyExtractor={(_, index) => [pid, index].join(":")}
            ListFooterComponent={() => {
                return <View style={styles.listFooterBuffer} />;
            }}
        />
    );
};

export default PostScreen;
