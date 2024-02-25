import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "left",
            labels: {
                color: "Black",
                font: {
                    size: 15,
                },
                padding: 5,
            },
        },
    },
};

export function ChartPie(dataChart) {
    console.log("DataChart: ", dataChart);
    console.log("User: ", dataChart.userData);
    const roleUser = dataChart.userData;
    var departamentoLabel = [];
    /*  dataChart.dataChart.map((item) => {
        departamentoLabel.push(item.nombre_departamento);
    }); */

    var departamentoVotos = [];
    dataChart.dataChart.map((item) => {
        if (roleUser === "Administrador") {
            departamentoLabel.push(item.nombre_departamento);
        } else if (roleUser === "Delegado") {
            departamentoLabel.push(item.nombre_distrito);
        } else if (roleUser === "Coordinador") {
            departamentoLabel.push(item.user_nombre);
        }
        departamentoVotos.push(item.cantidad_votantes);
    });
    console.log(departamentoLabel);
    console.log(departamentoVotos);
    const data = {
        labels: departamentoLabel,
        datasets: [
            {
                label: "# Votos",
                data: departamentoVotos,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut data={data} options={options} />;
}
