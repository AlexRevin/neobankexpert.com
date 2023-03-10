"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gql_types_1 = require("../../gql-types");
const core_1 = require("../core");
module.exports = async () => {
    const q = (0, gql_types_1.graphql)(/* GraphQL */ `
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
          }
        }
      }
    }
  `);
    const data = await (0, core_1.getClient)().request(q);
    return data.text?.data?.attributes;
};
