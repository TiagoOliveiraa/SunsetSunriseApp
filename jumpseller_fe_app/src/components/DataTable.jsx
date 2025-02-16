import React from "react";
import Table from "react-bootstrap/Table";

function DataTable(props){

    console.log("Na Tabela")
    props.sunInfo.map(item => console.log(item))


    return (
        <div className="data-container">
        <h2>Data Table for {props.sunInfo[0].location}</h2>
            <Table striped bordered hover className="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Sunrise</th>
                        <th>Sunset</th>
                        <th>Golden Hour</th>
                    </tr>
                </thead>
                <tbody>
                    {props.sunInfo.map(day => {
                    return (
                        <tr>
                        <td>{day.date}</td>
                        <td>{day.sunrise_time}</td>
                        <td>{day.sunset_time}</td>
                        <td>{day.golden_hour}</td>
                    </tr>
                    );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default DataTable