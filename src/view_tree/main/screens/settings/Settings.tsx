import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./SettingsStyles";
import { Auth } from "aws-amplify";
import { SettingsNavProp } from "../../MainEntryNavTypes";
import CancelConfirmModal from "../../../../global_building_blocks/cancel_confirm_modal/CancelConfirmModal";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useApolloClient, useMutation } from "@apollo/client";
import {
    DELETE_PUSH,
    DeletePushData,
    DeletePushVariables,
} from "./gql/Mutations";

interface Props {
    navigation: SettingsNavProp;
}

const Settings: React.FC<Props> = (props) => {
    const [signOutVisible, setSignOutVisible] = useState<boolean>(false);

    const [deletePush] = useMutation<DeletePushData, DeletePushVariables>(
        DELETE_PUSH
    );

    const client = useApolloClient();

    const signOut = async () => {
        if (__DEV__) {
            console.log("Starting sign out");
        }

        setSignOutVisible(false);

        /*
         * First, we're going delete the push token so we
         * don't send any push notifications to unregistered devices
         */
        if (Constants.isDevice) {
            try {
                const {
                    status: existingStatus,
                } = await Notifications.getPermissionsAsync();

                let finalStatus = existingStatus;

                if (existingStatus !== "granted") {
                    const {
                        status,
                    } = await Notifications.requestPermissionsAsync();

                    finalStatus = status;
                }

                if (finalStatus === "granted") {
                    /*
                     * We officially failed to get permission to send push
                     */

                    const token = (await Notifications.getExpoPushTokenAsync())
                        .data;

                    try {
                        await deletePush({
                            variables: {
                                token,
                            },
                        });
                    } catch (e) {
                        if (__DEV__) {
                            console.log("Error deleting push token: ", e);
                        }
                    }
                }
            } catch (e) {
                if (__DEV__) {
                    console.log("Error in push deletion flow: ", e);
                }
            }

            /*
             * Now we actually sign the user out
             */
            try {
                if (__DEV__) {
                    console.log("About to hit sign out");
                }

                await Auth.signOut();

                if (__DEV__) {
                    console.log("Just hit sign out");
                }

                /*
                 * Also totally clear out the cache
                 */
                await client.clearStore();
            } catch (e) {
                if (__DEV__) {
                    console.log("Error signing out: ", e);
                }
            }
        }
    };

    return (
        <>
            <CancelConfirmModal
                visible={signOutVisible}
                body={"Are you sure you want to sign out?"}
                onConfirm={signOut}
                title={"Sign out"}
                onCancel={() => setSignOutVisible(false)}
            />
            <View style={styles.outerContainer}>
                <View style={styles.settingsBubble}>
                    <TouchableOpacity
                        style={styles.settingsFirstRow}
                        onPress={() => props.navigation.navigate("Password")}
                    >
                        <Text style={styles.settingsRowText}>Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.settingsRow}
                        onPress={() =>
                            props.navigation.navigate("TermsAndConditions")
                        }
                    >
                        <Text style={styles.settingsRowText}>
                            Terms & Conditions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.settingsRow}
                        onPress={() =>
                            props.navigation.navigate("PrivacyPolicy")
                        }
                    >
                        <Text style={styles.settingsRowText}>
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSignOutVisible(true)}
                        style={styles.settingsRow}
                    >
                        <Text style={styles.settingsRowText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsBubble}>
                    <TouchableOpacity
                        style={styles.settingsFirstRow}
                        onPress={() =>
                            props.navigation.navigate("DeleteAccount")
                        }
                    >
                        <Text style={styles.deleteAccountText}>
                            Delete account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default Settings;
