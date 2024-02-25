import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function ChartLine(dataChart) {
    const months = [];

    const performance = [];

    dataChart.dataChart.map((item) => {
        months.push(item.mes);
        performance.push(parseInt(item.cantidad_votantes_ingresados));
    });

    const options = {
        scales: {
            y: {
                max: 10, // Establece el valor máximo del eje y
                beginAtZero: true, // Comienza el eje y desde cero
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "",
            },
        },
    };

    const data = {
        labels: months,
        datasets: [
            {
                label: "# Votantes",
                data: performance,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return <Line options={options} data={data} />;
}
