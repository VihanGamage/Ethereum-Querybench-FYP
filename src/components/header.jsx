import Image from "next/image";
import {Label} from "@/components/ui/label";
import Link from "next/link";

export default function Header() {

    return(

        <Link href="/" className="flex items-center justify-center mt-8">
            <Image src="/logo.webp" alt="logo" height={60} width={40}/>
            <Label className="text-3xl ml-2">
                Ethereum QueryBench
            </Label>
        </Link>
    )

}