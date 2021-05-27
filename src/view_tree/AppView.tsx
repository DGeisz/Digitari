import React, { useEffect, useState } from "react";
import MainEntry from "./main/MainEntry";
import AuthEntry from "./auth/AuthEntry";
import * as SplashScreen from "expo-splash-screen";
import { Auth, Hub } from "aws-amplify";
import { useApolloClient, useMutation, useReactiveVar } from "@apollo/client";
import {
    CHECK_IN_USER,
    CheckInUserData,
    CheckInUserVariables,
    CREATE_USER,
    CreateUserData,
    CreateUserVariables,
    ProcessIapData,
    ProcessIapVariables,
    PROCESS_IAP,
} from "./gql/Mutations";
import {
    localUid,
    setLocalFirstName,
    setLocalHid,
    setLocalUid,
} from "../global_state/UserState";
import { HID, HidData } from "./gql/Queries";
import { inviteCode, userAuthenticated } from "../global_state/AuthState";
import { styles } from "./AppViewStyles";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { palette } from "../global_styles/Palette";
import Constants from "expo-constants";
import type { InAppPurchase, IAPQueryResponse } from "expo-in-app-purchases";
import { USER_TYPENAME } from "../global_types/UserTypes";
import { updateId } from "expo-updates";
import { ProductId, products } from "../global_types/IapTypes";

const AppView: React.FC = () => {
    const client = useApolloClient();

    /* 
    First we set up initialize in-app-purchases 
     */
    useEffect(() => {
        if (Constants.appOwnership !== "expo") {
            (async () => {
                const {
                    connectAsync,
                    setPurchaseListener,
                    finishTransactionAsync,
                    IAPResponseCode,
                } = await import("expo-in-app-purchases");

                await connectAsync();

                setPurchaseListener((result: IAPQueryResponse) => {
                    const { responseCode, results, errorCode } = result;

                    console.log("Here's stuff: ", responseCode, results);

                    if (responseCode === IAPResponseCode.OK && !!results) {
                        results.forEach(async (rawPurchase) => {
                            const purchase = rawPurchase as InAppPurchase;

                            if (!purchase.acknowledged) {
                                /* 
                                Ok, first we want to process this on the backend
                                TODO: Actually implement backend processing
                                 */
                                let receipt: string;
                                let ios: boolean;

                                if (Platform.OS === "ios") {
                                    ios = true;
                                    receipt = purchase.transactionReceipt as string;
                                } else {
                                    ios = false;
                                    receipt = purchase.purchaseToken as string;
                                }

                                const {
                                    data: processData,
                                } = await client.mutate<
                                    ProcessIapData,
                                    ProcessIapVariables
                                >({
                                    mutation: PROCESS_IAP,

                                    variables: {
                                        productId: purchase.productId,
                                        ios,
                                        receipt,
                                    },
                                });

                                /* 
                                Then after we've accepted the transaction on the backend,
                                we want to mark the transaction as complete.

                                The mutation will return true if the iap was accepted
                                 */
                                if (!!processData?.processIap) {
                                    finishTransactionAsync(purchase, true);

                                    client.cache.modify({
                                        id: client.cache.identify({
                                            __typename: USER_TYPENAME,
                                            id: localUid(),
                                        }),
                                        fields: {
                                            coin(existing) {
                                                const amount =
                                                    products[
                                                        purchase.productId as ProductId
                                                    ];

                                                if (!!amount) {
                                                    return existing + amount;
                                                } else {
                                                    return existing;
                                                }
                                            },
                                        },
                                    });
                                }
                            }
                        });
                    }
                });
            })();

            return () => {
                if (Constants.appOwnership !== "expo") {
                    (async () => {
                        const { disconnectAsync } = await import(
                            "expo-in-app-purchases"
                        );

                        await disconnectAsync();
                    })();
                }
            };
        }
    }, []);

    const [checkedAuth, setCheckAuth] = useState<boolean>(false);
    const [fetchedUser, setFetchedUser] = useState<boolean>(false);

    const [retryCount, setRetryCount] = useState<number>(0);

    const [splashHidden, setSplashHidden] = useState<boolean>(false);

    const [newUser, setNewUser] = useState<boolean>(false);

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

    const [createUser] = useMutation<CreateUserData, CreateUserVariables>(
        CREATE_USER
    );

    useEffect(() => {
        (async () => {
            try {
                const { sub, email, given_name, family_name } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && setLocalUid(sub);
                !!given_name && setLocalFirstName(given_name);

                if (authenticated && email && given_name && family_name) {
                    const { data: checkInData } = await client.mutate<
                        CheckInUserData,
                        CheckInUserVariables
                    >({
                        mutation: CHECK_IN_USER,
                    });

                    const { data } = await createUser({
                        variables: {
                            email,
                            firstName: given_name,
                            lastName: family_name,
                            code: inviteCode(),
                        },
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
