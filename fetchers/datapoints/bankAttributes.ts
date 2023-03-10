import { graphql } from "../../gql-types";
import { getClient } from "../core";

module.exports = async () => {
  const q = graphql(/* GraphQL */ `
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
  const data = await getClient().request(q);
  return data.attributes?.data;
};
