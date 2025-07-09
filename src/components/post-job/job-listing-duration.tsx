import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { jobLisitngDurationData } from "@/utils/jobListingDurationData";
import { ControllerRenderProps } from "react-hook-form";
import { JobPostFormValues } from "@/lib/types";
import { cn } from "@/lib/utils";

interface JobListingDurationProps {
  field: ControllerRenderProps<JobPostFormValues, "listingDuration">;
}

const JobListingDuration = ({ field }: JobListingDurationProps) => {
  return (
    <div>
      <RadioGroup
        defaultValue="30"
        onValueChange={(value) => field.onChange(Number(value))}
      >
        {jobLisitngDurationData.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <RadioGroupItem
              value={String(item.days)}
              id={item.id}
              className="hidden"
            />
            <Label
              htmlFor={item.id}
              className={cn(
                "flex w-full max-w-sm items-center justify-between rounded-2xl border px-4 py-3 hover:cursor-pointer",
                field.value === item.days && "border-primary bg-primary/10",
              )}
            >
              <div className="flex flex-col gap-2">
                <span>{item.label}</span>
                <p>{item.description}</p>
              </div>
              <span>{item.price}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default JobListingDuration;
