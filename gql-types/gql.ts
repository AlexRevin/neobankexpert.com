/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query getRegions {\n      regions(\n        filters: {\n          enabled: { eq: true }\n          # countries: { neobanks: { enabled: { eq: true } } } // only with neobanks present\n        }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            countries {\n              data {\n                attributes {\n                  neobanks {\n                    data {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.GetRegionsDocument,
    "\n    query getTexts {\n      text {\n        data {\n          attributes {\n            heading\n            title\n            right_title\n            sub_heading\n            heading_mobile\n          }\n        }\n      }\n    }\n  ": types.GetTextsDocument,
    "\n    query getBanks($type: String) {\n      neobanks(\n        sort: [\"sorter\"]\n        filters: { enabled: { eq: true }, attributes: { name: { eq: $type } } }\n        pagination: { start: 0, limit: 8 }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            logo {\n              data {\n                attributes {\n                  url\n                }\n              }\n            }\n            parameters {\n              parameters {\n                value\n                name\n              }\n            }\n            attributes(\n              filters: { card_enabled: { eq: true }, enabled: { eq: true } }\n            ) {\n              data {\n                attributes {\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.GetBanksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getRegions {\n      regions(\n        filters: {\n          enabled: { eq: true }\n          # countries: { neobanks: { enabled: { eq: true } } } // only with neobanks present\n        }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            countries {\n              data {\n                attributes {\n                  neobanks {\n                    data {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getRegions {\n      regions(\n        filters: {\n          enabled: { eq: true }\n          # countries: { neobanks: { enabled: { eq: true } } } // only with neobanks present\n        }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            countries {\n              data {\n                attributes {\n                  neobanks {\n                    data {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTexts {\n      text {\n        data {\n          attributes {\n            heading\n            title\n            right_title\n            sub_heading\n            heading_mobile\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getTexts {\n      text {\n        data {\n          attributes {\n            heading\n            title\n            right_title\n            sub_heading\n            heading_mobile\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getBanks($type: String) {\n      neobanks(\n        sort: [\"sorter\"]\n        filters: { enabled: { eq: true }, attributes: { name: { eq: $type } } }\n        pagination: { start: 0, limit: 8 }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            logo {\n              data {\n                attributes {\n                  url\n                }\n              }\n            }\n            parameters {\n              parameters {\n                value\n                name\n              }\n            }\n            attributes(\n              filters: { card_enabled: { eq: true }, enabled: { eq: true } }\n            ) {\n              data {\n                attributes {\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getBanks($type: String) {\n      neobanks(\n        sort: [\"sorter\"]\n        filters: { enabled: { eq: true }, attributes: { name: { eq: $type } } }\n        pagination: { start: 0, limit: 8 }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            logo {\n              data {\n                attributes {\n                  url\n                }\n              }\n            }\n            parameters {\n              parameters {\n                value\n                name\n              }\n            }\n            attributes(\n              filters: { card_enabled: { eq: true }, enabled: { eq: true } }\n            ) {\n              data {\n                attributes {\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;