import { graphql } from "../../gql-types";
import { getClient } from "../core";

module.exports = async () => {
  const q = graphql(/* GraphQL */ `
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
    const data = await getClient().request(q, { type });
    const clean = data.neobanks?.data;
    return {
      [type]: clean,
      ...(await sum),
    };
  }, Promise.resolve({}));
};
