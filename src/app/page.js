"use client"
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import ResultTable from "@/app/resultTable";
import {useState} from "react";
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
            if (!data || !Array.isArray(data) || data.length === 0){
                toast({
                    variant: "destructive",
                    description: "Invalid Query",
                })
            }else {
                // Update table results
                setResults(data);
                toast({
                    variant: "success",
                    description: "Query Successful",
                })
            }
        }catch (err){
            console.log("Error Querying")
            toast({
                variant: "destructive",
                description: "Error Querying",
            })
        }

    };

  return (
      <>
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
