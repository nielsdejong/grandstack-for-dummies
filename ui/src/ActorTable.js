import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import React from "react";
import Modal from "react-materialize/lib/Modal";
import Container from "react-materialize/lib/Container";
import Button from "react-materialize/lib/Button";
import Navbar from "react-materialize/lib/Navbar";

// Use the GraphQL query.
const GET_MOVIE = gql`
    { 
            e: Execution(type:"JOB" orderBy: executionStart_desc) {
                name,
                executionStart,
                executionEnd,
                id,
#                file,
                success,
                RWIOR
            }
        }
`;

// To render results...
function ActorTable(){
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: {  },
    });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;
    const trigger = <Button style={{backgroundColor: 'white'}}>🔍</Button>;


    const headerhtml =  Object.keys(data['e'][0]).map((key) => {
        return <th>{key}</th>
    });
    const header = <thead><tr><th></th>{headerhtml}<th></th></tr></thead>;
    const rows =  data["e"].map((row,index) => {
        const rowhtml = Object.values(row).map((value) => {
            return <td>{value}</td>
        });
        const modal =  <Modal header={'Execution of ' + row['name']+" (" + row['executionStart'] + ")"} trigger={trigger}>
            Detailed info goes in here.
        </Modal>
        return  <tr><td>{index}</td>{rowhtml}<td>{modal}</td></tr>;
    });


    return <table>{header}<tbody>{rows}</tbody></table>;
}

export default (ActorTable);
