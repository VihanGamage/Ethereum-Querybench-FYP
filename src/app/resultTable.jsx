"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";

function ResultTable({data}) {

    const normalizedData = Array.isArray(data) ? data : data ? [data] : [];


    return (
        <Table className="w-1/3">
            <TableCaption>blockchain queries</TableCaption>
            <TableHeader className="">
                <TableRow>
                    <TableHead className="font-bold text-center text-base">Name</TableHead>
                    <TableHead className="font-bold text-center text-base">Surname</TableHead>
                    <TableHead className="font-bold text-center text-base">Gender</TableHead>
                    <TableHead className="font-bold text-center text-base">Occupation</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {normalizedData.map((user) => (
                    <TableRow key={user.hashCode}>
                        <TableCell className="font-normal text-center">{user.Name}</TableCell>
                        <TableCell className="font-medium text-center">{user.Surname}</TableCell>
                        <TableCell className="font-medium text-center">{user.Gender}</TableCell>
                        <TableCell className="font-medium text-left">{user.Occupation}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default ResultTable