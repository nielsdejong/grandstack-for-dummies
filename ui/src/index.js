import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI
});


const GET_MOVIE = gql`
    query getMovie($title: String!) {
        Movie(title: $title) {
            actors { name }
        }
    }
`;

function Hello() {
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { title: 'The Matrix' },
    });

    if (loading) return <p>Loading ...</p>;
    return <h1>Hello {data["Movie"][0].actors[0].name}!</h1>;
}

const Main = () => (
    <ApolloProvider client={client}>
        <Hello/>
    </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"));
registerServiceWorker();


