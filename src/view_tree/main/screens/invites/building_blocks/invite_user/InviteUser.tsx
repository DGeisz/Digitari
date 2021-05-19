import React from "react";
import { View } from "react-native";
import { Contact } from "expo-contacts";

interface Props {
    contact: Contact;
}

export default class InviteUser extends React.PureComponent<Props> {
    render() {
        return <View />;
    }
}
