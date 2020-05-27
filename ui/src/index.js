import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import App from "./ActorTable";
import Dropdown from "react-materialize/lib/Dropdown";
import Button from "react-materialize/lib/Button";
import Modal from "react-materialize/lib/Modal";
import Table from "react-materialize/lib/Table";
import Navbar from "react-materialize/lib/Navbar";
import Icon from "react-materialize/lib/Icon";
import Container from "react-materialize/lib/Container";

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI
});

const Main = () => (
    <ApolloProvider client={client}>

        <Navbar
            style={{backgroundColor: 'black'}}
            alignLinks="right"
            brand={<a className="brand-logo" href="#">&nbsp; Neo4j Kettle Logging Dashboard </a>}
            id="mobile-nav"
            centerLogo
            menuIcon={<Icon>menu</Icon>}
        >

        </Navbar>
        <Container>
        <App/>
        {/*<Dropdown trigger={*/}
        {/*    <Button>Drop me!</Button>*/}
        {/*}>*/}
        {/*    <p>Hello</p>*/}
        {/*    <p>Hello</p>*/}
        {/*    <p>Hello</p>*/}
        {/*    <p>Bye</p>*/}
        {/*</Dropdown>*/}

        </Container>
    </ApolloProvider>
);

ReactDOM.render(<Main/>, document.getElementById("root"));
registerServiceWorker();


