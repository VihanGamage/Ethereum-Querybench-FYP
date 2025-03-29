"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,}
    from "@/components/ui/card"

export default function (){

    return(
        <div className="border border-gray-400 rounded-lg p-8 mx-auto w-full max-w-2xl mt-16 space-y-4 mb-12">
            <h1 className="justify-center flex text-3xl bold">
                Documentation
            </h1>
            <Card>
                <CardHeader>
                    <CardDescription className="text-2xl">
                        Ethereum QueryBench is a Query Visualization
                        Tool built for Blockchain Developers & Analysts.
                        The Queries use here are similar to MongoDb Queries
                        in this hybrid storage blockchain system.
                    </CardDescription>
                </CardHeader>
                <CardContent className="ml-16 mt-2 mb-4">
                    <p>{`find()`}</p>
                    <p>{`find({ Name : })`}</p>
                    <p>{`find({ Age : })`}</p>
                    <p>{`find({ Gender : })`}</p>
                    <p>{`find({ Occupation : })`}</p>
                    <p>{`find({ hashCode : })`}</p>
                    <p>{`find({ Age : { $gt : }})`}</p>
                    <p>{`find({ Age : { $lt : }})`}</p>
                    <p>{`find().sort({ Name: 1 })`}</p>
                    <p>{`find().sort({ Name: -1 })`}</p>
                    <p>{`find().sort({ Age: 1 })`}</p>
                    <p>{`find().sort({ Age: -1 })`}</p>
                    <p>{`find().limit( )`}</p>
                    <p>{`find({ Name: { $regex: "^" }})`}</p>
                    <p>{`aggregate([{ $group: { _id: $Occupation, Age: { $sum: $Age }}}])`}</p>
                    <p>{`aggregate([{ $group: { _id: $Occupation, Age: { $avg: $Age }}}])`}</p>
                    <p>{`aggregate([{ $group: { _id: $Occupation, Age: { $min: $Age }}}])`}</p>
                    <p>{`aggregate([{ $group: { _id: $Occupation, Age: { $max: $Age }}}])`}</p>

                </CardContent>

            </Card>

        </div>
    )
}