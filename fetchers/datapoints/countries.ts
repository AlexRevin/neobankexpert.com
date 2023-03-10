import { graphql } from "../../gql-types";
import { getClient } from "../core";

module.exports = async () => {
  const q = graphql(/* GraphQL */ `
    query getAllCountries {
      countries {
        data {
          attributes {
            name
            iso_code
          }
        }
      }
    }
  `);
  const data = await getClient().request(q);
  return data.countries?.data;
};
