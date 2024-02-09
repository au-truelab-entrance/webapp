"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";

const data = [{ rank: 1, studentID: "6511286", year: "Year 2", enter: "12" }];

export default function TopTenTable() {
    return (
        <>
            <h2>Top 10 most entered student</h2>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>RANK</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>ENTERED</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((each) => {
                        return (
                            <TableRow key={each.rank}>
                                <TableCell>{each.rank}</TableCell>
                                <TableCell>{each.studentID}</TableCell>
                                <TableCell>{each.year}</TableCell>
                                <TableCell>{each.enter}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
