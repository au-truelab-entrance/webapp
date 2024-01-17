"use client";
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["Time", "Student"],
    ["9:00", 200],
    ["9:30", 1170],
    ["10:00", 660],
    //   ["10:30", 1030],
    //   ["11:00", 1030],
    //   ["11:30", 1030],
    //   ["12:00", 1030],
    //   ["12:30", 1030],
    //   ["13:00", 1030],
    //   ["13:30", 1030],
    //   ["14:00", 1030],
    //   ["14:30", 1030],
    //   ["15:00", 1030],
    //   ["15:30", 1030],
    //   ["16:00", 1030],
    //   ["16:30", 1030],
    //   ["17:00", 1030],
    //   ["17:30", 1030],
    //   ["18:00", 1030],
    //   ["18:30", 1030],
    //   ["19:00", 1030],
    //   ["19:30", 1030],
    //   ["20:00", 1030],
    //   ["20:30", 1030],
];

export const options = {
    title: "Popular time",
    curveType: "function",
    legend: { position: "bottom" },
};

export default function Home() {
    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
            controls={[
                {
                    controlEvents: [
                        {
                            eventName: "statechange",
                            callback: ({ chartWrapper, controlWrapper }) => {
                                console.log(
                                    "State changed to",
                                    controlWrapper?.getState(),
                                );
                            },
                        },
                    ],
                    controlType: "CategoryFilter",
                    options: {
                        filterColumnIndex: 1,
                        ui: {
                            labelStacking: "vertical",
                            label: "Year:",
                            allowTyping: false,
                            allowMultiple: false,
                        },
                    },
                },
            ]}
        />
    );
}
