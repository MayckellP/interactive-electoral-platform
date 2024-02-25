import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import InputError from "@/Components/InputError";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import { Skeleton, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import clipboardCopy from "clipboard-copy";
import { Button } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Crear({
    auth,
    roles,
    consultaDB,
    repeatAlert,
    noDataAlert,
}) {
    var [dataInput] = useState([]);
    const [role, setRole] = useState("");
    const [alertPassword, setAlertPassword] = useState("");
    const [copied, setCopied] = useState("");

    const handleChange = (event) => {
        setRole(event.target.value);
        setData("role", event.target.value);
    };

    const copyFunction = () => {
        const infoToCopy = `Credenciales de ${consultaDB[0].nombre} ${consultaDB[0].apellido}: \nCedula: ${consultaDB[0].cedula} \nPassword: ${data.password}`;
        clipboardCopy(infoToCopy);
        setCopied("Copied ");
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        apellido: "",
        cedula: "",
        role: "",
        departamento: "",
        nombre_departamento: "",
        distrito: "",
        nombre_distrito: "",
        creador_id: auth.user.id,
        direccion: "",
        telefono: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        data.name = consultaDB[0].nombre;
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

        if (data.password !== data.password_confirmation) {
            setAlertPassword("Error");
        } else {
            setAlertPassword("");
        }

        console.log(data);
        e.preventDefault();
        post(route("usuarios.store"));
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

    const rolesToAdmin = roles.map((item) => (
        <MenuItem key={item.id} value={item.name}>
            {item.name}
        </MenuItem>
    ));

    const rolesToCoordi = roles.map(
        (item) =>
            item.name !== "Administrador" &&
            item.name !== "Delegado" && (
                <MenuItem key={item.id} value={item.name}>
                    {item.name}
                </MenuItem>
            )
    );

    const rolesToPuntero = roles.map(
        (item) =>
            item.name !== "Administrador" &&
            item.name !== "Delegado" &&
            item.name !== "Coordinador" && (
                <MenuItem key={item.id} value={item.name}>
                    {item.name}
                </MenuItem>
            )
    );

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

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Usuarios">
            <Head title="Usuarios" />

            <Link href={route("usuarios.index")} className="cont-btn-back">
                <img
                    src="/images/Back-icon.svg"
                    alt="icon-back"
                    className="back-button"
                />
                <span className="back-text">Back</span>
            </Link>
            <div className="cont-new-invitado-user">
                <h3 className="title">
                    <DataSaverOnIcon className="icon" /> Agregar nuevo usuario
                </h3>
                <div className="cont-form-result">
                    <div className="cont-form">
                        <div className="cont-searcher">
                            <div className="subtitle  d-flex flex-col">
                                <span className="title-input">
                                    Ingrese el numero de cedula
                                </span>
                                {noDataAlert && (
                                    <span className="alert alert-danger p-0 text-center w-50">
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
                        <h3 className="subtitle mb-2 d-flex justify-content-between align-items-center">
                            Nuevos datos por ingresar
                            {data.password &&
                                data.password ===
                                    data.password_confirmation && (
                                    <Button
                                        className="cont-portapapeles bg-dark-subtle text-dark rounded-5 d-flex"
                                        onClick={copyFunction}
                                    >
                                        {copied && (
                                            <p className="text-sm fw-normal me-2">
                                                {copied}
                                            </p>
                                        )}
                                        <ContentCopyIcon className="fs-5" />
                                    </Button>
                                )}
                        </h3>
                        {repeatAlert > 0 ? (
                            <Alert severity="error">
                                No se pueden cargar datos duplicados.
                            </Alert>
                        ) : (
                            ""
                        )}

                        <form
                            onSubmit={submit}
                            className="form-votante"
                            method="post"
                        >
                            <div className="cont-new-data-user">
                                {/* <TextField
                                    id="telefono"
                                    label="Telefono"
                                    type="text"
                                    className="rounded-2 bg-white border-0 shadow-none text-black input-new-data-user"
                                    value={data.telefono}
                                    autoComplete="telefono"
                                    onChange={validatePhone}
                                    onChange={(e) =>
                                        setData("telefono", e.target.value)
                                    }
                                    required
                                /> */}
                                <TextField
                                    label="Celular"
                                    id="outlined-start-adornment"
                                    className="rounded-2 bg-white border-0 shadow-none text-black input-new-data-user"
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

                                <div className="input-new-data-user">
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            className="rounded-2  border-0"
                                        >
                                            Role
                                        </InputLabel>
                                        <Select
                                            className="rounded-2 bg-white border-0 shadow-none text-black"
                                            value={role}
                                            label="Role"
                                            onChange={handleChange}
                                            required
                                        >
                                            {auth.user.role === "Administrador"
                                                ? rolesToAdmin
                                                : auth.user.role ===
                                                  "Coordinador"
                                                ? rolesToCoordi
                                                : rolesToPuntero}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="cont-inputs-doble mt-3">
                                {/* <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    className="inputs-guest"
                                    value={data.password}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                /> */}
                                <FormControl
                                    variant="outlined"
                                    className="inputs-guest"
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password*
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                </FormControl>
                                {/* <TextField
                                    id="password_confirmation"
                                    label="Confirm Password"
                                    type="password"
                                    className="inputs-guest"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                /> */}
                                <FormControl
                                    variant="outlined"
                                    className="inputs-guest"
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password*
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </FormControl>
                            </div>

                            {consultaDB !== undefined &&
                            consultaDB.length > 0 &&
                            repeatAlert === 0 ? (
                                <button
                                    type="submit"
                                    className="btn-submit rounded-0 w-50"
                                >
                                    Crear usuario
                                </button>
                            ) : null}
                            {alertPassword ? (
                                <Alert
                                    severity="error"
                                    className=" py-0 alert-edit mb-3 border-3 border-warning"
                                >
                                    <AlertTitle>
                                        Las contraseñas no coinciden.
                                    </AlertTitle>
                                </Alert>
                            ) : (
                                <img
                                    src="/images/ImageUsers.svg"
                                    alt="logo_Foto"
                                    className="form-foto-user"
                                />
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
