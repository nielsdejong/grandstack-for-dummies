## Simple Grandstack Template
This project aims to provide a super simple starting point for Grandstack apps on top of Neo4j.

Consider this a tutorial for those not familiar with React, Apollo or GraphQL.



## Installation

### Part 1 - Setting up Apollo & the GraphQL API

1. Get yourself a Neo4j instance (3.5.12).
2. Set up the `api/.env` file to point to your instance.
    ```
    NEO4J_URI=bolt://localhost:7687
    NEO4J_USER=neo4j
    NEO4J_PASSWORD=sunshine 
    ```
3. Define a GraphQL schema that maps your Neo4j data to JSON. See `schema.graphql` for examples on the movie graph.
4. Install the npm packages (`cd api && npm i`)
5. Run the app in development mode (`npm run serve`)
6. Try out some GraphQL queries. For example:
    ```
    {
      m: Movie(title: "The Matrix") {
        title
        actors {
          name
        }
        avgRating
      }
    }
    ```
   
## Project Structure

### Apollo + GraphQL
The pollo Client is a state management library for JavaScript apps. The Apollo code lives in the `api` directory of the project.

### React
React is a front-end framework for building web apps.
The React code lives in the `ui` directory.

