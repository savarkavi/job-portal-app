import { jobBenefits } from "@/utils/jobBenefitsData";
import { Badge } from "../ui/badge";
import { ControllerRenderProps } from "react-hook-form";
import { JobPostFormValues } from "@/lib/types";

interface BenefitsSelectorProps {
  field: ControllerRenderProps<JobPostFormValues, "benefits">;
}

const BenefitsSelector = ({ field }: BenefitsSelectorProps) => {
  const handleToggleBenefit = (benefit: string) => {
    const currentBenefits = field.value || [];

    const updatedBenefits = currentBenefits.includes(benefit)
      ? currentBenefits.filter((item) => item !== benefit)
      : [...currentBenefits, benefit];

    field.onChange(updatedBenefits);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {jobBenefits.map((item, i) => (
        <Badge
          key={i}
          onClick={() => handleToggleBenefit(item.label)}
          variant={field.value.includes(item.label) ? "secondary" : "outline"}
          className="flex items-center gap-2 rounded-full p-3 hover:cursor-pointer"
        >
          <item.icon />
          <span>{item.label}</span>
        </Badge>
      ))}
    </div>
  );
};

export default BenefitsSelector;
