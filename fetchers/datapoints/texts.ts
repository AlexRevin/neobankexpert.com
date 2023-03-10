import { graphql } from "../../gql-types";
import { getClient } from "../core";

module.exports = async () => {
  const q = graphql(/* GraphQL */ `
    query getTexts {
      text {
        data {
          attributes {
            heading
            title
            right_title
            sub_heading
            heading_mobile
          }
        }
      }
    }
  `);
  const data = await getClient().request(q);
  return data.text?.data?.attributes;
};
