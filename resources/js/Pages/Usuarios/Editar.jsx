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

export default function Crear({ auth, roles, user, userRole }) {
    const [roleSelect, setRoleSelect] = useState("");
    var [alertPassword, setAlertPassword] = useState("");

    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        apellido: user.apellido,
        cedula: user.cedula,
        nombre_departamento: user.nombre_departamento,
        nombre_distrito: user.nombre_distrito,
        direccion: user.direccion,
        telefono: user.telefono,
        password: "",
        password_confirmation: "",
        role: "",
    });

    const confirmPassword = (e) => {};

    const submit = (e) => {
        if (data.password !== data.password_confirmation) {
            setAlertPassword("Error");
        } else {
            setAlertPassword("");
        }

        console.log(data);
        e.preventDefault();
        if (data.role === "") {
            data.role = user.role;
        }
        put(route("usuarios.update", user.id));
    };

    {
        /* ---------------------------------------------------------------------FUNCTION TO SHOW USERS INFO */
    }
    const roleChange = (event) => {
        setRoleSelect(event.target.value);
    };
    const dataUser = document.getElementById("dataUser");

    return (
        <AuthenticatedLayout user={auth.user} header={"Edit users"}>
            <Head title="Users" />

            <div className="cont-global-users">
                <Link href={route("usuarios.index")} className="cont-btn-back">
                    <img
                        src="/images/Back-icon.svg"
                        alt="icon-back"
                        className="back-button"
                    />
                    <span className="back-text">Back</span>
                </Link>
                <Alert severity="success" className="mb-2 alert-edit">
                    <AlertTitle>
                        Asegurese de cambiar correctamente los datos.
                    </AlertTitle>
                </Alert>
                <div className="cont-user-edit">
                    <form onSubmit={submit} className="form-user-edit">
                        {/* ---------------------------------------------------------------------FORM TO EDIT USER */}
                        <h3 className="title"></h3>

                        <div className="cont-inputs-doble">
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble"
                                label="Nombre"
                                value={data.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble"
                                label="Apellido"
                                value={data.apellido}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="cont-inputs-doble">
                            <TextField
                                id="telefono"
                                label="Telefono"
                                type="text"
                                className="input-doble info-to-edit"
                                value={data.telefono}
                                onChange={(e) =>
                                    setData("telefono", e.target.value)
                                }
                                autoComplete="telefono"
                                //onChange={validatePhone}
                                required
                            />
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble"
                                label="Cédula"
                                value={data.cedula}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="cont-inputs-doble">
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble"
                                label="Departamento"
                                value={data.nombre_departamento}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                className="input-doble"
                                label="Distrito"
                                value={data.nombre_distrito}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>

                        <div className="cont-inputs-doble">
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                className="input-doble info-to-edit"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <TextField
                                id="password"
                                label="Password Confirmation"
                                type="password"
                                className="input-doble info-to-edit"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        {alertPassword && (
                            <Alert
                                severity="error"
                                className=" py-0 alert-edit mb-3 border-3 border-warning"
                            >
                                <AlertTitle>
                                    Las contraseñas no coinciden.
                                </AlertTitle>
                            </Alert>
                        )}

                        <Form.Select
                            type="select"
                            aria-label="Floating label select example"
                            className="input-doble w-100 mb-3 info-to-edit fw-bold p-3"
                            onChange={(e) => setData("role", e.target.value)}
                            placeholder="Role"
                            defaultValue={user.role}
                        >
                            {roles.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>

                        {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Roles
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={roleSelect}
                                onChange={roleChange}
                                label="Role"
                                className="input-doble w-100 mb-3 info-to-edit fw-bold"
                            >
                                {roles.map((item) => (
                                    <MenuItem key={item.id} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        <Button
                            type="submit"
                            className="text-white fw-bold border-0 p-2 px-4 btn-submit w-50"
                        >
                            Guardar cambios
                        </Button>
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
