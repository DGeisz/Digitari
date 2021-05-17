import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./DeleteAccountStyles";
import { Input } from "react-native-elements";
import AuthButton from "../../../../../auth/building_blocks/auth_button/AuthButton";

const DeleteAccount: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={Keyboard.dismiss}
            activeOpacity={1}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {"Are you sure you want to delete your account?  " +
                        "You won't be able to undo this action. \n\n" +
                        'To delete your account, type "Delete" and press submit.'}
                </Text>
            </View>
            <Input
                keyboardType="twitter"
                placeholder="Delete..."
                value={text}
                onChangeText={setText}
            />
            <View style={styles.footer}>
                <AuthButton
                    loading={loading}
                    onPress={() => {
                        setLoading(true);
                    }}
                    text={"Submit"}
                    active={text === "Delete"}
                />
            </View>
        </TouchableOpacity>
    );
};

export default DeleteAccount;
