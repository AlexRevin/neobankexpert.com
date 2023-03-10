"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gql_types_1 = require("../../gql-types");
const core_1 = require("../core");
module.exports = async () => {
    const q = (0, gql_types_1.graphql)(/* GraphQL */ `
    query getAllBanks {
      neobanks(filters: { enabled: { eq: true } }) {
        data {
          id
          attributes {
            name
            description
            logo {
              data {
                attributes {
                  url
                }
              }
            }
            countries {
              data {
                attributes {
                  name
                  iso_code
                  regions {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
            attributes(filters: { enabled: { eq: true } }) {
              data {
                attributes {
                  name
                }
              }
            }
            parameters {
              parameters {
                name
                value
              }
            }
          }
        }
      }
    }
  `);
    const data = await (0, core_1.getClient)().request(q);
    return data.neobanks?.data;
};
