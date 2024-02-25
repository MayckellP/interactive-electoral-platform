import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Skeleton, TextField } from "@mui/material";

export default function Votantes({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Votantes">
            <Head title="Votantes" />

            <div className="cont-top-votantes">
                <div className="cont-details-votantes">
                    <h3 className="quantity">150</h3>
                    <span className="text">clientes ...</span>
                </div>
                <div className="register-visitantes">
                    <Link href="#" method="post" className="link">
                        <div className="btn">
                            Ver mis votantes
                            <ArrowCircleRightIcon />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="cont-new-invitado">
                <h3 className="title">
                    <DataSaverOnIcon className="icon" /> Agregar usuario
                </h3>
                <div className="cont-form-result">
                    <div className="cont-form">
                        <div className="cont-searcher">
                            <span className="subtitle">
                                Ingrese el numero de cedula
                            </span>
                            <div className="searcher">
                                <InputBase
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
                                >
                                    <SearchIcon />
                                </IconButton>
                            </div>
                        </div>
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
                    </div>
                    <div className="cont-new-data">
                        <h3 className="subtitle">Nuevos datos por ingresar</h3>
                        <form action="" method="post" className="form-votante">
                            <TextField
                                id="outlined-basic"
                                label="Numero"
                                variant="outlined"
                                className="input-number"
                            />
                            <button type="submit" className="btn-submit">
                                Agregar
                            </button>

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
