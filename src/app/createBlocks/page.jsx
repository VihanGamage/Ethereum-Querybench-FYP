"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";

const FormSchema = z.object({
    Name: z.string(),
    Age: z.coerce.number(),
    Gender: z.string(),
    Occupation: z.string(),
    privateKey: z.string(),
    receiverAddress: z.string()
})

function CreateBlocks() {

    const {toast} = useToast();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            Name: "",
            Age: "",
            Gender: "",
            Occupation: "",
            privateKey: "0xef09176445bb9809589f7abefe7341cd7f965cea1463f8e6a4f7ebe1924c4ee4",
            receiverAddress: "0x6bb1aDd7a0Eb6AA8c7aDF8159EE042AbDD9187B6"
        },
    })

    async function onSubmit(data) {
        console.log(data)
        const res = await fetch("http://localhost:3000/api/blockchain", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: data.Name,
                Age: data.Age,
                Gender: data.Gender,
                Occupation: data.Occupation,
                privateKey: data.privateKey,
                receiverAddress: data.receiverAddress
            }),
        });
        if (!res.ok) {
            // If the response status is not okay (e.g., 404 or 500),
            console.log(`Not valid URL! \nStatus: ${res.status}, ${res.statusText}`)
            toast({
                variant: "destructive",
                description: "Error Creating Block",
            })
        } else {
            console.log("Success")
            toast({
                variant: "success",
                description: "New Block Created",
            })
        }
    }

    return (
        <div>
            <h1 className="justify-center flex text-3xl bold mt-20">
                Create Blocks
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border border-gray-400 rounded-lg p-8 mx-auto w-full max-w-lg mt-4 space-y-4">

                    <FormField
                        control={form.control}
                        name="Name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Age"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input placeholder="Age" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Gender"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Input placeholder="Gender" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Occupation"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                    <Input placeholder="Occupation" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="privateKey"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Private Key</FormLabel>
                                <FormControl>
                                    <Input placeholder="Private Key" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="receiverAddress"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Receiver Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Receiver Address" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button className="ml-2" type="submit">SUBMIT</Button>
                </form>
            </Form>
        </div>

    )
}

export default CreateBlocks