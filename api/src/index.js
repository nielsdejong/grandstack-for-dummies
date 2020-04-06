
import apollo from 'apollo-server-express'
import express from "express";
import neo4j_graphql from "neo4j-graphql-js"
import neo4j from 'neo4j-driver';
import dotenv from "dotenv";
import fs from "fs";

import path from 'path';
const __dirname = path.resolve();

const graphqlPath = "/graphql";
dotenv.config(); // set environment variables from "../.env
const { ApolloServer } = apollo;
const {makeAugmentedSchema} = neo4j_graphql;
const typeDefs = fs.readFileSync(process.env.GRAPHQL_SCHEMA || path.join(__dirname, "src", "schema.graphql")).toString("utf-8");
const port = process.env.GRAPHQL_LISTEN_PORT || 4001;


// Create a new ApolloServer instance, serving the GraphQL schema.
const server = new ApolloServer({
    context: {
        driver: neo4j.driver(
            process.env.NEO4J_URI || "bolt://localhost:7687",
            neo4j.auth.basic(
                process.env.NEO4J_USER || "neo4j",
                process.env.NEO4J_PASSWORD || "neo4j"
            )
        )
    },
    schema: makeAugmentedSchema({typeDefs}),
    introspection: true,
    playground: true
});

// Start Express server
const app = express();
server.applyMiddleware({app, path: graphqlPath});
app.listen({port, path: graphqlPath}, () => {
    console.log(`GraphQL server ready at http://localhost:${port}${graphqlPath}`);
});
