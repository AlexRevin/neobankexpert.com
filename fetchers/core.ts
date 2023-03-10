require('dotenv').config();
import { GraphQLClient } from 'graphql-request'

export const getClient = () => new GraphQLClient(process.env.GQL_URL ?? "", {
    headers: {
      authorization: `Bearer ${process.env.GQL_TOKEN}`,
    },
  })
