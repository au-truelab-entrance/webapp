"use client";

import React from "react";
import { Chart } from "react-google-charts";

type GraphData = [
    Date | string,
    number | string,
    number | string,
    number | string,
    number | string,
][];

function generateGraph(): GraphData {
    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    const dataForGraph: GraphData = [
        ["Time", "Year 1", "Year 2", "Year 3", "Year 4"],
    ];
    const startDate: Date = new Date();
    startDate.setHours(9, 0, 0, 0);

    const endDate: Date = new Date();
    endDate.setHours(20, 30, 0, 0);
    const currentTime: Date = new Date(startDate);

    while (currentTime <= endDate) {
        const formatTime = new Date(currentTime)
        if (formatTime) {
            dataForGraph.push([
                formatTime,
                getRandomInt(200),
                getRandomInt(200),
                getRandomInt(200),
                getRandomInt(200),
            ]);
        }
        currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return dataForGraph;
}

export const data = generateGraph();

export const options = {
    chart: {
        title: "Popular time",
    },
};

export default function Home() {
    return (
        <Chart
            chartType="Line"
            width="100%"
            height="90%"
            data={data}
            options={options}
        />
    );
}
