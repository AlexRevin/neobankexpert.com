"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: [
        {
            "http://127.0.0.1:1337/graphql": {
                headers: {
                    Authorization: "Bearer 902d7ce4dfa1fd26161cf88db35b423661450be0d156e5501ace2fb28a29d847140e96185a2afb69f7dcf9b548609d4c3b2c11b09435bf35eadb49c4076f94418fc8fab0b272a35f2e77f6da31e322ba2540272a885fa6fd67527f34febe08842b7dcb8a1bdb5a3a8563d37aa8f1ffae218ecd3f517845e1cf88de915e0c0dff",
                },
            },
        },
    ],
    documents: "fetchers//datapoints/**/*.ts",
    generates: {
        "./gql-types/": {
            preset: "client",
            plugins: [],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};
exports.default = config;
