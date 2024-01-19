"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import CSVReader from "react-csv-reader";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface CsvData {
    studentID: string;
    startTime: string;
    endTime: string;
}

function CSVDashboard() {
    const router = useRouter();
    const [data, setData] = useState<CsvData[]>([]);


    const handleFileLoaded = (newData: CsvData[]) => {
        setData(newData);
    };

    const createStudent = api.student.create.useMutation({
        onSuccess: () => {
            router.refresh();
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
                        createStudent.mutate(data);
                    }}
                >
                    Submit
                </Button>
            </div>

            {/* Render table based on loaded data */}
        </div>
    );
}

// Export the Dashboard component
export default CSVDashboard;
