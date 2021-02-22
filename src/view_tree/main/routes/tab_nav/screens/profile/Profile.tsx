import * as React from "react";
import { View, Dimensions } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import ProfileHeader from "./sub_screens/profile_header/ProfileHeader";
import UserPosts from "./sub_screens/user_posts/UserPosts";
import TabLabel from "../../../../../../global_building_blocks/tab_label/TabLabel";
import UserConvos from "./sub_screens/user_convos/UserConvos";
import { UserType } from "../../../../../../global_types/UserTypes";
import UserStats from "./sub_screens/user_stats/UserStats";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import UserChallenges from "./sub_screens/user_challenges/UserChallenges";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_USER } from "./gql/Queries";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";

interface Props {}

const Tab = createMaterialCollapsibleTopTabNavigator();

interface QueryData {
    user: UserType;
}

const Profile: React.FC<Props> = () => {
    const { openNew } = React.useContext(TabNavContext);

    const { data, networkStatus, error, refetch } = useQuery<QueryData>(
        GET_USER,
        {
            notifyOnNetworkStatusChange: true,
        }
    );

    if (!data?.user && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
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
                            {() => <UserPosts routeKey={"UserPosts"} />}
                        </Tab.Screen>
                        <Tab.Screen
                            name="UserConvos"
                            options={{
                                tabBarLabel: ({ color }) => (
                                    <TabLabel title={"Convos"} color={color} />
                                ),
                            }}
                        >
                            {() => <UserConvos routeKey={"UserConvos"} />}
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
                <NewButton openNew={openNew} />
            </>
        );
    } else {
        return <View style={basicLayouts.flexGrid1} />;
    }
};

export default Profile;
