'use client'
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import CSVReader from 'react-csv-reader';

interface CsvData {
    id: string;
    start_time: string;
    end_time: string;
}

function Dashboard() {
    const [data, setData] = useState<CsvData[]>([]);

    const handleFileLoaded = (newData: CsvData[]) => {
        setData(newData);
    };

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
                {/* <Button
                    color="primary"
                    className="mt-4 w-full"
                    size="lg"
                    onClick={() => {
                        console.log(data);
                    }}
                >
                    Read
                </Button> */}
            </div>

            {/* Render table based on loaded data */}
            <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                            ID
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
                            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.start_time}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.end_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

// Export the Dashboard component
export default Dashboard;
