import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./SettingsStyles";
import { Auth } from "aws-amplify";

const Settings: React.FC = () => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.settingsBubble}>
                <View style={styles.settingsFirstRow}>
                    <TouchableOpacity>
                        <Text style={styles.settingsRowText}>Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsRow}>
                    <TouchableOpacity>
                        <Text style={styles.settingsRowText}>
                            Terms & Conditions
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsRow}>
                    <TouchableOpacity>
                        <Text style={styles.settingsRowText}>
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsRow}>
                    <TouchableOpacity>
                        <Text style={styles.settingsRowText}>
                            Content Policy
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsRow}>
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                await Auth.signOut();
                            } catch (e) {
                                console.log("Error with sign out: ", e);
                            }
                        }}
                    >
                        <Text style={styles.settingsRowText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.settingsBubble}>
                <View style={styles.settingsFirstRow}>
                    <TouchableOpacity>
                        <Text style={styles.deleteAccountText}>
                            Delete account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Settings;
