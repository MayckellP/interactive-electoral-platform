import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";

import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            telefono: "",
        });

    const submit = (e) => {
        data.telefono = "09" + data.telefono;

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="fw-bold">
                    <PhonelinkSetupIcon /> Cambio de Numero de telefono
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Tienes un nuevo numero de telefono? Ingresalo aqui.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
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
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        disabled={processing}
                        className="text-white fw-bold border-0 p-2 px-4 btn-submit w-50"
                        type="submit"
                    >
                        Guardar
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-800">
                            Guardado!.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
