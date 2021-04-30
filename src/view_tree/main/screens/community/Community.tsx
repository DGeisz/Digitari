import React from "react";
import { View } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import CommunityHeader from "./sub_screens/community_header/CommunityHeader";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    GET_COMMUNITY,
    GetCommunityQueryData,
    GetCommunityQueryVariables,
} from "./gql/Queries";
import { CommunityNavProp, CommunityRouteProp } from "../../MainEntryNavTypes";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { localUid } from "../../../../global_state/UserState";
import Followers from "./sub_screens/followers/Followers";
import CommunityPosts from "./sub_screens/community_posts/CommunityPosts";
import NewButton from "../../../../global_building_blocks/new_button/NewButton";
import CommunityConvos from "./sub_screens/community_convos/CommunityConvos";

interface Props {
    route: CommunityRouteProp;
    navigation: CommunityNavProp;
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
                            <CommunityHeader community={data.community} />
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
                        {() => (
                            <CommunityPosts
                                navigation={props.navigation}
                                routeKey={"CommunityPosts"}
                                cmid={data?.community.id}
                                refreshHeader={refetch}
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="CommunityConvos"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Convos"} color={color} />
                            ),
                        }}
                    >
                        {() => (
                            <CommunityConvos
                                routeKey={"CommunityConvos"}
                                cmid={data?.community.id}
                                navigation={props.navigation}
                                refreshHeader={refetch}
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="CommunityFollowers"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Followers"} color={color} />
                            ),
                        }}
                    >
                        {() => (
                            <Followers
                                routeKey="CommunityFollowers"
                                tid={props.route.params.cmid}
                                onSelectUser={(uid) => {
                                    props.navigation.push("User", { uid });
                                }}
                                refreshHeader={refetch}
                            />
                        )}
                    </Tab.Screen>
                </Tab.Navigator>
                <NewButton
                    openNew={() =>
                        props.navigation.navigate("NewPost", {
                            cmid: props.route.params.cmid,
                        })
                    }
                />
            </View>
        );
    } else {
        return <LoadingWheel />;
    }
};

export default Community;
