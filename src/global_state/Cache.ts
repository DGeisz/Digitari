import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
    typePolicies: {
        Mutation: {
            fields: {
                blockConvo: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                finishConvo: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                collectEarnings: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
        Query: {
            fields: {
                feed: {
                    keyArgs: [],
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
                transactions: {
                    keyArgs: [],
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
                boltTransactions: {
                    keyArgs: [],
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
                allPosts: {
                    keyArgs: [],
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
                userPosts: {
                    keyArgs: ["uid"],
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
                communityConvos: {
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
                userConvos: {
                    keyArgs: ["uid"],
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
                newConvos: {
                    keyArgs: ["orderingType"],
                    merge(
                        existing,
                        incoming,
                        //@ts-ignore
                        { args: { offset } }
                    ) {
                        if (existing && incoming) {
                            if (!!offset) {
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
                convoMessages: {
                    keyArgs: ["cvid"],
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
        Message: {
            keyFields: ["id", "time"],
        },
        FollowEntity: {
            keyFields: ["tid", "sid", "name"],
        },
        DonationRecord: {
            keyFields: ["uid", "pid"],
        },
    },
});
