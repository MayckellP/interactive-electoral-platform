import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChartLineDepart } from "@/Components/Charts/Admin/ChartLineDepart";
import { ChartPieDistrito } from "@/Components/Charts/Admin/ChartPieDistrito";
import { ChartBarDistrito } from "@/Components/Charts/Admin/ChartBarDistrito";
import TableDistritoDialog from "@/Components/TableDistritoDialog";

export default function GraphicsDetail({
    auth,
    chartLeft,
    delegados,
    coordinadores,
    punteros,
    general_graphics,
}) {
    const chartLeft_dele = [];
    console.log("GENERAL: ", chartLeft);
    console.log(delegados);
    console.log(coordinadores);
    console.log(punteros);
    return (
        <AuthenticatedLayout user={auth.user} header="Detalles de Graficas">
            <Head title="GraphicsDetail" />

            <Link href={route("dashboard")} className="cont-btn-back">
                <img
                    src="/images/Back-icon.svg"
                    alt="icon-back"
                    className="back-button"
                />
                <span className="back-text">Back</span>
            </Link>
            <div className="cont-graphic">
                {delegados.map((departamento, index) => (
                    <div className="cont-dept-graphic">
                        <h3 className="title-dept-graphic">
                            {departamento.nombre_departamento}
                            <span className="name"> {departamento.name}</span>
                        </h3>
                        <div className="cont-top-graphic">
                            <div className="graphic-total-votes">
                                <ChartLineDepart
                                    dataChart={chartLeft}
                                    userData={departamento.id}
                                />
                            </div>
                            <div className="graphic-total-distritos">
                                <ChartBarDistrito
                                    dataChart={general_graphics}
                                    userData={departamento.id}
                                    coordinadorData={punteros}
                                />
                            </div>
                        </div>
                        <div className="cont-bot-graphic">
                            {coordinadores.map((distrito, index) => {
                                if (distrito.creador_id === departamento.id) {
                                    return (
                                        <div
                                            className="cont-distrito-unique p-1"
                                            key={index}
                                        >
                                            <ChartPieDistrito
                                                dataChart={punteros}
                                                userData={distrito.id}
                                                coordinadorData={distrito.name}
                                            />
                                            <TableDistritoDialog
                                                dataDistrito={punteros}
                                                userData={distrito.id}
                                                coordinadorData={distrito.name}
                                            />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
