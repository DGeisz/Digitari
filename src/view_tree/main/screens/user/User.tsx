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
import NewButton from "../../../../global_building_blocks/new_button/NewButton";
import { styles } from "./UserStyles";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../../global_constants/screen_constants";
import { UserContext } from "../../../../global_building_blocks/user_sub_screens/user_context/UserContext";

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

    if (!data?.user && loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.user) {
        return (
            <View style={basicLayouts.flexGrid1}>
                <UserContext.Provider
                    value={{
                        uid: data.user.id,
                        user: data.user,
                        openPost: (pid: string) =>
                            props.navigation.navigate("PostScreen", {
                                pid,
                            }),
                        openCommunity: (cmid: string) =>
                            props.navigation.navigate("Community", {
                                cmid,
                            }),
                        openNewMessage: (
                            tname: string,
                            pid: string,
                            responseCost: number
                        ) =>
                            props.navigation.navigate("NewResponse", {
                                tname,
                                pid,
                                responseCost,
                            }),
                        openUser: (uid: string) => {
                            props.navigation.navigate("User", {
                                uid,
                            });
                        },
                        openReport: (pid: string) => {
                            props.navigation.navigate("ReportPost", {
                                pid,
                            });
                        },
                        refreshHeader: refetch,
                        openConvo: (cvid: string, pid: string) => {
                            props.navigation.navigate("Convo", {
                                cvid,
                                pid,
                            });
                        },
                        openFollows: () => {
                            props.navigation.push("Follows", {
                                name: `${data.user.firstName} ${data.user.lastName}`,
                                uid: data?.user.id,
                            });
                        },
                        isProfile: false,
                    }}
                >
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
                                    openShop={() =>
                                        props.navigation.push("Shop")
                                    }
                                    openLevelUp={() =>
                                        props.navigation.push("LevelUp")
                                    }
                                    user={data.user}
                                    isMe={data?.user.id === uid}
                                    openSettings={() =>
                                        props.navigation.navigate("Settings")
                                    }
                                    openReportUser={() =>
                                        props.navigation.push("ReportUser", {
                                            uid: data?.user.id,
                                        })
                                    }
                                />
                            ),
                            headerHeight: 250,
                            disableSnap: true,
                        }}
                    >
                        <Tab.Screen
                            name="UserPosts"
                            options={{
                                tabBarLabel: ({ color }) => (
                                    <TabLabel title={"Posts"} color={color} />
                                ),
                            }}
                            component={UserPosts}
                        />
                        <Tab.Screen
                            name="UserConvos"
                            options={{
                                tabBarLabel: ({ color }) => (
                                    <TabLabel title={"Convos"} color={color} />
                                ),
                            }}
                            component={UserConvos}
                        />
                        <Tab.Screen
                            name="UserStats"
                            options={{
                                tabBarLabel: ({ color }) => (
                                    <TabLabel title={"Stats"} color={color} />
                                ),
                            }}
                            component={UserStats}
                        />
                    </Tab.Navigator>
                </UserContext.Provider>
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
