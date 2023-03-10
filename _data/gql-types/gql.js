"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphql = void 0;
/* eslint-disable */
const types = __importStar(require("./graphql"));
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
    "\n    query getAllBanks {\n      neobanks(filters: { enabled: { eq: true } }) {\n        data {\n          id\n          attributes {\n            name\n            description\n            logo {\n              data {\n                attributes {\n                  url\n                }\n              }\n            }\n            countries {\n              data {\n                attributes {\n                  name\n                  iso_code\n                  regions {\n                    data {\n                      id\n                      attributes {\n                        name\n                      }\n                    }\n                  }\n                }\n              }\n            }\n            attributes(filters: { enabled: { eq: true } }) {\n              data {\n                attributes {\n                  name\n                }\n              }\n            }\n            parameters {\n              parameters {\n                name\n                value\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.GetAllBanksDocument,
    "\n    query getAllCountries {\n      countries {\n        data {\n          attributes {\n            name\n            iso_code\n          }\n        }\n      }\n    }\n  ": types.GetAllCountriesDocument,
    "\n    query getRegions {\n      regions(\n        filters: {\n          enabled: { eq: true }\n          # countries: { neobanks: { enabled: { eq: true } } } // only with neobanks present\n        }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            countries {\n              data {\n                attributes {\n                  name\n                  iso_code\n                  neobanks {\n                    data {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.GetRegionsDocument,
    "\n    query getTexts {\n      text {\n        data {\n          attributes {\n            heading\n            title\n            right_title\n            sub_heading\n            heading_mobile\n            subscribe_title\n            subscribe_placeholder\n            subscribe_button\n            card_view_details\n            card_button\n            footer_text\n          }\n        }\n      }\n    }\n  ": types.GetTextsDocument,
    "\n    query getBanks($type: String) {\n      neobanks(\n        sort: [\"sorter\"]\n        filters: { enabled: { eq: true }, attributes: { name: { eq: $type } } }\n        pagination: { start: 0, limit: 8 }\n      ) {\n        data {\n          id\n          attributes {\n            name\n            logo {\n              data {\n                attributes {\n                  url\n                }\n              }\n            }\n            parameters {\n              parameters {\n                value\n                name\n              }\n            }\n            attributes(\n              filters: { card_enabled: { eq: true }, enabled: { eq: true } }\n            ) {\n              data {\n                attributes {\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.GetBanksDocument,
};
function graphql(source) {
    return documents[source] ?? {};
}
exports.graphql = graphql;
