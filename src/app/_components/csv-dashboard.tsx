"use client";
import React, { useState } from "react";
import { Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import CSVReader from "react-csv-reader";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CsvData {
    studentID: string;
    startTime: string;
    endTime: string;
}

function CSVDashboard() {
    const router = useRouter();
    const [data, setData] = useState<CsvData[]>([]);
    const [studentID, setStudentID] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');


    const handleFileLoaded = (newData: CsvData[]) => {
        setData(newData);
        createStudent.mutate(newData);
    };

    const createStudent = api.student.create.useMutation({
        onSuccess: () => {
            router.refresh();
            toast.success("Students Inserted Successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleInsert = () => {

        createStudent.mutate([
            {
                studentID: studentID,
                startTime: startTime,
                endTime: endTime
            }
        ]);
    }

    return (
        <div className="">
            <h1 className="text-4xl font-bold">Students</h1>
            <div className="flex items-center my-6">
                <Button color="primary" className="w-80" onPress={onOpen}>Insert Students</Button>
                <h1 className="mx-4">or</h1>
                <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={handleFileLoaded}
                />
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Insert Student</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Student ID"
                                    placeholder="*******"
                                    variant="bordered"
                                    type="number"
                                    value={studentID}
                                    onValueChange={setStudentID}
                                />
                                <div className="flex gap-4">
                                    <div className="gap-1 w-full">
                                        <p>Start Time</p>
                                        <Input
                                            type="time"
                                            variant="bordered"
                                            value={startTime}
                                            onValueChange={setStartTime}
                                        />
                                    </div>
                                    <div className="gap-1 w-full">
                                        <p>End Time</p>
                                        <Input
                                            type="time"
                                            variant="bordered"
                                            value={endTime}
                                            onValueChange={setEndTime}
                                        />
                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => handleInsert()}>
                                    Insert
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

        </div>
    );
}

// Export the Dashboard component
export default CSVDashboard;
