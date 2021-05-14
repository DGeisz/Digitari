import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import ProfileHeader from "../../../../global_building_blocks/user_sub_screens/profile_header/ProfileHeader";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import UserPosts from "../../../../global_building_blocks/user_sub_screens/user_posts/UserPosts";
import UserConvos from "../../../../global_building_blocks/user_sub_screens/user_convos/UserConvos";
import UserChallenges from "../../../../global_building_blocks/user_sub_screens/user_challenges/UserChallenges";
import UserStats from "../../../../global_building_blocks/user_sub_screens/user_stats/UserStats";
import { useQuery } from "@apollo/client";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../routes/tab_nav/screens/profile/gql/Queries";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { UserNavProp, UserRouteProp } from "../../MainEntryNavTypes";
import { localUid } from "../../../../global_state/UserState";
import { Auth } from "aws-amplify";
import NewButton from "../../../../global_building_blocks/new_button/NewButton";
import { styles } from "./UserStyles";

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

    useEffect(() => {
        if (!!data?.user) {
            props.navigation.setOptions({
                title: `${data.user.firstName} ${data.user.lastName}`,
            });
        }
    }, [!!data?.user ? data.user.firstName + data.user.lastName : ""]);

    console.log(error);

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
                                openPost={(pid: string) =>
                                    props.navigation.navigate("PostScreen", {
                                        pid,
                                    })
                                }
                                openCommunity={(cmid: string) =>
                                    props.navigation.navigate("Community", {
                                        cmid,
                                    })
                                }
                                openNewMessage={(
                                    tname: string,
                                    pid: string,
                                    responseCost: number
                                ) =>
                                    props.navigation.navigate("NewResponse", {
                                        tname,
                                        pid,
                                        responseCost,
                                    })
                                }
                                openUser={(uid: string) => {
                                    props.navigation.navigate("User", { uid });
                                }}
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
                                uid={data?.user.id}
                                openConvo={(cvid: string, pid: string) => {
                                    props.navigation.navigate("Convo", {
                                        cvid,
                                        pid,
                                    });
                                }}
                                refreshHeader={refetch}
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
                                openFollows={() => {
                                    props.navigation.push("Follows", {
                                        name: `${data.user.firstName} ${data.user.lastName}`,
                                        uid: data?.user.id,
                                    });
                                }}
                            />
                        )}
                    </Tab.Screen>
                </Tab.Navigator>
                <NewButton
                    openNew={() => props.navigation.navigate("NewPost", {})}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.noUserContainer}>
                <Text style={styles.noUserText}>
                    This user no longer exists
                </Text>
            </View>
        );
    }
};

export default User;
