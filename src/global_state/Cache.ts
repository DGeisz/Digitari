import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                feed: {
                    keyArgs: [],
                    //@ts-ignore
                    merge(existing, incoming, { args: { lastTime } }) {
                        console.log("This be it", existing, incoming);

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
                userPosts: {
                    keyArgs: ["uid"],
                    //@ts-ignore
                    merge(existing, incoming, { args: { lastTime } }) {
                        console.log(
                            "Here comes the barge! ",
                            existing,
                            incoming
                        );

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
                communityPosts: {
                    keyArgs: ["cmid", "tier"],
                    //@ts-ignore
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
            },
        },
        ConvoMsg: {
            keyFields: ["id", "time"],
        },
    },
});
