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

export function ChartLineDepart(dataChart) {
    const depart_id = dataChart.userData;

    const months = [];
    const performance = [];
    var total_votantes;

    dataChart.dataChart.map((departamento) => {
        if (departamento.dele_id === depart_id) {
            months.push(departamento.mes_ingreso);
            performance.push(parseInt(departamento.cantidad_votantes_por_mes));
            total_votantes = departamento.cantidad_votantes_total;
        }
    });

    const data = {
        labels: months,
        datasets: [
            {
                label: `# votos: ${total_votantes}`,
                data: performance,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

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

    return <Line options={options} data={data} />;
}
