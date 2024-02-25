import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import { Skeleton, TextField } from "@mui/material";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";

export default function ConsultPage({ auth, consultaDB }) {
    //const [filterData, setFilterData] = useState();
    var [dataInput] = useState("");
    var [alertNoData] = useState("");
    const [dataFiltered, setDataFiltered] = useState(consultaDB);

    const dataFilterInput = useRef();
    const { data, setData, post, processing, errors, reset } = useForm({
        cedula: "",
    });

    console.log(consultaDB);
    if (consultaDB === undefined || !consultaDB.length) {
        console.log("nada");
    } else {
        console.log("datos");

        const myFilter = (
            <div className="cont-result">
                <div className="row-doble">
                    <TextField
                        id="outlined-read-only-input"
                        label="Nombre"
                        value={
                            consultaDB[0].nombre + " " + consultaDB[0].apellido
                        }
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />

                    <TextField
                        id="prueeeba"
                        label="Departamento"
                        value={consultaDB[0].ndepart}
                        InputProps={{
                            readOnly: true,
                            fullWidth: true,
                        }}
                        className="row-doble-input"
                    />
                </div>

                <div className="row-doble">
                    <TextField
                        id="outlined-read-only-input"
                        label="Distrito"
                        value={consultaDB[0].ndistrito}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Zona"
                        value={consultaDB[0].descripcio}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />
                </div>

                <div className="row-doble">
                    <TextField
                        id="outlined-read-only-input"
                        label="Local"
                        value={consultaDB[0].nombre_loc}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />

                    <div className="subRow-doble">
                        <TextField
                            id="outlined-read-only-input"
                            label="Mesa"
                            value={consultaDB[0].mesa}
                            InputProps={{
                                readOnly: true,
                            }}
                            className="subRow-doble-input"
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Orden"
                            value={consultaDB[0].orden}
                            InputProps={{
                                readOnly: true,
                            }}
                            className="subRow-doble-input"
                        />
                    </div>
                </div>

                <div className="row-doble">
                    <TextField
                        id="outlined-read-only-input"
                        label="Seccion"
                        value={consultaDB[0].codigo_sec}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Nombre Seccion"
                        value={consultaDB[0].nombre_sec}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />
                </div>

                <div className="row-doble">
                    <div className="cont-check-consult">
                        <span>Nov 2015</span>
                        <div className="cont-img-check">
                            <img
                                src={
                                    consultaDB[0].v_nov_2015 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    consultaDB[0].v_nov_2015 === " "
                                        ? "d-none"
                                        : "img-check-consult"
                                }
                            />
                        </div>
                    </div>
                    <div className="cont-check-consult">
                        <span>Dic 2017</span>
                        <div className="cont-img-check">
                            <img
                                src={
                                    consultaDB[0].v_dic_2017 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    consultaDB[0].v_dic_2017 === " "
                                        ? "d-none"
                                        : "img-check-consult"
                                }
                            />
                        </div>
                    </div>
                    <div className="cont-check-consult">
                        <span>Dic 2018</span>
                        <div className="cont-img-check">
                            <img
                                src={
                                    consultaDB[0].v_dic_2018 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    consultaDB[0].v_dic_2018 === " "
                                        ? "d-none"
                                        : "img-check-consult"
                                }
                            />
                        </div>
                    </div>
                    <div className="cont-check-consult">
                        <span>Jun 2021</span>
                        <div className="cont-img-check">
                            <img
                                src={
                                    consultaDB[0].v_jun_2021 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    consultaDB[0].v_jun_2021 === " "
                                        ? "d-none"
                                        : "img-check-consult"
                                }
                            />
                        </div>
                    </div>
                    <div className="cont-check-consult">
                        <span>Oct 2021</span>
                        <div className="cont-img-check">
                            <img
                                src={
                                    consultaDB[0].v_oct_2021 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    consultaDB[0].v_oct_2021 === " "
                                        ? "d-none"
                                        : "img-check-consult"
                                }
                            />
                        </div>
                    </div>
                    <div className="cont-check-consult">
                        <span>Dic 2021</span>
                        <div className="cont-img-check">
                            <img
                                src={
                                    consultaDB[0].v_dic_2021 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    consultaDB[0].v_dic_2021 === " "
                                        ? "d-none"
                                        : "img-check-consult"
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
        //setDataInput(myFilter);
        dataInput = myFilter;
    }

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("consulta.store"));
    };
    const submitSearch = useRef(null);

    const automaticSubmit = () => {
        submitSearch.current.click();
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Consulta de padron">
            <Head title="Consulta" />

            <div className="cont-gen">
                <div className="cont-consulta-padron">
                    <h3 className="title">
                        <PersonSearchIcon className="icon" /> Consulta de padron
                    </h3>
                    <div className="cont-form-result w-100">
                        <div className="cont-form w-100">
                            <div className="cont-searcher d-flex flex-col justify-content-center pb-1">
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    className="searcher w-75 mb-0"
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
                                                setData(
                                                    "cedula",
                                                    e.target.value
                                                );
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
                            {alertNoData}
                            {consultaDB === undefined || !consultaDB.length ? (
                                <div className="cont-result">
                                    <div className="cedula">
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                    </div>

                                    <div className="cedula">
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                    </div>

                                    <div className="dni-sex mb-1">
                                        <Skeleton variant="rounded" />
                                        <div className="cedula">
                                            <Skeleton variant="rounded" />
                                            <Skeleton variant="rounded" />
                                        </div>
                                    </div>

                                    <div className="cedula">
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                    </div>

                                    <div className="check-boxes">
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                        <Skeleton variant="rounded" />
                                    </div>
                                </div>
                            ) : (
                                dataInput
                            )}
                        </div>
                    </div>
                    <img
                        src="/images/Consult.svg"
                        alt="logo_Foto"
                        className="consult-foto"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
