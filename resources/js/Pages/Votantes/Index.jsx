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
import TableVotantes from "@/Components/TableVotantes";

export default function Index({
    auth,
    votantes,
    votantesCount,
    departamentos,
    distritos,
    cargador,
}) {
    const role = auth.user.role;
    const [departamentoName, setDepartamentoName] = useState(
        role === "Administrador" ? "" : auth.user.nombre_departamento
    );
    const [distritoName, setDistritoName] = useState(
        role !== "Puntero" && role !== "Encargado"
            ? ""
            : auth.user.nombre_distrito
    );
    const [cargadorName, setCargadorName] = useState("");

    const distritoSelect = useRef(null);

    const filterDepartamento = (event) => {
        setDepartamentoName(event.target.value);
    };

    const filterDistrito = (event) => {
        setDistritoName(event.target.value);
    };

    const filterEncargado = (event) => {
        setCargadorName(event.target.value);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        departamento:
            role === "Administrador" ? "" : auth.user.nombre_departamento,
        distrito:
            role !== "Puntero" && role !== "Encargado"
                ? ""
                : auth.user.nombre_distrito,
        cargador: "",
        cedula: "",
    });

    const submitSelect = (e) => {
        data.departamento = departamentoName;
        data.distrito = distritoName;
        data.cargador = cargadorName;
        console.log(data);
        e.preventDefault();
        post(route("filtroVotantes.store"));
    };

    const submitText = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("filtroVotantes.store"));
    };
    console.log(votantes);

    return (
        <AuthenticatedLayout user={auth.user} header={"Votantes"}>
            <Head title="Votantes" />

            <div className="cont-global-users">
                <Link href={route("votantes.create")} className="cont-btn-back">
                    <img
                        src="/images/Back-icon.svg"
                        alt="icon-back"
                        className="back-button"
                    />
                    <span className="back-text">Back</span>
                </Link>
                <div className="cont-filters-punteros">
                    {role !== "Puntero" && (
                        <form
                            onSubmit={submitSelect}
                            method="post"
                            className="cont-filter-select"
                        >
                            <Box
                                sx={{ minWidth: 300, maxWidth: 550 }}
                                className="mb-2 d-flex"
                            >
                                {role === "Administrador" && (
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Departamentos
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={departamentoName}
                                            label="Ingresado por"
                                            onChange={filterDepartamento}
                                        >
                                            {departamentos.map(
                                                (item, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                )}

                                {role !== "Puntero" && role !== "Encargado" && (
                                    <FormControl fullWidth className="ms-2">
                                        <InputLabel id="demo-simple-select-label">
                                            Distritos
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={distritoName}
                                            label="Ingresado por"
                                            onChange={filterDistrito}
                                            inputRef={distritoSelect}
                                        >
                                            {distritos.map(
                                                (item, index) =>
                                                    item.nombre_departamento ===
                                                        departamentoName && (
                                                        <MenuItem
                                                            key={index}
                                                            value={
                                                                item.nombre_distrito
                                                            }
                                                        >
                                                            {
                                                                item.nombre_distrito
                                                            }
                                                        </MenuItem>
                                                    )
                                            )}
                                        </Select>
                                    </FormControl>
                                )}

                                <FormControl fullWidth className="ms-2">
                                    <InputLabel id="demo-simple-select-label">
                                        Cargador
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={cargadorName}
                                        label="Ingresado por"
                                        onChange={filterEncargado}
                                        inputRef={distritoSelect}
                                    >
                                        {cargador.map(
                                            (item, index) =>
                                                item.nombre_distrito ===
                                                    distritoName && (
                                                    <MenuItem
                                                        key={index}
                                                        value={item.puntero}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                )
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button
                                type="submit"
                                className="text-white fw-bold border-0 p-1 btn-submit w-50"
                            >
                                <IconButton
                                    type="submit"
                                    sx={{ p: "1px" }}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                                Filtrar
                            </Button>
                        </form>
                    )}
                    <div className="cont-searcher-votantes">
                        <h2 className="subtitle">
                            <ContactPageIcon className="me-2" />
                            Cedula de votante
                        </h2>
                        <form
                            onSubmit={submitText}
                            method="post"
                            className="searcher"
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="095484652"
                                inputProps={{
                                    "aria-label": "search google maps",
                                }}
                                onChange={(e) =>
                                    setData("cedula", e.target.value)
                                }
                                value={data.cedula}
                            />

                            <InputError
                                message={errors.cedula}
                                className="mt-2"
                            />

                            <IconButton
                                type="submit"
                                sx={{ p: "1px" }}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </form>
                    </div>
                </div>

                <div className="cont-votantes-table">
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

                    <Link
                        href={route("votantes.show", "PDF_total")}
                        as="button"
                    >
                        <Button className="text-white fw-bold border-0 p-1 px-2 fs-md bg-primary me-2 ">
                            Descargar como PDF
                        </Button>
                    </Link>

                    <Link
                        href={route("votantes.show", "EXCEL_total")}
                        as="button"
                    >
                        <Button className="text-white fw-bold border-0 p-1 px-2 fs-md bg-success">
                            Descargar como Excel
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
