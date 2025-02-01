"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export function DocButton(){
    return(
        <>
            <div className="absolute top-0 right-0 m-4 mr-52 py-2">
                <Button asChild variant="outline">
                    <Link href="/doc">
                        Documentation
                    </Link>
                </Button>
            </div>

        </>
    )
}