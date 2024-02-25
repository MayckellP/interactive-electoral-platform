import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useRef, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import { Skeleton, TextField } from "@mui/material";

export default function ConsultPage({ auth, consultaDB }) {
    const [filterData, setFilterData] = useState("");
    const [dataInput, setDataInput] = useState([]);
    const [alertNoData, setAlertNoData] = useState("");
    const [dataFiltered, setDataFiltered] = useState([]);

    const dataFilterInput = useRef();

    const filerButton = () => {
        const dataFilter = dataFilterInput.current.value;
        setFilterData(dataFilter);

        const myData = consultaDB.filter((item) => item.cedula == dataFilter);
        console.log(dataFilter);

        const myFilter = myData.map((item) => (
            <div className="cont-result" key={item.id}>
                <div className="row-doble">
                    <TextField
                        id="outlined-read-only-input"
                        label="Nombre"
                        value={item.nombre + " " + item.apellido}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />

                    <TextField
                        id="prueeeba"
                        label="Departamento"
                        value={item.ndepart}
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
                        value={item.ndistrito}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Zona"
                        value={item.descripcio}
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
                        value={item.nombre_loc}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />

                    <div className="subRow-doble">
                        <TextField
                            id="outlined-read-only-input"
                            label="Mesa"
                            value={item.mesa}
                            InputProps={{
                                readOnly: true,
                            }}
                            className="subRow-doble-input"
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Orden"
                            value={item.orden}
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
                        value={item.codigo_sec}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="row-doble-input"
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Nombre Seccion"
                        value={item.nombre_sec}
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
                                    item.v_nov_2015 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    item.v_nov_2015 === " "
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
                                    item.v_dic_2017 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    item.v_dic_2017 === " "
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
                                    item.v_dic_2018 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    item.v_dic_2018 === " "
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
                                    item.v_jun_2021 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    item.v_jun_2021 === " "
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
                                    item.v_oct_2021 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    item.v_oct_2021 === " "
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
                                    item.v_dic_2021 == "S"
                                        ? "/images/Check.svg"
                                        : "/images/NoCheck.svg"
                                }
                                alt="logo_Foto"
                                className={
                                    item.v_dic_2021 === " "
                                        ? "d-none"
                                        : "img-check-consult"
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        ));
        setDataFiltered(myFilter);
        setDataInput(myData);

        console.log(myFilter);
        if (myFilter.length > 0) {
            setAlertNoData(false);
            console.log("falso");
        } else {
            setAlertNoData(true);
            console.log("verdadero");
        }
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
                                <div className="searcher w-75 mb-0">
                                    <InputBase
                                        inputRef={dataFilterInput}
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="95963124"
                                        inputProps={{
                                            "aria-label": "search google maps",
                                        }}
                                    />
                                    <IconButton
                                        type="button"
                                        sx={{ p: "1px" }}
                                        aria-label="search"
                                        onClick={filerButton}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                            </div>
                            {alertNoData && (
                                <Alert
                                    severity="info"
                                    className="w-100 m-auto mb-0 py-0"
                                >
                                    No hay datos por mostrar
                                </Alert>
                            )}
                            {dataFiltered.length < 1 ? (
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
                                dataFiltered
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
