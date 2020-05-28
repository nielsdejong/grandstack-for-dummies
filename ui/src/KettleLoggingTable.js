import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import React from "react";
import Modal from "react-materialize/lib/Modal";
import Button from "react-materialize/lib/Button";

const trigger = <Button style={{backgroundColor: 'white'}}>🔍</Button>;

const GET_LOGGING_INFO = gql`
    {
        e: Execution(type:"JOB" orderBy: executionStart_desc) {
            name, executionStart, executionEnd, durationMs, id, file, success, RWIOR, loggingText, subexecutions {
                name, registrationDate, id, message, type, rwior
            }
        }
    }
`;

/**
 * Builds HTML for the kettle logging table based on the data retrieved through GraphQL.
 */
function KettleLoggingTable() {
    const {loading, error, data} = useQuery(GET_LOGGING_INFO, {
        variables: {},
    });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;

    const headers = ["name", "executionStart", "executionEnd", "durationMs", "id", "success", "RWIOR"];
    const subheaders = ["name", "registrationDate", "id", "message", "type", "rwior"];

    const headerHTML = buildHeaderHTML(headers);
    const rowsHTML = buildRowsHTML(data, headers, subheaders);
    return <table>{headerHTML}
        <tbody>{rowsHTML}</tbody>
    </table>;
}

function buildRowsHTML(data, headers, subheaders) {

    const rowsHTML = data["e"].map((row, index) => {
        const modal = buildModalHTML(row, subheaders);
        const singleRowHTML = buildSingleRowHTML(headers, row, index, modal);
        return singleRowHTML;
    });
    return rowsHTML;
}

function buildModalHTML(row, subheaders) {
    const subheaderHTML = buildHeaderHTML(subheaders);
    const subrowsHTML = row['subexecutions'].map((subrow, index) => {
        return buildSingleRowHTML(subheaders, subrow, index);
    });
    return <Modal header={'Execution of ' + row['name'] + " (" + row['executionStart'] + ")"} trigger={trigger}>
        <table>{subheaderHTML}
            <tbody>{subrowsHTML}</tbody>
        </table>
        <h5>Logs:</h5>
        <pre><hr/>{row['loggingText']}<hr/></pre>
    </Modal>
}

function buildSingleRowHTML(headers, row, index, optional = "") {
    const rowhtml = headers.map((header) => {
        return <td>{row[header]}</td>;
    });
    return <tr><td>{index}</td>{rowhtml}{optional}</tr>;
}


function buildHeaderHTML(headers) {
    return <thead>
    <tr>
        <th></th>
        {headers.map((key) => {
            return <th>{key}</th>
        })}
        <th></th>
    </tr>
    </thead>;
}

export default (KettleLoggingTable);
