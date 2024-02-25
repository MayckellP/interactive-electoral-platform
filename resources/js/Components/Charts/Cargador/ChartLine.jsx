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

export const options = {
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const lineaA = [100, 520, 200, 600, 1200, 1000, 1100];

const lineB = [200, 320, 500, 200, 1000, 800, 1200];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: lineaA,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: lineB,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export function ChartLine() {
    return <Line options={options} data={data} />;
}
