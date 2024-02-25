import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabelMui from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        cedula: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="form-guest-register">
                <h4 className="title-guest">Inicio de sesion</h4>
                <div className="cont-inputs-doble">
                    <TextField
                        id="cedula"
                        label="Cedula"
                        type="number"
                        className="inputs-guest w-100"
                        value={data.cedula}
                        autoComplete="cedula"
                        onChange={(e) => setData("cedula", e.target.value)}
                        required
                    />

                    {/* <TextField
                        id="email"
                        label="Email"
                        type="email"
                        className="inputs-guest"
                        value={data.email}
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    /> */}
                </div>

                <div className="cont-inputs-doble">
                    {/* <TextField
                        id="password"
                        label="Password"
                        type="password"
                        className="inputs-guest w-100"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    /> */}
                    <FormControl variant="outlined" className="w-100">
                        <InputLabelMui htmlFor="outlined-adornment-password">
                            Password*
                        </InputLabelMui>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
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
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                    <Button
                        className="text-white fw-bold border-0 p-2 px-4 btn-submit w-50"
                        disabled={processing}
                        type="submit"
                    >
                        Iniciar sesion
                    </Button>

                    {/* <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton> */}
                </div>
            </form>
        </GuestLayout>
    );
}
