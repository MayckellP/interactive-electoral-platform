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

export function ChartBarDistrito(dataChart) {
    const creador_id = dataChart.userData;
    var distritos = [];

    const total_votantes = [];
    const distrito_id = [];
    const total_votantes_por_distrito = [];
    const nombre_distritos = [];

    dataChart.dataChart.map((delegado) => {
        if (delegado.delegado_id === creador_id) {
            distritos.push(delegado.coordinador_nombre_distrito);
            total_votantes.push(parseInt(delegado.total_votantes_por_puntero));
            distrito_id.push(parseInt(delegado.coordinador_distrito));
        }
    });

    for (let i = 0; i < distrito_id.length; i++) {
        const distrito = distrito_id[i];
        const votantes = total_votantes[i];
        const distrito_name = distritos[i];

        if (total_votantes_por_distrito.hasOwnProperty(distrito)) {
            total_votantes_por_distrito[distrito] += votantes;
            nombre_distritos[distrito] = distrito_name;
        } else {
            total_votantes_por_distrito[distrito] = votantes;
            nombre_distritos[distrito] = distrito_name;
        }
    }

    const resultado_final = Object.values(total_votantes_por_distrito);

    const resultado_final_nombres = Object.values(nombre_distritos);

    const data = {
        labels: resultado_final_nombres,
        datasets: [
            {
                label: "# Votantes por Distrito",
                data: resultado_final,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                max: 5, // Establece el valor máximo del eje y
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
    return <Bar options={options} data={data} />;
}
