import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Button from "react-bootstrap/Button";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Skeleton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export default function Crear({
    auth,
    consultaDB,
    repeatAlert,
    noDataAlert,
    votantesCount,
}) {
    var [dataInput] = useState("");
    const dataFilterInput = useRef();

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        apellido: "",
        telefono: "",
        cedula: "",
        direccion: "",
        departamento: "",
        nombre_departamento: "",
        distrito: "",
        nombre_distrito: "",
        puntero: auth.user.id,
    });

    const submit = (e) => {
        data.nombre = consultaDB[0].nombre;
        data.apellido = consultaDB[0].apellido;
        data.cedula = consultaDB[0].cedula;
        data.telefono = "09" + data.telefono;
        if (consultaDB[0].direccion === "") {
            data.direccion = "Sin direccion";
        } else {
            data.direccion = consultaDB[0].direccion;
        }
        data.departamento = consultaDB[0].depart;
        data.nombre_departamento = consultaDB[0].ndepart;
        data.distrito = consultaDB[0].distrito;
        data.nombre_distrito = consultaDB[0].ndistrito;
        console.log(data);
        e.preventDefault();
        post(route("votantes.store"));
    };

    const validatePhone = (e) => {
        const regex = /^[0-9]+$/;
        if (regex.test(e.target.value)) {
            setData("telefono", e.target.value);
        } else {
            setData("telefono", " ");
        }
    };

    const submitToSearch = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("consulta.store"));
    };

    const submitSearch = useRef(null);

    const automaticSubmit = () => {
        submitSearch.current.click();
    };

    if (consultaDB !== undefined) {
        if (consultaDB.length > 0) {
            console.log("se cumple");
            const myFilter = (
                <div className="cont-result">
                    <div className="cedula">
                        <TextField
                            id="outlined-read-only-input"
                            label="Nombre"
                            value={consultaDB[0].nombre}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Apellido"
                            value={consultaDB[0].apellido}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="correo">
                        <TextField
                            id="outlined-read-only-input"
                            label="Descripción"
                            value={consultaDB[0].ndistrito}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="dni-sex">
                        <TextField
                            id="outlined-read-only-input"
                            label="Cédula"
                            value={consultaDB[0].cedula}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Sexo"
                            value={
                                consultaDB[0].sexo === "F"
                                    ? "FEMENINO"
                                    : "MASCULINO"
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="direccion">
                        <TextField
                            id="outlined-read-only-input"
                            label="Dirección"
                            defaultValue={consultaDB[0].direccion}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </div>
            );
            dataInput = myFilter;
        }
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Votantes">
            <Head title="Votantes" />

            <div className="cont-top-votantes">
                <div className="cont-details-votantes">
                    <h3 className="quantity">{votantesCount}</h3>
                    <span className="text">Votantes ...</span>
                </div>
                <div className="register-visitantes">
                    <Link href={route("votantes.index")} className="link">
                        <div className="btn">
                            Ver mis votantes
                            <ArrowCircleRightIcon />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="cont-new-invitado">
                <h3 className="title">
                    <DataSaverOnIcon className="icon" /> Agregar Votante
                </h3>
                <div className="cont-form-result">
                    <div className="cont-form">
                        <div className="cont-searcher">
                            <div className="subtitle  d-flex flex-col">
                                <span className="title-input">
                                    Ingrese el numero de cedula
                                </span>

                                {noDataAlert && (
                                    <span className="alert alert-danger p-0 text-center">
                                        No hay dato
                                    </span>
                                )}
                            </div>
                            <form
                                onSubmit={submitToSearch}
                                method="post"
                                className="searcher"
                            >
                                <InputBase
                                    inputRef={dataFilterInput}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="95963124"
                                    inputProps={{
                                        "aria-label": "search google maps",
                                    }}
                                    value={data.cedula}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 7) {
                                            setData("cedula", e.target.value);
                                            if (e.target.value.length > 6) {
                                                console.log(data.cedula);
                                                setTimeout(() => {
                                                    automaticSubmit();
                                                }, 100);
                                            }
                                        }
                                    }}
                                />

                                <InputError
                                    message={errors.cedula}
                                    className="mt-2"
                                />

                                <IconButton
                                    type="submit"
                                    sx={{ p: "1px" }}
                                    aria-label="search"
                                    ref={submitSearch}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </form>
                        </div>
                        {consultaDB === undefined || !consultaDB.length ? (
                            <div className="cont-result">
                                <div className="cedula">
                                    <Skeleton variant="rounded" />
                                    <Skeleton variant="rounded" />
                                </div>

                                <div className="correo">
                                    <Skeleton variant="rounded" />
                                </div>

                                <div className="dni-sex">
                                    <Skeleton variant="rounded" />
                                    <Skeleton variant="rounded" />
                                </div>

                                <div className="direccion">
                                    <Skeleton variant="rounded" />
                                </div>
                            </div>
                        ) : (
                            dataInput
                        )}
                    </div>
                    <div className="cont-new-data">
                        <h3 className="subtitle mb-2">
                            Nuevos datos por ingresar
                        </h3>
                        {repeatAlert > 0 ? (
                            <span className="alert alert-danger p-1">
                                No se pueden cargar datos duplicados.
                            </span>
                        ) : (
                            ""
                        )}

                        <form
                            onSubmit={submit}
                            className="form-votante"
                            method="post"
                        >
                            <TextField
                                label="Celular"
                                id="outlined-start-adornment"
                                className="rounded-2 bg-white border-0 shadow-none text-black input-number"
                                //sx={{ m: 1, width: "25ch" }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            09
                                        </InputAdornment>
                                    ),
                                }}
                                value={data.telefono}
                                autoComplete="telefono"
                                //onChange={validatePhone}
                                onChange={(e) => {
                                    if (e.target.value.length <= 8) {
                                        setData("telefono", e.target.value);
                                    }
                                }}
                                required
                            />

                            {consultaDB !== undefined &&
                            consultaDB.length > 0 &&
                            repeatAlert === 0 ? (
                                <button type="submit" className="btn-submit">
                                    Agregar
                                </button>
                            ) : null}
                            <img
                                src="/images/Graphic.svg"
                                alt="logo_Foto"
                                className="form-foto"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
