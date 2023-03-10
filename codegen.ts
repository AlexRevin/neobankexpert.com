import type { CodegenConfig } from "@graphql-codegen/cli";
require('dotenv').config();

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "http://127.0.0.1:1337/graphql": {
        headers: {
          Authorization:
            `Bearer ${process.env.GQL_TOKEN}`,
        },
      },
    },
  ],
  documents: "fetchers//datapoints/**/*.ts",
  generates: {
    "./gql-types/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
