import * as React from "react";
import { View } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import ProfileHeader from "../../../../global_building_blocks/user_sub_screens/profile_header/ProfileHeader";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import UserPosts from "../../../../global_building_blocks/user_sub_screens/user_posts/UserPosts";
import UserConvos from "../../../../global_building_blocks/user_sub_screens/user_convos/UserConvos";
import UserChallenges from "../../../../global_building_blocks/user_sub_screens/user_challenges/UserChallenges";
import UserStats from "../../../../global_building_blocks/user_sub_screens/user_stats/UserStats";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { UserRouteProp } from "../../MainEntryNavTypes";

const Tab = createMaterialCollapsibleTopTabNavigator();

interface Props {
    route: UserRouteProp;
}

const User: React.FC<Props> = (props) => {
    const { data, networkStatus, error, refetch } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        notifyOnNetworkStatusChange: true,
        variables: {
            uid: props.route.params.uid,
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
                                <ProfileHeader user={data.user} />
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
                                />
                            )}
                        </Tab.Screen>
                    </Tab.Navigator>
                </View>
            </>
        );
    } else {
        return <View style={basicLayouts.flexGrid1} />;
    }
};

export default User;
