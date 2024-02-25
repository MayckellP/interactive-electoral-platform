import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ChartPieDistrito(dataChart) {
    console.log("DataChart: ", dataChart);
    console.log("User: ", dataChart.userData);
    const creador_id = dataChart.userData;
    var punteroLabel = [];
    var punteroVotos = [];
    var distrito_name;

    dataChart.dataChart.map((puntero) => {
        if (puntero.creador_id === creador_id) {
            punteroLabel.push(puntero.name);
            punteroVotos.push(puntero.total_votantes_por_punter);
            distrito_name = puntero.nombre_distrito;
        }
    });

    const data = {
        labels: punteroLabel,
        datasets: [
            {
                data: punteroVotos,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const empty_graphic = punteroVotos.reduce(
        (total, valor) => total + valor,
        0
    );
    console.log(empty_graphic);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "left",
                labels: {
                    color: "Black",
                    font: {
                        size: 10,
                    },
                    padding: 5,
                },
            },
            title: {
                display: true,
                text: `${distrito_name} - ${dataChart.coordinadorData}`,
                font: {
                    size: 12,
                },
            },
        },
    };
    return (
        <>
            {empty_graphic < 1 ? (
                <div className="graphic-none">
                    <Doughnut data={data} options={options} />
                </div>
            ) : (
                <div className="graphic-ok pe-1">
                    <Doughnut data={data} options={options} />
                </div>
            )}
        </>
    );
}
