import { useState, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import Table from "react-bootstrap/Table";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ButtonReact from "react-bootstrap/Button";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputError from "@/Components/InputError";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import TableFiles from "@/Components/TableFiles";

export default function Index({
    auth,
    votantesData,
    consultaDB,
    consultaCount,
    identifier,
}) {
    return (
        <AuthenticatedLayout user={auth.user} header={"Votantes"}>
            <Head title="Votantes" />

            <div className="cont-global-users">
                <Link href={route("votantes.index")} className="cont-btn-back">
                    <img
                        src="/images/Back-icon.svg"
                        alt="icon-back"
                        className="back-button"
                    />
                    <span className="back-text">Back</span>
                </Link>
                <TableFiles
                    data={consultaDB}
                    dataCount={consultaCount}
                    identifier={identifier}
                    username={`${auth.user.name} ${auth.user.apellido}`}
                />
            </div>
        </AuthenticatedLayout>
    );
}
