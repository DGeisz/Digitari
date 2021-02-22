import * as React from "react";
import { View } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import CommunityHeader from "./sub_screens/community_header/CommunityHeader";
import TabLabel from "../../../../global_building_blocks/tab_label/TabLabel";
import { exampleCommunity } from "../../../../global_types/CommunityTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
    GET_COMMUNITY,
    GetCommunityQueryData,
    GetCommunityQueryVariables,
} from "./gql/Queries";
import { CommunityRouteProp } from "../../MainEntryNavTypes";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";

interface Props {
    route: CommunityRouteProp;
}

const Tab = createMaterialCollapsibleTopTabNavigator();

const Community: React.FC<Props> = (props) => {
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
                </Tab.Navigator>
            </View>
        );
    } else {
        return <LoadingWheel />;
    }
};

export default Community;
