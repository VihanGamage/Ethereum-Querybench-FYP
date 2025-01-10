import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export default function Home() {

  return (
      <>
          <div className="flex items-center justify-center">
              <Label className="text-2xl mt-3 mb-2">
                  Ethereum QueryBench
              </Label>
          </div>

          <div className="ml-32 mt-12">
              <Textarea
                  className=" w-96 h-96"
                  placeholder="Enter the query"/>
          </div>

          <Button className="ml-32 mt-3">
              Submit
          </Button>



      </>
  );
}
