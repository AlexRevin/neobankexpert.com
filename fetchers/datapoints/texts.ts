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
            subscribe_title
            subscribe_placeholder
            subscribe_button
            card_view_details
            card_button
            footer_text
          }
        }
      }
    }
  `);
  const data = await getClient().request(q);
  return data.text?.data?.attributes;
};
