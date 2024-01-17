"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    getKeyValue,
} from "@nextui-org/react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

const columns = [
    { name: "STUDENT ID", uid: "studentID" },
    { name: "START TIME", uid: "startTime" },
    { name: "END TIME", uid: "endTime" },
    { name: "ACTIONS", uid: "actions" },
];

export default function StudentTable({ students }: { students: any }) {
    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            {cellValue}
                        </p>
                        <p className="text-bold text-sm capitalize text-default-400">
                            {user.team}
                        </p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit user">
                            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                                <MdOutlineEdit />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="cursor-pointer text-lg text-danger active:opacity-50">
                                <MdDeleteOutline />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells" className="">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={students}>
                {(item) => (
                    <TableRow key={students.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
