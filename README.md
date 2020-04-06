## grandstack-for-dummies
This project aims to provide a super simple starting point for Grandstack apps on top of Neo4j.
Consider this a starting point for those not familiar with React, Apollo or GraphQL. It's essentially a stripped down version of the [grand-stack-starter](https://github.com/grand-stack/grand-stack-starter) repo, with some more comments.
## Dependencies
`(npm == 6.14.4 && node == 13.12.0)`

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
| File/Folder        | Description                                                                          |
|------------------|--------------------------------------------------------------------------------------|
| `api`                           | Main folder for the Apollo / GraphQL API layer.                       |
| `api/src`                       | Source files for the Apollo application.  |
| `api/src/index.js`              | Sets up an express.js app that managed the API.  |
| `api/src/schema.graphql`        | The schema that maps Cypher to GraphQL.  |
| `api/.env`                      | Environment variables (settings) for the API layer.                                                     |
| `api/package.json`              | Node dependencies for API Layer.                       |

