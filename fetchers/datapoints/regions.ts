import { graphql } from "../../gql-types";
import { getClient } from "../core";

module.exports = async () => {
  const q = graphql(/* GraphQL */ `
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
  const data = await getClient().request(q);
  const mapSet: { [region_id: string]: { [bank_id: string]: boolean } } = {};
  const outDict: { [key: string]: { name: string; count?: number } } = {};
  data.regions?.data.forEach(({ id, attributes }) => {
    outDict[id ?? "unknown"] = { name: attributes?.name ?? "unknown", count: 0 };
    mapSet[id ?? 'unknown'] = {};
    attributes?.countries?.data.forEach((country) => {
      country.attributes?.neobanks?.data.forEach((bank) => {
        mapSet[id ?? 'unknown'][bank.id ?? 'unknown'] = true;
      });
    });
  });
  Object.keys(outDict).forEach( (key) => {
    outDict[key].count = Object.keys(mapSet[key]).length
  })
  return Object.values(outDict);
};
