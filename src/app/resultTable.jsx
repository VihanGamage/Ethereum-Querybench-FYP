"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {useEffect, useState} from "react";
//import {toast} from "@/components/ui/toast";

async function getData(){
    const res=await fetch("http://localhost:3000/api/query",{
        cache:"no-store",
    });
    if (!res.ok){
        throw new Error("failed")
    }
    return res.json();
}


function ResultTable() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const newData = await getData();
            setData(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [data]);

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
                {data.map((user) => (
                    <TableRow key={user.applicationId}>
                        <TableCell className="font-normal text-center">{user.applicationId}</TableCell>
                        <TableCell className="font-medium text-center">{user.password}</TableCell>
                        <TableCell className="font-medium text-center">{user.statusCode}</TableCell>
                        <TableCell className="font-medium text-left">{user.statusDetail}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default ResultTable