"use client";
import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Student } from "~/app/lib/definitions";

const columns = [
    { name: "STUDENT ID", uid: "studentID" },
    { name: "START TIME", uid: "startTime" },
    { name: "END TIME", uid: "endTime" },
    { name: "ACTIONS", uid: "actions" },
];

export default function StudentTable({ students }: { students: Student[] }) {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [studentID, setStudentID] = useState(0);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const deleteStudent = api.student.deleteById.useMutation({
        onSuccess: () => {
            router.refresh();
            toast.success("Student Deleted Successfully");
        },
    });

    const handleEdit = (student: Student) => {
        setStudentID(student.studentID);
        setStartTime(student.startTime);
        setEndTime(student.endTime);
        onOpen();
    };

    const updateStudent = api.student.update.useMutation({
        onSuccess: () => {
            router.refresh();
            toast.success("Student Updated Successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleUpdate = () => {
        updateStudent.mutate({
            studentID,
            startTime,
            endTime,
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCell = React.useCallback((student: Student, columnKey: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const cellValue = student[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <span
                            className="cursor-pointer text-lg text-default-400 active:opacity-50"
                            onClick={() => handleEdit(student)}
                        >
                            <MdOutlineEdit />
                        </span>
                        <span
                            className="cursor-pointer text-lg text-danger active:opacity-50"
                            onClick={() =>
                                deleteStudent.mutate(student.studentID)
                            }
                        >
                            <MdDeleteOutline />
                        </span>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="">
            <Table aria-label="Example table with custom cells" className="">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === "actions" ? "center" : "start"
                            }
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={students}>
                    {(student) => (
                        <TableRow key={student.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(student, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit Student
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid gap-1">
                                    <p>Start Time</p>
                                    <Input
                                        type="time"
                                        variant="bordered"
                                        value={startTime}
                                        onValueChange={setStartTime}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <p>End Time</p>
                                    <Input
                                        type="time"
                                        variant="bordered"
                                        value={endTime}
                                        onValueChange={setEndTime}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={onClose}
                                    onClick={() => handleUpdate()}
                                >
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
