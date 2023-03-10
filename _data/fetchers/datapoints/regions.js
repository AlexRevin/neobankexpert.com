"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gql_types_1 = require("../../gql-types");
const core_1 = require("../core");
module.exports = async () => {
    const q = (0, gql_types_1.graphql)(/* GraphQL */ `
    query getRegions {
      regions(
        filters: {
          enabled: { eq: true }
          # countries: { neobanks: { enabled: { eq: true } } } // only with neobanks present
        }
      ) {
        data {
          id
          attributes {
            name
            countries {
              data {
                attributes {
                  neobanks {
                    data {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
    const data = await (0, core_1.getClient)().request(q);
    const mapSet = {};
    const outDict = {};
    data.regions?.data.forEach(({ id, attributes }) => {
        outDict[id ?? "unknown"] = { name: attributes?.name ?? "unknown", count: 0 };
        mapSet[id ?? 'unknown'] = {};
        attributes?.countries?.data.forEach((country) => {
            country.attributes?.neobanks?.data.forEach((bank) => {
                mapSet[id ?? 'unknown'][bank.id ?? 'unknown'] = true;
            });
        });
    });
    Object.keys(outDict).forEach((key) => {
        outDict[key].count = Object.keys(mapSet[key]).length;
    });
    return Object.values(outDict);
};
