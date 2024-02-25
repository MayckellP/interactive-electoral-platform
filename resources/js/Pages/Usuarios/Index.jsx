import React from "react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
//import Table from "react-bootstrap/Table";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginatedTable from "@/Components/Table";

export default function Index({
    auth,
    users,
    userCount,
    userPerRole,
    userCountPerRole,
}) {
    var myUsers = [];
    var myUsersCount = [];

    if (auth.user.role === "Administrador") {
        myUsers = users;
        myUsersCount = userCount;
    } else {
        myUsers = userPerRole;
        myUsersCount = userCountPerRole;
    }

    return (
        <AuthenticatedLayout user={auth.user} header={"Users"}>
            <Head title="Users" />

            <div className="cont-global-users">
                {/* ---------------------------------------------------------------------ALERT */}
                <Alert severity="info" className="info">
                    <AlertTitle>
                        Verifique que todos los usuarios tengan sus respectivos
                        roles:
                        <strong>" - Editar - Asignar role".</strong>
                    </AlertTitle>
                </Alert>
                <div className="cont-user-table">
                    {/* ---------------------------------------------------------------------USERS TABLE */}
                    <PaginatedTable
                        users={myUsers}
                        userCount={myUsersCount}
                        role={auth.user.role}
                    />
                    <div className="d-flex justify-content-between">
                        <Link
                            className="text-decoration-none"
                            href={route("usuarios.create")}
                            as="button"
                        >
                            <Button className="text-white fw-bold border-0 p-2 px-4 btn-submit w-100">
                                Crear Usuario
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
