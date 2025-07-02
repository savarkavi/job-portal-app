"use client";

import { Slider } from "@/components/ui/slider";
import { formatSalary } from "@/lib/utils";
import { useState } from "react";
import { Control, useController } from "react-hook-form";

type FormValues = {
  jobTitle: string;
  location: string;
  jobDescription: string;
  employmentType: string;
  experience: string;
  listingDuration: number;
  minSalary: number;
  maxSalary: number;
};

interface SalaryRangeProps {
  minSalary: number;
  maxSalary: number;
  control: Control<FormValues>;
}

const SalaryRange = ({ minSalary, maxSalary, control }: SalaryRangeProps) => {
  const { field: maxField } = useController({
    name: "maxSalary",
    control,
  });

  const { field: minField } = useController({
    name: "minSalary",
    control,
  });

  const [range, setRange] = useState([minField.value, maxField.value]);

  const handleValueChange = (values: number[]) => {
    if (values[1] - values[0] < 20000) return;

    const newRange = [values[0], values[1]];
    setRange(newRange);

    minField.onChange(values[0]);
    maxField.onChange(values[1]);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-semibold">Select salary range (per month)</p>
      <Slider
        onValueChange={handleValueChange}
        min={minSalary}
        max={maxSalary}
        step={5000}
        value={range}
      />
      <div className="flex w-full items-center justify-between">
        <span>{`₹${formatSalary(range[0])}`}</span>
        <span>{`₹${formatSalary(range[1])}`}</span>
      </div>
    </div>
  );
};

export default SalaryRange;
