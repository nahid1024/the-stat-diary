import React from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TableRow {
    [key: string]: string | number; // flexible keys
}

interface TableBlockProps {
    headers: string[];
    rows: TableRow[];
    caption: string
}

const TableBlock: React.FC<TableBlockProps> = ({ headers, rows, caption }) => {
    return (
        <div>
            <Table>
                <TableCaption>{caption}</TableCaption>
                <TableHeader>
                    <TableRow>
                        {headers.map((header, i) => (
                            <TableHead key={i}>
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map((header, cellIndex) => (
                                <TableCell key={cellIndex}>{row[header]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table></div>
    )
};

export default TableBlock;