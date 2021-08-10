import React from "react";
import { Text, View } from "react-native";
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
import Followers from "./sub_screens/followers/Followers";
import CommunityPosts from "./sub_screens/community_posts/CommunityPosts";
import NewButton from "../../../../global_building_blocks/new_button/NewButton";
import CommunityConvos from "./sub_screens/community_convos/CommunityConvos";
import { styles } from "./sub_screens/CommunityStyles";
import { CommunityContext } from "./CommunityContext";

interface Props {
    route: CommunityRouteProp;
    navigation: CommunityNavProp;
}

const Tab = createMaterialCollapsibleTopTabNavigator();

const Community: React.FC<Props> = (props) => {
    const { cmid } = props.route.params;

    const { data, error, networkStatus, refetch } = useQuery<
        GetCommunityQueryData,
        GetCommunityQueryVariables
    >(GET_COMMUNITY, {
        variables: {
            cmid,
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
                <CommunityContext.Provider
                    value={{
                        navigation: props.navigation,
                        cmid: data.community.id,
                        refreshHeader: refetch,
                        tid: props.route.params.cmid,
                        onSelectUser: (uid) => {
                            props.navigation.push("User", { uid });
                        },
                    }}
                >
                    <Tab.Navigator
                        collapsibleOptions={{
                            renderHeader: () => (
                                <CommunityHeader
                                    community={data.community}
                                    openReportCommunity={() => {
                                        props.navigation.navigate(
                                            "ReportCommunity",
                                            { cmid }
                                        );
                                    }}
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
                            component={CommunityPosts}
                        />
                        <Tab.Screen
                            name="CommunityConvos"
                            options={{
                                tabBarLabel: ({ color }) => (
                                    <TabLabel title={"Convos"} color={color} />
                                ),
                            }}
                            component={CommunityConvos}
                        />
                        <Tab.Screen
                            name="CommunityFollowers"
                            options={{
                                tabBarLabel: ({ color }) => (
                                    <TabLabel
                                        title={"Followers"}
                                        color={color}
                                    />
                                ),
                            }}
                            component={Followers}
                        />
                    </Tab.Navigator>
                </CommunityContext.Provider>
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
        return (
            <View style={styles.noCommunityContainer}>
                <Text style={styles.noCommunityText}>
                    This community no longer exists
                </Text>
            </View>
        );
    }
};

export default Community;
