import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-[450px] py-12">
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-300">
            <XIcon className="size-8 text-red-600" />
          </div>
          <p className="text-2xl font-semibold">Payment failed</p>
          <p className="text-center text-sm">
            Your payment was failed. <br /> Dont worry, you wont be charged.
          </p>
          <Button>
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
