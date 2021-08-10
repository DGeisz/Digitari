import React, { useContext, useState } from "react";
import {
    Animated,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CommunityNavProp } from "../../../../MainEntryNavTypes";
import { TierEmoji, TierEnum } from "../../../../../../global_types/TierTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    COMMUNITY_CONVOS,
    CommunityConvosData,
    CommunityConvosVariables,
    MAX_COMMUNITY_CONVOS_PER_PAGE,
} from "./gql/Queries";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { tierBarStyles } from "../styles/tierBarStyles";
import { palette } from "../../../../../../global_styles/Palette";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { globalScreenStyles } from "../../../../../../global_styles/GlobalScreenStyles";
import ConvoCover from "../../../../../../global_building_blocks/convo_cover/ConvoCover";
import { styles } from "./CommunityConvosStyles";
import { CommunityContext } from "../../CommunityContext";

const CommunityConvos: React.FC = () => {
    const [tier, setTier] = useState<TierEnum | undefined>(undefined);

    const context = useContext(CommunityContext);

    const { data, error, networkStatus, refetch, fetchMore } = useQuery<
        CommunityConvosData,
        CommunityConvosVariables
    >(COMMUNITY_CONVOS, {
        variables: {
            cmid: context.cmid,
            tier,
        },
        notifyOnNetworkStatusChange: true,
    });

    const scrollPropsAndRef = useCollapsibleScene("CommunityConvos");
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    const [fetchMoreLen, setFetchMoreLen] = useState<number>(
        MAX_COMMUNITY_CONVOS_PER_PAGE - 5
    );

    const finalFeed = !!data?.communityConvos
        ? data.communityConvos.filter((convo) => !!convo)
        : [];

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            ListHeaderComponent={() => {
                return (
                    <>
                        <ScrollView horizontal style={tierBarStyles.tierBar}>
                            <View style={tierBarStyles.tierBarContainer}>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === undefined
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(undefined)}
                                    key={[context.cmid, "all"].join(":")}
                                >
                                    <Text
                                        style={[
                                            tierBarStyles.tierOptionText,
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
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Angel
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Angel)}
                                    key={[context.cmid, "angel"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Angel}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.HeartEyes
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.HeartEyes)}
                                    key={[context.cmid, "heart"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.HeartEyes}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Sunglasses
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Sunglasses)}
                                    key={[context.cmid, "sun"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Sunglasses}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Hugging
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Hugging)}
                                    key={[context.cmid, "hug"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Hugging}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Grinning
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Grinning)}
                                    key={[context.cmid, "grin"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Grinning}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Smiling
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Smiling)}
                                    key={[context.cmid, "smile"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Smiling}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.SlightlySmiling
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() =>
                                        setTier(TierEnum.SlightlySmiling)
                                    }
                                    key={[context.cmid, "ssmile"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.SlightlySmiling}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Frowning
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Frowning)}
                                    key={[context.cmid, "frown"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Frowning}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.Steam
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.Steam)}
                                    key={[context.cmid, "steam"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.Steam}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        tierBarStyles.tierOption,
                                        tier === TierEnum.AngryHorns
                                            ? {
                                                  backgroundColor:
                                                      palette.deepBlue,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setTier(TierEnum.AngryHorns)}
                                    key={[context.cmid, "horns"].join(":")}
                                >
                                    <Text style={tierBarStyles.tierOptionText}>
                                        {TierEmoji.AngryHorns}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        {!data?.communityConvos ||
                        networkStatus === NetworkStatus.loading ? (
                            <LoadingWheel />
                        ) : error ? (
                            <ErrorMessage refresh={refetch} />
                        ) : finalFeed.length === 0 ? (
                            <View style={styles.noConvosContainer}>
                                <Text style={styles.noConvosText}>
                                    No one at this tier has had a convo about a
                                    post to this community
                                </Text>
                            </View>
                        ) : null}
                    </>
                );
            }}
            data={finalFeed}
            renderItem={({ item, index }) => (
                <ConvoCover
                    displayActive={true}
                    convo={item}
                    showUnViewedDot={false}
                    showBottomBorder={index !== finalFeed.length - 1}
                    openConvo={(cvid, pid) =>
                        context.navigation.navigate("Convo", { cvid, pid })
                    }
                />
            )}
            keyExtractor={(item, index) => [item.id, "comCon", index].join(":")}
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        setFetchMoreLen(0);
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
            onEndReached={async () => {
                if (finalFeed.length > fetchMoreLen) {
                    const lastTime = finalFeed[finalFeed.length - 1].lastTime;
                    const ffLen = finalFeed.length;

                    setFetchMoreLen(ffLen);

                    !!fetchMore &&
                        (await fetchMore({
                            variables: {
                                cmid: context.cmid,
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

export default CommunityConvos;
