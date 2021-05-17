import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./DeleteAccountStyles";
import { Input } from "react-native-elements";
import AuthButton from "../../../../../auth/building_blocks/auth_button/AuthButton";
import { useMutation } from "@apollo/client";
import {
    DELETE_ACCOUNT,
    DeleteAccountData,
    DeleteAccountVariables,
} from "./gql/Mutations";
import { Auth } from "aws-amplify";

const DeleteAccount: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [deleteAccountMutation] = useMutation<
        DeleteAccountData,
        DeleteAccountVariables
    >(DELETE_ACCOUNT);

    const deleteAccount = () => {
        setLoading(true);
        if (text === "Delete") {
            deleteAccountMutation().then();
            Auth.signOut({ global: true });
        }
        setLoading(false);
    };

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
                    onPress={deleteAccount}
                    text={"Submit"}
                    active={text === "Delete"}
                />
            </View>
        </TouchableOpacity>
    );
};

export default DeleteAccount;
