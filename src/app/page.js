import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import ResultTable from "@/app/resultTable";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";

export default function Home() {

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
                  placeholder="Enter the query"/>

                <Button className="mt-3">
                  Submit
                </Button>

                <div className="mt-20">
                    <HoverCard>
                        <HoverCardTrigger>
                            Stored Data
                        </HoverCardTrigger>

                        <HoverCardContent>
                            john-shelby-1-male,
                            tom-cook-2-male,
                            kim-elly-3-female
                        </HoverCardContent>
                    </HoverCard>
                </div>

            </div>

            <div className="">
                  <ResultTable/>
            </div>
          </div>

      </>
  );
}
