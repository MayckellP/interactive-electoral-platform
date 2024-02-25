import { useState, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TableVotantes from "@/Components/TableVotantes";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { TextField } from "@mui/material";

export default function FilterSelect({
    auth,
    votantes,
    votantesCount,
    departamento,
    distrito,
    cargador,
    parametros,
    cargadorName,
}) {
    console.log(cargadorName);
    var [pdf, setPdf] = useState(false);
    const { data, setData, get, processing, errors, reset } = useForm({
        departamento: parametros[0],
        distrito: parametros[1],
        cargador: parametros[2],
    });
    const submitFile = (e) => {
        console.log(data);
        e.preventDefault();
        if (pdf) {
            get(route("votantes.show", "PDF_select"));
        } else {
            get(route("votantes.show", "EXCEL_select"));
        }
    };

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

                <Alert severity="info" className="mb-2">
                    <AlertTitle>
                        Resultado de filtro segun sus parametros:
                        <strong className="ms-1">
                            "{departamento}" - "{distrito}" - "
                            {cargadorName.name} {cargadorName.apellido}".
                        </strong>
                    </AlertTitle>
                </Alert>

                <form
                    onSubmit={submitFile}
                    method="post"
                    className="cont-votantes-table"
                >
                    {/* ---------------------------------------------------------------------USERS TABLE */}

                    <TableVotantes
                        votantes={votantes}
                        votantesCount={votantesCount}
                    />
                    <Link
                        className="text-decoration-none me-2"
                        href={route("votantes.create")}
                        as="button"
                    >
                        <Button className="text-white fw-bold border-0 p-1 my-1 px-2 fs-md btn-submit w-100 shadow-none">
                            Nuevo votante
                        </Button>
                    </Link>

                    <Button
                        onClick={() => setPdf(true)}
                        type="submit"
                        className="text-white fw-bold border-0 p-1 px-2 fs-md bg-primary me-2 "
                    >
                        Descargar como PDF
                    </Button>

                    <Button
                        type="submit"
                        className="text-white fw-bold border-0 p-1 px-2 fs-md bg-success"
                    >
                        Descargar como Excel
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
