import React, { useEffect, useState } from "react";
import { Linking, FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./InvitesStyles";
import * as Contacts from "expo-contacts";
import { InvitesNavProp } from "../../MainEntryNavTypes";

interface Props {
    navigation: InvitesNavProp;
}

const Invites: React.FC<Props> = (props) => {
    const [hasAccess, setHasAccess] = useState<boolean>(false);

    useEffect(() => {
        return props.navigation.addListener("focus", async () => {
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === "granted") {
                setHasAccess(true);

                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.Name,
                        Contacts.Fields.PhoneNumbers,
                        Contacts.Fields.Image,
                        Contacts.Fields.ImageAvailable,
                    ],
                });

                if (data.length > 0) {
                    const contact = data[10];
                    console.log(contact);
                }
            } else {
                setHasAccess(false);
            }
        });
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });

                if (data.length > 0) {
                    const contact = data[0];
                    console.log(contact);
                }
            }
        })();
    }, []);

    const data: any[] = [];

    return (
        <View style={styles.invitesContainer}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={styles.invitesHeader}>
                            <Text style={styles.invitesHeaderText}>
                                Invite your friends to join Digitari and earn
                                100 digicoin for every friend that creates an
                                account!
                            </Text>
                        </View>
                        {!hasAccess && (
                            <View style={styles.promptContainer}>
                                <Text style={styles.promptText}>
                                    We need your permission to access your
                                    contacts so that you can invite your friends
                                </Text>
                                <TouchableOpacity
                                    style={styles.promptButton}
                                    onPress={async () => {
                                        await Linking.openURL("app-settings:");
                                    }}
                                >
                                    <Text style={styles.promptButtonText}>
                                        Open settings
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                }
                data={data}
                renderItem={() => <View />}
            />
        </View>
    );
};

export default Invites;
