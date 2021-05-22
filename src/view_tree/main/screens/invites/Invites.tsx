import React, { useEffect, useState } from "react";
import {
    Linking,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    Keyboard,
} from "react-native";
import { styles } from "./InvitesStyles";
import * as Contacts from "expo-contacts";
import { InvitesNavProp } from "../../MainEntryNavTypes";
import { Contact } from "expo-contacts";
import InviteUser from "./building_blocks/invite_user/InviteUser";
import { SearchBar } from "react-native-elements";
import { useQuery } from "@apollo/client";
import {
    GET_REMAINING_INVITES,
    GetRemainingInvitesData,
    GetRemainingInvitesVariables,
} from "./gql/Queries";
import { localUid } from "../../../../global_state/UserState";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";

const pageSize = 30;

interface Props {
    navigation: InvitesNavProp;
}

const Invites: React.FC<Props> = (props) => {
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState<string>("");

    const [offset, setOffset] = useState<number>(0);

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === "granted") {
            setHasAccess(true);

            const { data } = await Contacts.getContactsAsync({
                fields: [
                    Contacts.Fields.Name,
                    Contacts.Fields.FirstName,
                    Contacts.Fields.PhoneNumbers,
                    Contacts.Fields.Image,
                    Contacts.Fields.ImageAvailable,
                ],
                name: !!search ? search : undefined,
                pageSize,
                pageOffset: 0,
            });

            const finalContacts = data.filter(
                (contact) =>
                    !!contact.name &&
                    !!contact.phoneNumbers &&
                    contact.phoneNumbers.length > 0
            );

            setOffset(data.length);
            setContacts(finalContacts);
        } else {
            setHasAccess(false);
        }
    };

    useEffect(() => {
        return props.navigation.addListener("focus", getContacts);
    }, []);

    useEffect(() => {
        getContacts().then();
    }, [search]);

    const { data, loading, error, refetch } = useQuery<
        GetRemainingInvitesData,
        GetRemainingInvitesVariables
    >(GET_REMAINING_INVITES, {
        variables: {
            uid: localUid(),
        },
    });

    if (loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const remainingInvites = !!data?.user ? data.user.remainingInvites : 0;

    return (
        <View style={styles.invitesContainer}>
            <TouchableOpacity
                style={styles.invitesHeader}
                activeOpacity={1}
                onPress={Keyboard.dismiss}
            >
                <Text style={styles.invitesHeaderText}>
                    Invite your friends to join Digitari and earn 100 digicoin
                    every time someone you invite creates an account!
                </Text>
                <Text style={styles.invitesRemaining}>
                    Remaining invites: {remainingInvites}
                </Text>
            </TouchableOpacity>
            {hasAccess ? (
                <SearchBar
                    placeholder="Search contacts..."
                    onChangeText={(text) => {
                        setSearch(text);
                    }}
                    value={search}
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.searchInputContainer}
                    lightTheme
                />
            ) : (
                <View style={styles.promptContainer}>
                    <Text style={styles.promptText}>
                        We need your permission to access your contacts so that
                        you can invite your friends
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
            <FlatList
                data={contacts}
                renderItem={({ item }) => <InviteUser contact={item} />}
                keyExtractor={(item) =>
                    !!item.id ? item.id : Math.random().toString()
                }
                onScroll={Keyboard.dismiss}
                onEndReached={async () => {
                    if (hasAccess) {
                        const { data } = await Contacts.getContactsAsync({
                            fields: [
                                Contacts.Fields.Name,
                                Contacts.Fields.FirstName,
                                Contacts.Fields.PhoneNumbers,
                                Contacts.Fields.Image,
                                Contacts.Fields.ImageAvailable,
                            ],
                            name: !!search ? search : undefined,
                            pageSize,
                            pageOffset: offset,
                        });

                        const newContacts = data.filter(
                            (contact) => !!contact.name
                        );

                        setOffset((lastOffset) => lastOffset + data.length);
                        setContacts((lastContacts) => [
                            ...lastContacts,
                            ...newContacts,
                        ]);
                    }
                }}
            />
        </View>
    );
};

export default Invites;
