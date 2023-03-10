"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
require('dotenv').config();
const graphql_request_1 = require("graphql-request");
const getClient = () => new graphql_request_1.GraphQLClient(process.env.GQL_URL ?? "", {
    headers: {
        authorization: `Bearer ${process.env.GQL_TOKEN}`,
    },
});
exports.getClient = getClient;
