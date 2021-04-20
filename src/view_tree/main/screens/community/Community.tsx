import React from "react";
import { View } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import CommunityHeader from "./sub_screens/community_header/CommunityHeader";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import {
    COMMUNITY_TYPENAME,
    FOLLOW_COMMUNITY_PRICE,
} from "../../../../global_types/CommunityTypes";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import {
    GET_COMMUNITY,
    GetCommunityQueryData,
    GetCommunityQueryVariables,
} from "./gql/Queries";
import { CommunityRouteProp } from "../../MainEntryNavTypes";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import {
    FOLLOW_COMMUNITY,
    FollowCommunityData,
    FollowCommunityVariables,
    UN_FOLLOW_COMMUNITY,
    UnFollowCommunityData,
    UnFollowCommunityVariables,
} from "./gql/Mutations";
import { localUid } from "../../../../global_state/UserState";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";

interface Props {
    route: CommunityRouteProp;
}

const Tab = createMaterialCollapsibleTopTabNavigator();

const Community: React.FC<Props> = (props) => {
    const uid = localUid();

    const { data, error, networkStatus, refetch } = useQuery<
        GetCommunityQueryData,
        GetCommunityQueryVariables
    >(GET_COMMUNITY, {
        variables: {
            cmid: props.route.params.cmid,
        },
        notifyOnNetworkStatusChange: true,
    });

    const [followCommunity] = useMutation<
        FollowCommunityData,
        FollowCommunityVariables
    >(FOLLOW_COMMUNITY, {
        variables: {
            tid: props.route.params.cmid,
        },
        optimisticResponse: {
            followCommunity: {
                tid: props.route.params.cmid,
                sid: uid,
                name: "",
                time: "",
                entityType: 0,
            },
        },
        update(cache, { data: followData }) {
            if (data?.community && followData?.followCommunity) {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        following(existing) {
                            return existing + 1;
                        },
                        coin(existing) {
                            return existing - FOLLOW_COMMUNITY_PRICE;
                        },
                    },
                });

                cache.modify({
                    id: cache.identify({
                        __typename: COMMUNITY_TYPENAME,
                        id: props.route.params.cmid,
                    }),
                    fields: {
                        amFollowing() {
                            return true;
                        },
                        followers(existing) {
                            return existing + 1;
                        },
                    },
                });
            }
        },
    });

    const [unFollowCommunity] = useMutation<
        UnFollowCommunityData,
        UnFollowCommunityVariables
    >(
        UN_FOLLOW_COMMUNITY,

        {
            variables: {
                tid: props.route.params.cmid,
            },
            optimisticResponse: {
                unFollowCommunity: {
                    tid: props.route.params.cmid,
                    sid: uid,
                    name: "",
                    time: "",
                    entityType: 0,
                },
            },
            update(cache, { data: unFollowData }) {
                if (data?.community && unFollowData?.unFollowCommunity) {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            following(existing) {
                                return existing - 1;
                            },
                        },
                    });

                    cache.modify({
                        id: cache.identify({
                            __typename: COMMUNITY_TYPENAME,
                            id: props.route.params.cmid,
                        }),
                        fields: {
                            amFollowing() {
                                return false;
                            },
                            followers(existing) {
                                return existing - 1;
                            },
                        },
                    });
                }
            },
        }
    );

    if (!data?.community && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (data?.community) {
        return (
            <View style={basicLayouts.flexGrid1}>
                <Tab.Navigator
                    collapsibleOptions={{
                        renderHeader: () => (
                            <CommunityHeader
                                community={data.community}
                                handleFollow={followCommunity}
                                handleUnFollow={unFollowCommunity}
                            />
                        ),
                        headerHeight: 250,
                    }}
                >
                    <Tab.Screen
                        name="CommunityPosts"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Posts"} color={color} />
                            ),
                        }}
                    >
                        {() => <View />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="CommunityConvos"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Convos"} color={color} />
                            ),
                        }}
                    >
                        {() => <View />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="CommunityFollowers"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Followers"} color={color} />
                            ),
                        }}
                    >
                        {() => <View />}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
        );
    } else {
        return <LoadingWheel />;
    }
};

export default Community;
