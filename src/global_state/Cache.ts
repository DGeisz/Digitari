import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                activeConvos: {
                    merge(existing, incoming) {
                        try {
                            if (incoming.length > existing.length) {
                                return incoming;
                            } else {
                                return existing;
                            }
                        } catch (e) {
                            return incoming;
                        }
                    },
                },
                following: {
                    keyArgs: ["sid", "entityType"],
                    // @ts-ignore
                    merge(existing, incoming, { args: { lastTime } }) {
                        if (existing && incoming) {
                            if (!!lastTime) {
                                return [...existing, ...incoming];
                            } else {
                                return incoming;
                            }
                        } else if (existing) {
                            return existing;
                        } else if (incoming) {
                            return incoming;
                        } else {
                            return [];
                        }
                    },
                },
                followers: {
                    keyArgs: ["tid"],
                    merge(existing, incoming) {
                        if (existing && incoming) {
                            return [...existing, ...incoming];
                        } else if (existing) {
                            return existing;
                        } else if (incoming) {
                            return incoming;
                        } else {
                            return [];
                        }
                    },
                },
                search: {
                    keyArgs: ["text", "entityType"],
                    merge(existing, incoming) {
                        if (existing && !!incoming) {
                            return [...existing, ...incoming];
                        } else if (existing) {
                            return existing;
                        } else {
                            return incoming;
                        }
                    },
                },
            },
        },
        Convo: {
            fields: {
                messages: {
                    merge(existing, incoming): any {
                        console.log("\n\n ---- BOOKER ---- \n\n");

                        try {
                            console.log(incoming, existing);
                            // console.log(incoming.length, existing.length);
                            if (incoming.length > existing.length) {
                                console.log("oda");
                                return incoming;
                            } else {
                                console.log("anger");
                                return existing;
                            }
                        } catch (e) {
                            console.log("born");
                            return incoming;
                        }
                    },
                },
            },
        },
        ConvoMsg: {
            keyFields: ["id", "time"],
        },
    },
});
