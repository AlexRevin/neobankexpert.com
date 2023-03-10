"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    overwrite: true,
    schema: [
        {
            "http://127.0.0.1:1337/graphql": {
                headers: {
                    Authorization: `Bearer ${process.env.GQL_TOKEN}`,
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
