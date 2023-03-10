import { graphql } from "../../gql-types";
import { getClient } from "../core";

module.exports = async () => {
  const q = graphql(/* GraphQL */ `
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
  const data = await getClient().request(q);
  return data.neobanks?.data;
};
