import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function PaginatedTable({ users, userCount, role }) {
    const [pageNumber, setPageNumber] = useState(users.current_page);
    console.log(users);
    var quantityPages = userCount / users.per_page;
    quantityPages = Math.trunc(quantityPages + 1);
    console.log(quantityPages);

    const currentPage = (event, page) => {
        window.location.href = `${users.path}?page=${page}`;
    };
    console.log(role);
    return (
        <>
            <div className="table-user">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th className="email-mobile">Cedula</th>
                            <th>Role</th>
                            <th colSpan={2} className="text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.apellido}</td>
                                <td className="">{item.cedula}</td>
                                <td>{item.role == null ? "--" : item.role}</td>

                                <td className="text-center p-1">
                                    <Link
                                        className="text-decoration-none "
                                        href={route("usuarios.edit", item.id)}
                                    >
                                        <Button className="text-white fw-bold bg-success rounded-2">
                                            <EditIcon className="fs-5" />
                                        </Button>
                                    </Link>
                                </td>

                                {role === "Administrador" && (
                                    <td className="text-center p-1">
                                        <Link
                                            className="text-decoration-none"
                                            href={route(
                                                "usuarios.destroy",
                                                item.id
                                            )}
                                            method="delete"
                                            as="button"
                                        >
                                            <Button className="text-white fw-bold bg-danger rounded-2">
                                                <DeleteIcon className="fs-5" />
                                            </Button>
                                        </Link>
                                    </td>
                                )}
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

export default PaginatedTable;
