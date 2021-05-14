import React, { useContext } from "react";
import { View } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import TabLabel from "../../../../../../global_building_blocks/tab_label/TabLabel";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import ProfileHeader from "../../../../../../global_building_blocks/user_sub_screens/profile_header/ProfileHeader";
import UserPosts from "../../../../../../global_building_blocks/user_sub_screens/user_posts/UserPosts";
import UserConvos from "../../../../../../global_building_blocks/user_sub_screens/user_convos/UserConvos";
import UserChallenges from "../../../../../../global_building_blocks/user_sub_screens/user_challenges/UserChallenges";
import UserStats from "../../../../../../global_building_blocks/user_sub_screens/user_stats/UserStats";
import { localUid } from "../../../../../../global_state/UserState";
import { Auth } from "aws-amplify";

const Tab = createMaterialCollapsibleTopTabNavigator();

const Profile: React.FC = () => {
    const {
        openNew,
        openFollows,
        openPost,
        openCommunity,
        openUser,
        openNewMessage,
        openConvo,
    } = useContext(TabNavContext);
    const uid = localUid();

    const { data, networkStatus, error, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        notifyOnNetworkStatusChange: true,
        variables: {
            uid,
        },
    });

    if (!data?.user && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.user) {
        return (
            <>
                <View style={basicLayouts.flexGrid1}>
                    <Tab.Navigator
                        collapsibleOptions={{
                            renderHeader: () => (
                                <ProfileHeader
                                    openFollows={() =>
                                        openFollows(
                                            `${data.user.firstName} ${data.user.lastName}`,
                                            data.user.id
                                        )
                                    }
                                    user={data.user}
                                    isMe
                                    handleSettings={() => Auth.signOut()}
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
                                    uid={uid}
                                    openPost={openPost}
                                    openUser={openUser}
                                    openCommunity={openCommunity}
                                    openNewMessage={openNewMessage}
                                    refreshHeader={refetch}
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
                                    uid={uid}
                                    openConvo={openConvo}
                                    refreshHeader={refetch}
                                />
                            )}
                        </Tab.Screen>
                        <Tab.Screen
                            name="UserChallenges"
                            options={{
                                tabBarLabel: ({ color }) => (
                                    <TabLabel
                                        title={"Challenges"}
                                        color={color}
                                    />
                                ),
                            }}
                        >
                            {() => (
                                <UserChallenges
                                    user={data.user}
                                    routeKey={"UserChallenges"}
                                    refreshHeader={refetch}
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
                                <UserStats
                                    routeKey="UserStats"
                                    user={data.user}
                                    refreshHeader={refetch}
                                    openFollows={() =>
                                        openFollows(
                                            `${data.user.firstName} ${data.user.lastName}`,
                                            data.user.id
                                        )
                                    }
                                />
                            )}
                        </Tab.Screen>
                    </Tab.Navigator>
                </View>
                <NewButton openNew={openNew} />
            </>
        );
    } else {
        return <View style={basicLayouts.flexGrid1} />;
    }
};

export default Profile;
