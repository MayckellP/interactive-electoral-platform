import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import { Button } from "@mui/material";
import { FormCheck } from "react-bootstrap";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function FilterText({
    auth,
    votante,
    puntero,
    coordinador,
    delegado,
}) {
    const dataUser = document.getElementById("dataUser");
    console.log("puntero:", puntero);
    console.log("coordinador: ", coordinador);
    console.log("delegado: ", delegado);
    var delegadoData;
    if (delegado === null && coordinador === null) {
    }

    return (
        <AuthenticatedLayout user={auth.user} header={"Edit users"}>
            <Head title="Users" />

            <div className="cont-global-users">
                <Link href={route("votantes.index")} className="cont-btn-back">
                    <img
                        src="/images/Back-icon.svg"
                        alt="icon-back"
                        className="back-button"
                    />
                    <span className="back-text">Back</span>
                </Link>
                <Alert severity="success" className="mb-2 alert-edit">
                    <AlertTitle>
                        Resultados segun la busqueda de la cedula:{" "}
                        {votante.cedula}.
                    </AlertTitle>
                </Alert>
                <div className="cont-user-edit">
                    <form className="form-user-edit">
                        {/* ---------------------------------------------------------------------FORM TO EDIT USER */}
                        <h3 className="title"></h3>

                        <div className="cont-inputs-doble mb-3">
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble info-white"
                                label="Nombre"
                                value={votante.nombre}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble info-red"
                                label="Apellido"
                                value={votante.apellido}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="cont-inputs-doble mb-3">
                            <TextField
                                id="telefono"
                                label="Telefono"
                                type="text"
                                className="input-doble info-red"
                                value={votante.telefono}
                                autoComplete="telefono"
                            />
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble info-white"
                                label="Cédula"
                                value={votante.cedula}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="cont-inputs-doble mb-3">
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble info-white"
                                label="Departamento"
                                value={votante.nombre_departamento}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble info-red"
                                label="Distrito"
                                value={votante.nombre_distrito}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>

                        <div className="cont-inputs-doble mb-3">
                            <TextField
                                id="outlined-read-only-input"
                                label="Nombre Puntero"
                                className="input-doble info-red"
                                value={!puntero ? "------" : puntero.name}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Apellido Puntero"
                                className="input-doble info-white"
                                value={!puntero ? "------" : puntero.apellido}
                            />
                        </div>
                        <hr className="my-4 " />
                        {auth.user.role === "Administrador" && (
                            <>
                                <div className="cont-inputs-doble">
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Nombre Coordinador"
                                        className="input-doble info-coordinador"
                                        value={
                                            (!delegado && !coordinador) ||
                                            (delegado && !coordinador)
                                                ? "------"
                                                : coordinador.name
                                        }
                                    />
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Apellido Coordinador"
                                        className="input-doble info-coordinador"
                                        value={
                                            (!delegado && !coordinador) ||
                                            (delegado && !coordinador)
                                                ? "------"
                                                : coordinador.apellido
                                        }
                                    />
                                </div>
                                <div className="cont-inputs-doble">
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Nombre Delegado"
                                        className="input-doble info-delegado"
                                        value={
                                            !delegado && !coordinador
                                                ? "------"
                                                : delegado.name
                                        }
                                    />
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Apellido Delegado"
                                        className="input-doble info-delegado"
                                        value={
                                            !delegado && !coordinador
                                                ? "------"
                                                : delegado.apellido
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </form>
                    <div className="cont-img-edit">
                        <img
                            src="/images/Edit-bg.svg"
                            alt="logo_Foto"
                            className=""
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
