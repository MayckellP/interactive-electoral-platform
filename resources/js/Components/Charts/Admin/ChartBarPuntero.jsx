import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function ChartBarPuntero(dataChart) {
    const month = [];

    const performance = [];
    var monthlyPerformance = 0;

    dataChart.dataChart.map((item) => {
        month.push(item.mes);
        performance.push(parseInt(item.cantidad_votantes_ingresados));
    });
    const options = {
        scales: {
            y: {
                max: 100, // Establece el valor máximo del eje y
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
                text: "Chart.js Line Chart",
            },
        },
    };

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const lineaA = [100, 520, 200, 600, 1200, 1000, 1100];

    console.log(month);
    console.log(performance);

    const data = {
        labels: month,
        datasets: [
            {
                label: "# Votantes",
                data: performance,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    console.log("rendimiento: ", dataChart.dataChart);
    return <Bar options={options} data={data} />;
}
