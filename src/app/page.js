"use client"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import ResultTable from "@/app/resultTable";
import {Input} from "@/components/ui/input";
import {useState} from "react";

export default function Home() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]); // Table data

    const handleTextareaChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async () => {
        console.log("Submitted Query:", query);

        const res = await fetch(`/api/query?query=${encodeURIComponent(query)}`, {
            method: "GET",
        });
        const data = await res.json();
        console.log("Fetched Data:", data);

        // Update table results
        setResults(data);

    };

  return (
      <>
          <div className="flex items-center justify-center">
              <Label className="text-2xl mt-3">
                  Ethereum QueryBench
              </Label>
          </div>

          <div className="ml-44 mt-16 flex space-x-64">

            <div className="">

              <Textarea
                  className=" w-96 h-96"
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
