"use client"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import ResultTable from "@/app/resultTable";
import {useState} from "react";
import Image from "next/image";
import {useToast} from "@/hooks/use-toast";

export default function Home() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]); // Table data
    const {toast} = useToast();

    const handleTextareaChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async () => {
        console.log("Submitted Query:", query);

        const res = await fetch(`/api/query?query=${encodeURIComponent(query)}`, {
            method: "GET",
        });
        try {
            const data = await res.json();
            console.log("Fetched Data:", data);
            // Update table results
            setResults(data);
            toast({
                variant: "success",
                description: "Query Successful",
            })
        }catch (err){
            console.log("Error in query")
            toast({
                variant: "destructive",
                description: "Invalid Query",
            })
        }

    };

  return (
      <>
          <div className="flex items-center justify-center mt-8">
              <Image src="/logo.webp" alt="logo" height={60} width={40}/>
              <Label className="text-3xl ml-2">
                  Ethereum QueryBench
              </Label>
          </div>

          <div className="mx-auto mt-14 w-full max-w-6xl flex space-x-52 p-12 border border-gray-400 rounded-lg">

            <div className="">

              <Textarea
                  className="w-96 h-96"
                  placeholder="Enter the query"
                  valur={query}
                  onChange={handleTextareaChange}
              />

                <Button className="mt-3" onClick={handleSubmit}>
                  Submit
                </Button>

            </div>

            <div className="">
                  <ResultTable data={results}/>
            </div>
          </div>

      </>
  );
}
