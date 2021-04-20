import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                activeConvos: {
                    merge(existing, incoming) {
                        try {
                            // console.log(incoming, existing);
                            // console.log(incoming.length, existing.length);
                            if (incoming.length > existing.length) {
                                console.log("yoda");
                                return incoming;
                            } else {
                                console.log("yanger");
                                return existing;
                            }
                        } catch (e) {
                            // console.log("born");
                            return incoming;
                        }
                    },
                },
                following: {
                    keyArgs: ["sid", "entityType"],
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
