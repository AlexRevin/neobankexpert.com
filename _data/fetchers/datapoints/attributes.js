"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gql_types_1 = require("../../gql-types");
const core_1 = require("../core");
module.exports = async () => {
    const q = (0, gql_types_1.graphql)(/* GraphQL */ `
    query getAttributes {
      attributes(filters: { enabled: { eq: true } }) {
        data {
          attributes {
            name
          }
        }
      }
    }
  `);
    const data = await (0, core_1.getClient)().request(q);
    return data.countries?.data;
};
