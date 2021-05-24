import React, { useEffect, useState } from "react";
import MainEntry from "./main/MainEntry";
import AuthEntry from "./auth/AuthEntry";
import * as SplashScreen from "expo-splash-screen";
import { Auth, Hub } from "aws-amplify";
import { useApolloClient, useReactiveVar } from "@apollo/client";
import {
    CHECK_IN_USER,
    CheckInUserData,
    CheckInUserVariables,
    CREATE_USER,
    CreateUserData,
    CreateUserVariables,
} from "./gql/Mutations";
import {
    setLocalFirstName,
    setLocalHid,
    setLocalUid,
} from "../global_state/UserState";
import { HID, HidData } from "./gql/Queries";
import { inviteCode, userAuthenticated } from "../global_state/AuthState";
import { styles } from "./AppViewStyles";
import { ActivityIndicator, Text, View } from "react-native";
import LoadingWheel from "../global_building_blocks/loading_wheel/LoadingWheel";
import { palette } from "../global_styles/Palette";

const AppView: React.FC = () => {
    const [checkedAuth, setCheckAuth] = useState<boolean>(false);
    const [fetchedUser, setFetchedUser] = useState<boolean>(false);

    const [retryCount, setRetryCount] = useState<number>(0);

    const [splashHidden, setSplashHidden] = useState<boolean>(false);

    const [newUser, setNewUser] = useState<boolean>(false);
    const client = useApolloClient();

    const authenticated = useReactiveVar(userAuthenticated);

    const authenticate = async () => {
        try {
            const { sub, given_name } = (
                await Auth.currentSession()
            ).getIdToken().payload;

            !!sub && setLocalUid(sub);
            !!given_name && setLocalFirstName(given_name);
            userAuthenticated(true);
        } catch (_) {
            userAuthenticated(false);
        }
    };

    useEffect(() => {
        Hub.listen("auth", authenticate);
        authenticate().then(() => setCheckAuth(true));
    }, []);

    useEffect(() => {
        (async () => {
            console.log(
                "Heres check in ",
                checkedAuth,
                authenticated,
                fetchedUser
            );
            if (checkedAuth) {
                if (authenticated) {
                    // If we've authenticated and performed the initial fetch, we show the splash
                    if (fetchedUser) {
                        if (!splashHidden) {
                            setTimeout(async () => {
                                await SplashScreen.hideAsync();
                                setSplashHidden(true);
                            }, 500);
                        }
                    }
                } else {
                    // If we're not authenticated, immediately show auth flow

                    if (!splashHidden) {
                        setTimeout(async () => {
                            await SplashScreen.hideAsync();
                            setSplashHidden(true);
                        }, 500);
                    }
                }
            }
        })();
    }, [fetchedUser, checkedAuth]);

    useEffect(() => {
        (async () => {
            try {
                console.log("Here we're starting auth!");

                const { sub, email, given_name, family_name } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && setLocalUid(sub);
                !!given_name && setLocalFirstName(given_name);

                // console.log("Here's auth info", email, given_name, family_name);

                if (authenticated && email && given_name && family_name) {
                    const { data: checkInData } = await client.mutate<
                        CheckInUserData,
                        CheckInUserVariables
                    >({
                        mutation: CHECK_IN_USER,
                    });

                    if (!checkInData?.checkInUser) {
                        const { data: createUserData } = await client.mutate<
                            CreateUserData,
                            CreateUserVariables
                        >({
                            mutation: CREATE_USER,
                            variables: {
                                email,
                                firstName: given_name,
                                lastName: family_name,
                                code: inviteCode(),
                            },
                        });

                        console.log("Here's create user: ", createUserData);

                        if (createUserData?.createUser) {
                            setFetchedUser(true);
                            setNewUser(true);
                        }
                    } else {
                        setFetchedUser(true);
                        setNewUser(false);
                    }

                    const { data: hidData } = await client.query<HidData>({
                        query: HID,
                    });

                    if (!!hidData?.hid) {
                        setLocalHid(hidData.hid);
                    }
                }
            } catch (e) {
                console.log("Fetch error: ", e);

                if (e !== "No current user") {
                    setTimeout(() => {
                        setRetryCount((count) => count + 1);
                    }, 1000);
                }
            }
        })();
    }, [authenticated, checkedAuth, retryCount]);

    if (!fetchedUser && authenticated) {
        return (
            <View style={styles.setupContainer}>
                <Text style={styles.setupText}>
                    Getting everything ready...
                </Text>
                <ActivityIndicator color={palette.deepBlue} size="large" />
            </View>
        );
    } else if (fetchedUser && authenticated) {
        return <MainEntry />;
    } else {
        return <AuthEntry />;
    }
};

export default AppView;
