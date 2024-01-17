"use client"
import React, { use, useState } from 'react';
import { Button } from '@nextui-org/react';
import CSVReader from 'react-csv-reader';
import { api } from '~/trpc/react';
import { useEffect } from 'react';

type CSVData = {
    studentID: string;
    startTime: string;
    endTime: string;
}


export default function Students() {
    const [data, setData] = useState<CSVData[]>([]);

    const handleFileLoaded = (newData: CSVData[]) => {
        setData(newData);

        createStudent.mutate(newData);
    };


    const createStudent = api.student.create.useMutation({
        onSuccess: () => {
            // setData([]);
        },
    });


    // console.log(data);
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
                    }}
                >
                    FETCH
                </Button>
            </div>

            {/* Render table based on loaded data */}
            <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                            STUDENT ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                            START
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                            END
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.studentID}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.startTime}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}


