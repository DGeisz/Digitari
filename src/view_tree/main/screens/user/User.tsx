import React, { useContext } from "react";
import { View } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import ProfileHeader from "../../../../global_building_blocks/user_sub_screens/profile_header/ProfileHeader";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import UserPosts from "../../../../global_building_blocks/user_sub_screens/user_posts/UserPosts";
import UserConvos from "../../../../global_building_blocks/user_sub_screens/user_convos/UserConvos";
import UserChallenges from "../../../../global_building_blocks/user_sub_screens/user_challenges/UserChallenges";
import UserStats from "../../../../global_building_blocks/user_sub_screens/user_stats/UserStats";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { UserNavProp, UserRouteProp } from "../../MainEntryNavTypes";
import { localUid } from "../../../../global_state/UserState";
import {
    FOLLOW_USER,
    FollowUserData,
    FollowUserVariables,
    UN_FOLLOW_USER,
    UnFollowUserData,
    UnFollowUserVariables,
} from "./gql/Mutation";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";
import { Auth } from "aws-amplify";
import NewButton from "../../../../global_building_blocks/new_button/NewButton";

const Tab = createMaterialCollapsibleTopTabNavigator();

interface Props {
    navigation: UserNavProp;
    route: UserRouteProp;
}

const User: React.FC<Props> = (props) => {
    const uid = localUid();

    const { data, loading, error, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        variables: {
            uid: props.route.params.uid,
        },
    });

    const [follow] = useMutation<FollowUserData, FollowUserVariables>(
        FOLLOW_USER,
        {
            variables: {
                tid: props.route.params.uid,
            },
            optimisticResponse: {
                followUser: {
                    tid: props.route.params.uid,
                    sid: uid,
                    name: "",
                    time: "",
                    entityType: 0,
                },
            },
            update(cache, { data: followData }) {
                if (data?.user && followData?.followUser) {
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
                                return Math.max(
                                    existing - data.user.followPrice,
                                    0
                                );
                            },
                        },
                    });

                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: props.route.params.uid,
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
        }
    );

    const [unFollow] = useMutation<UnFollowUserData, UnFollowUserVariables>(
        UN_FOLLOW_USER,
        {
            variables: {
                tid: props.route.params.uid,
            },
            optimisticResponse: {
                unFollowUser: {
                    tid: props.route.params.uid,
                    sid: uid,
                    name: "",
                    time: "",
                    entityType: 0,
                },
            },
            update(cache, { data: unFollowData }) {
                if (data?.user && unFollowData?.unFollowUser) {
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
                            __typename: USER_TYPENAME,
                            id: props.route.params.uid,
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

    if (!data?.user && loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.user) {
        return (
            <View style={basicLayouts.flexGrid1}>
                <Tab.Navigator
                    collapsibleOptions={{
                        renderHeader: () => (
                            <ProfileHeader
                                openFollows={() => {
                                    props.navigation.push("Follows", {
                                        name: `${data.user.firstName} ${data.user.lastName}`,
                                        uid: data?.user.id,
                                    });
                                }}
                                user={data.user}
                                isMe={data?.user.id === uid}
                                handleFollow={follow}
                                handleUnFollow={unFollow}
                                handleSettings={Auth.signOut}
                            />
                        ),
                        headerHeight: 250,
                    }}
                    tabBarOptions={{
                        scrollEnabled: true,
                        tabStyle: {
                            flex: 0,
                            width: 100,
                            padding: 0,
                        },
                    }}
                >
                    <Tab.Screen
                        name="UserPosts"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Posts"} color={color} />
                            ),
                        }}
                    >
                        {() => (
                            <UserPosts
                                routeKey={"UserPosts"}
                                uid={data?.user.id}
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="UserConvos"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Convos"} color={color} />
                            ),
                        }}
                    >
                        {() => (
                            <UserConvos
                                routeKey={"UserConvos"}
                                uid={data?.user.id}
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="UserChallenges"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Challenges"} color={color} />
                            ),
                        }}
                    >
                        {() => (
                            <UserChallenges
                                user={data.user}
                                routeKey={"UserChallenges"}
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="UserStats"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Stats"} color={color} />
                            ),
                        }}
                    >
                        {() => (
                            <UserStats routeKey="UserStats" user={data.user} />
                        )}
                    </Tab.Screen>
                </Tab.Navigator>
                <NewButton
                    openNew={() => props.navigation.navigate("NewPost", {})}
                />
            </View>
        );
    } else {
        return <View style={basicLayouts.flexGrid1} />;
    }
};

export default User;
