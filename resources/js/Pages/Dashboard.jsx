import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import { ChartPie } from "@/Components/Charts/Admin/ChartPie";
import { ChartLine } from "@/Components/Charts/Admin/ChartLine";
import { ChartBarPuntero } from "@/Components/Charts/Admin/ChartBarPuntero";

export default function Dashboard({
    auth,
    votantes,
    userQuantity,
    votantesPorDepartamento,
    votantesPorDistrito,
    cargadoresPorEncargado,
    votantesPorPuntero,
    quantityVotantes,
    quantityCargadores,
    quantityEncargados,
    chartLeft,
}) {
    console.log(chartLeft);
    var chartPie = [];
    var votantesQuantity;
    var encargadosQuantity;
    var cagadoresQuantity;
    if (auth.user.role === "Administrador") {
        chartPie = votantesPorDepartamento;
        votantesQuantity = chartPie.reduce(
            (acumulador, objeto) =>
                acumulador + parseInt(objeto.cantidad_votantes),
            0
        );
    } else if (auth.user.role === "Delegado") {
        chartPie = votantesPorDistrito;
        votantesQuantity = chartPie.reduce(
            (acumulador, objeto) =>
                acumulador + parseInt(objeto.cantidad_votantes),
            0
        );
        encargadosQuantity = cargadoresPorEncargado.length;
        cagadoresQuantity = quantityCargadores;
    } else if (auth.user.role === "Coordinador") {
        chartPie = cargadoresPorEncargado;
        votantesQuantity = chartPie.reduce(
            (acumulador, objeto) => acumulador + objeto.cantidad_votantes,
            0
        );
        cagadoresQuantity = cargadoresPorEncargado.length;
    } else if (auth.user.role === "Puntero") {
        chartPie = votantesPorPuntero;
        votantesQuantity = quantityVotantes;
    }

    console.log("Grafico nuevo: ", votantesPorPuntero);
    const misVotantes = votantes.map((item, index) => (
        <tr key={index}>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.cedula}</td>
            <td>{item.telefono}</td>
            <td>{item.direccion}</td>
            <td>{item.distrito}</td>
        </tr>
    ));
    return (
        <AuthenticatedLayout user={auth.user} header="Panel de control">
            <Head title="Dashboard" />

            <div className="cont-top-dash">
                <div className="cont-top-right">
                    {auth.user.role === "Administrador" && (
                        <div className="cont-coordinadores">
                            <h3 className="title">Delegado</h3>
                            <span className="quantity">
                                {userQuantity.map(
                                    (item) =>
                                        item.role === "Delegado" &&
                                        item.cantidad_users
                                )}
                            </span>
                        </div>
                    )}

                    {(auth.user.role === "Administrador" ||
                        auth.user.role === "Delegado") && (
                        <div className="cont-encargados">
                            <h3 className="title">Coordinador</h3>
                            <span className="quantity">
                                {auth.user.role === "Administrador"
                                    ? userQuantity.map(
                                          (item) =>
                                              item.role === "Coordinador" &&
                                              item.cantidad_users
                                      )
                                    : encargadosQuantity}
                            </span>
                        </div>
                    )}
                </div>

                <div className="cont-top-left">
                    {(auth.user.role === "Administrador" ||
                        auth.user.role === "Delegado" ||
                        auth.user.role === "Coordinador") && (
                        <div className="cont-cargador">
                            <h3 className="title">Puntero</h3>
                            <span className="quantity">
                                {auth.user.role === "Administrador"
                                    ? userQuantity.map(
                                          (item) =>
                                              item.role === "Puntero" &&
                                              item.cantidad_users
                                      )
                                    : cagadoresQuantity}
                            </span>
                        </div>
                    )}

                    <div className="cont-votantes">
                        <h3 className="title">Votantes</h3>
                        <span className="quantity">{votantesQuantity}</span>
                    </div>
                </div>
            </div>

            <div className="cont-mid-dash">
                <div className="cont-chart-line">
                    <ChartLine
                        dataChart={chartLeft}
                        userData={auth.user.role}
                    />
                </div>
                {chartPie.length < 1 ? (
                    <div className="cont-chart-line">
                        <h4 className="graphic-empty-text">Graphic empty</h4>
                        <img
                            src="/images/graphic-empty.svg"
                            alt="icon-back"
                            className="graphic-empty"
                        />
                    </div>
                ) : auth.user.role === "Puntero" ? (
                    <div className="cont-chart-line">
                        <ChartBarPuntero dataChart={chartPie} />
                    </div>
                ) : (
                    <div className="cont-chart-pie">
                        <Link
                            href={route("graphics.show", "details")}
                            className="link"
                        >
                            <div className="btn">Mas detalles...</div>
                        </Link>
                        <ChartPie
                            dataChart={chartPie}
                            userData={auth.user.role}
                        />
                    </div>
                )}
            </div>

            <div className="cont-bot-dash">
                <div className="register">
                    <div className="table">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>cedula</th>
                                    <th>telefono</th>
                                    <th>direccion</th>
                                    <th>distrito</th>
                                </tr>
                            </thead>
                            <tbody>{misVotantes}</tbody>
                        </Table>
                    </div>
                    <Link href={route("votantes.index")} className="link">
                        <div className="btn">Ver todos los votantes</div>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
