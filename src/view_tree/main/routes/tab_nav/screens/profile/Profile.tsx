import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
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
import { styles } from "./ProfileStyles";
import { SCREEN_LARGER_THAN_CONTENT } from "../../../../../../global_constants/screen_constants";
import { UserType } from "../../../../../../global_types/UserTypes";
import {
    firstProfile,
    firstTimeOpeningApp,
    openedAppFirstTime,
} from "../../../../../../global_state/FirstImpressionsState";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import { UserContext } from "../../../../../../global_building_blocks/user_sub_screens/user_context/UserContext";

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
        openReport,
        openReportUser,
        openSettings,
        openShop,
        openLevelUp,
    } = useContext(TabNavContext);

    const [instructionsModalVisible, showInstructionsModal] = useState<boolean>(
        firstProfile()
    );

    /*
     * If this is the first time opening
     * the app, mark this has been done
     */
    useEffect(() => {
        if (firstTimeOpeningApp()) {
            openedAppFirstTime();
        }
        // else {
        //     removeAppFirstTime();
        // }
    }, []);

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

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const user: UserType | undefined = data?.user;

    if (!!user) {
        return (
            <>
                <InstructionsModal
                    visible={instructionsModalVisible}
                    hideModal={() => {
                        showInstructionsModal(false);
                    }}
                />
                <View style={basicLayouts.flexGrid1}>
                    <UserContext.Provider
                        value={{
                            uid,
                            openPost,
                            openNewMessage,
                            openCommunity,
                            openUser,
                            refreshHeader: refetch,
                            openReport,
                            openConvo,
                            openFollows: () =>
                                openFollows(
                                    `${user.firstName} ${user.lastName}`,
                                    user.id
                                ),
                            user,
                            isProfile: true,
                        }}
                    >
                        <Tab.Navigator
                            collapsibleOptions={{
                                renderHeader: () => (
                                    <ProfileHeader
                                        openFollows={() =>
                                            openFollows(
                                                `${user.firstName} ${user.lastName}`,
                                                user.id
                                            )
                                        }
                                        openShop={openShop}
                                        user={user}
                                        isMe
                                        openSettings={openSettings}
                                        openReportUser={() => {
                                            openReportUser(user.id);
                                        }}
                                        openLevelUp={openLevelUp}
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
                                        <TabLabel
                                            title={"Posts"}
                                            color={color}
                                        />
                                    ),
                                }}
                                component={UserPosts}
                            />
                            <Tab.Screen
                                name="UserConvos"
                                options={{
                                    tabBarLabel: ({ color }) => (
                                        <TabLabel
                                            title={"Convos"}
                                            color={color}
                                        />
                                    ),
                                }}
                                component={UserConvos}
                            />
                            <Tab.Screen
                                name="UserStats"
                                options={{
                                    tabBarLabel: ({ color }) => (
                                        <TabLabel
                                            title={"Stats"}
                                            color={color}
                                        />
                                    ),
                                }}
                                component={UserStats}
                            />
                        </Tab.Navigator>
                    </UserContext.Provider>
                </View>
                <NewButton openNew={openNew} />
            </>
        );
    } else {
        return (
            <View style={styles.noUserContainer}>
                <Text style={styles.noUserText}>
                    Hmm... It appears your profile isn't set up yet.
                </Text>
            </View>
        );
    }
};

export default Profile;
