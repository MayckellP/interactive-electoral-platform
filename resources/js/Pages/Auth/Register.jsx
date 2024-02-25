import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        apellido: "",
        cedula: "",
        direccion: "",
        telefono: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="form-guest-register">
                <h4 className="title-guest">Nueva cuenta</h4>
                <div className="cont-inputs-doble">
                    <TextField
                        id="name"
                        label="Nombre"
                        type="text"
                        className="inputs-guest"
                        value={data.name}
                        isFocused={true}
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <TextField
                        id="apellido"
                        label="Apellido"
                        type="text"
                        className="inputs-guest"
                        value={data.apellido}
                        autoComplete="apellido"
                        onChange={(e) => setData("apellido", e.target.value)}
                        required
                    />
                </div>

                <div className="cont-inputs-doble">
                    <TextField
                        id="cedula"
                        label="Cedula"
                        type="text"
                        className="inputs-guest"
                        value={data.cedula}
                        autoComplete="cedula"
                        onChange={(e) => setData("cedula", e.target.value)}
                        required
                    />
                    <TextField
                        id="telefono"
                        label="Telefono"
                        type="text"
                        className="inputs-guest"
                        value={data.telefono}
                        autoComplete="telefono"
                        onChange={(e) => setData("telefono", e.target.value)}
                        required
                    />
                </div>

                <div className="cont-inputs-doble">
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        className="inputs-guest-email"
                        value={data.email}
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                </div>

                <div className="cont-inputs-doble">
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        className="inputs-guest"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <TextField
                        id="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        className="inputs-guest"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-md text-dark-600 dark:text-gray-800 hover:text-gray-200 dark:hover:text-red-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 me-3"
                    >
                        Already registered?
                    </Link>

                    <Button
                        className="text-white fw-bold border-0 p-2 px-4 btn-submit w-25"
                        disabled={processing}
                        type="submit"
                    >
                        Registrar
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
