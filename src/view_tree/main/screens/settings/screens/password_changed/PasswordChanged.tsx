import React from "react";
import { Text, View } from "react-native";
import { styles } from "./PasswordChangedFiles";

const PasswordChanged: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.successText}>
                Your password has been successfully changed!
            </Text>
        </View>
    );
};

export default PasswordChanged;
