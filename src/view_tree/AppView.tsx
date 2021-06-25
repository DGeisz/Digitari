import React, { useEffect, useState } from "react";
import MainEntry from "./main/MainEntry";
import AuthEntry from "./auth/AuthEntry";
import { Auth, Hub } from "aws-amplify";
import { useApolloClient, useReactiveVar } from "@apollo/client";
import {
    CHECK_IN_USER,
    CheckInUserData,
    CheckInUserVariables,
    CREATE_USER,
    CreateUserData,
    CreateUserVariables,
    PROCESS_IAP,
    ProcessIapData,
    ProcessIapVariables,
} from "./gql/Mutations";
import {
    localUid,
    setLocalFirstName,
    setLocalHid,
    setLocalLastName,
    setLocalUid,
} from "../global_state/UserState";
import { HID, HidData } from "./gql/Queries";
import { inviteCode, userAuthenticated } from "../global_state/AuthState";
import { styles } from "./AppViewStyles";
import { ActivityIndicator, Platform, Text, LogBox, View } from "react-native";
import { palette } from "../global_styles/Palette";
import Constants from "expo-constants";
import type { IAPQueryResponse, InAppPurchase } from "expo-in-app-purchases";
import { USER_TYPENAME } from "../global_types/UserTypes";
import { ProductId, products } from "../global_types/IapTypes";
import {
    TutorialContext,
    useTutorialContextValues,
} from "./tutorial/context/tutorial_context/TutorialContext";

LogBox.ignoreAllLogs();

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
                    const { responseCode, results } = result;

                    if (responseCode === IAPResponseCode.OK && !!results) {
                        results.forEach(async (rawPurchase) => {
                            const purchase = rawPurchase as InAppPurchase;

                            if (!purchase.acknowledged) {
                                /*
                                Ok, first we want to process this on the backend
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
                }).then();
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

    const tutorialContextValues = useTutorialContextValues();

    const [retryCount, setRetryCount] = useState<number>(0);

    const [splashHidden, setSplashHidden] = useState<boolean>(false);

    const authenticated = useReactiveVar(userAuthenticated);

    const authenticate = async () => {
        try {
            const { sub, given_name, family_name } = (
                await Auth.currentSession()
            ).getIdToken().payload;

            !!sub && setLocalUid(sub);
            !!given_name && setLocalFirstName(given_name);
            !!family_name && setLocalLastName(family_name);
            userAuthenticated(true);
        } catch (_) {
            userAuthenticated(false);
            setFetchedUser(false);
        }
    };

    useEffect(() => {
        Hub.listen("auth", authenticate);
        authenticate().then(() => setCheckAuth(true));
    }, []);

    useEffect(() => {
        (async () => {
            if (checkedAuth) {
                if (authenticated) {
                    // If we've authenticated and performed the initial fetch, we show the splash
                    if (fetchedUser) {
                        if (!splashHidden) {
                            setSplashHidden(true);
                        }
                    }
                } else {
                    // If we're not authenticated, immediately show auth flow

                    setFetchedUser(false);
                    if (!splashHidden) {
                        setSplashHidden(true);
                    }
                }
            }
        })();
    }, [fetchedUser, checkedAuth]);

    useEffect(() => {
        (async () => {
            try {
                const { sub, email, given_name, family_name } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && setLocalUid(sub);
                !!given_name && setLocalFirstName(given_name);
                !!family_name && setLocalLastName(family_name);

                if (authenticated && email && given_name && family_name) {
                    const { data: checkInData } = await client.mutate<
                        CheckInUserData,
                        CheckInUserVariables
                    >({
                        mutation: CHECK_IN_USER,
                    });

                    if (
                        !checkInData?.checkInUser ||
                        !checkInData.checkInUser.firstName ||
                        !checkInData.checkInUser.lastName ||
                        !checkInData.checkInUser.email
                    ) {
                        try {
                            const {
                                data: createUserData,
                            } = await client.mutate<
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

                            if (!!createUserData?.createUser) {
                                setFetchedUser(true);
                            }

                            tutorialContextValues.setTutorialActive(true);
                        } catch (e) {
                            console.error("Create user error: ", e);
                        }
                    } else {
                        setFetchedUser(true);
                        tutorialContextValues.setTutorialActive(false);
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

    if (!splashHidden || (!fetchedUser && authenticated)) {
        return (
            <View style={styles.setupContainer}>
                <Text style={styles.setupText}>Warming the engines...</Text>
                <ActivityIndicator color={palette.deepBlue} size="large" />
            </View>
        );
    } else if (fetchedUser && authenticated) {
        return (
            <TutorialContext.Provider value={tutorialContextValues}>
                <MainEntry />
            </TutorialContext.Provider>
        );
    } else {
        return <AuthEntry />;
    }
};

export default AppView;
