import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TableVotantes({ votantes, votantesCount }) {
    const [pageNumber, setPageNumber] = useState(votantes.current_page);
    var quantityPages = votantesCount / votantes.per_page;
    quantityPages = Math.trunc(quantityPages + 1);

    const currentPage = (event, page) => {
        window.location.href = `${votantes.path}?page=${page}`;
    };
    console.log(votantes);

    return (
        <>
            <div className="table-votante" id="tabla-votantes-pdf">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th className="email-mobile">Cedula</th>
                            <th>telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votantes.data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td className="">{item.cedula}</td>
                                <td className="">{item.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Pagination
                count={quantityPages}
                page={pageNumber}
                color="warning"
                onChange={currentPage}
                className="paginate"
            />
        </>
    );
}

export default TableVotantes;
