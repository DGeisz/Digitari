import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                activeConvos: {
                    merge(existing, incoming) {
                        try {
                            console.log(incoming, existing);
                            console.log(incoming.length, existing.length);
                            if (incoming.length > existing.length) {
                                console.log("yoda");
                                return incoming;
                            } else {
                                console.log("yanger");
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
    },
});
