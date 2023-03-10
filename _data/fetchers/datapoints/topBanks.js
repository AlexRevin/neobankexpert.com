"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gql_types_1 = require("../../gql-types");
const core_1 = require("../core");
module.exports = async () => {
    const q = (0, gql_types_1.graphql)(/* GraphQL */ `
    query getBanks($type: String) {
      neobanks(
        sort: ["sorter"]
        filters: { enabled: { eq: true }, attributes: { name: { eq: $type } } }
        pagination: { start: 0, limit: 8 }
      ) {
        data {
          id
          attributes {
            name
            logo {
              data {
                attributes {
                  url
                }
              }
            }
            parameters {
              parameters {
                value
                name
              }
            }
            attributes(
              filters: { card_enabled: { eq: true }, enabled: { eq: true } }
            ) {
              data {
                attributes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `);
    return ["personal", "business"].reduce(async (sum, type) => {
        const data = await (0, core_1.getClient)().request(q, { type });
        const clean = data.neobanks?.data;
        return {
            [type]: clean,
            ...(await sum),
        };
    }, Promise.resolve({}));
};
