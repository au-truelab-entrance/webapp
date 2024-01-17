"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import CSVReader from "react-csv-reader";
import { api } from "~/trpc/react";

interface CsvData {
    studentID: string;
    startTime: string;
    endTime: string;
}

function CSVDashboard() {
    const [data, setData] = useState<CsvData[]>([]);

    const handleFileLoaded = (newData: CsvData[]) => {
        setData(newData);

        createStudent.mutate(newData);
    };

    const createStudent = api.student.create.useMutation({
        onSuccess: () => {
            // setData([])
        },
    });

    return (
        <div className="p-4">
            <div className="mb-3 w-96">
                <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                    CSV
                </label>

                {/* Use CSVReader component to handle file input */}
                <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={handleFileLoaded}
                />

                {/* Button to log the loaded data */}
                <Button
                    color="primary"
                    className="mt-4 w-full"
                    size="lg"
                    onClick={() => {
                        // append to database
                        // console.log(data);
                        // createPost.mutate(data);
                    }}
                >
                    Submit
                </Button>
            </div>

            {/* Render table based on loaded data */}
            <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500"
                        >
                            STUDENT ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500"
                        >
                            START
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500"
                        >
                            END
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="whitespace-nowrap px-6 py-4">
                                {item.studentID}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {item.startTime}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {item.endTime}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Export the Dashboard component
export default CSVDashboard;
