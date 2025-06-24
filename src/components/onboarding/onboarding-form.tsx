"use client";

import { useState } from "react";
import UserRole from "./user-role";
import { Button } from "../ui/button";
import RecruiterForm from "./recruiter-form";
import JobSeekerForm from "./job-seeker-form";

export type UserRoleType = "Recruiter" | "Job seeker";

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRoleType | null>(null);

  const handleSelectedRole = (type: UserRoleType) => {
    setSelectedRole(type);
  };

  const handleStepButton = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  return (
    <div className="w-full p-4">
      {step === 1 && (
        <UserRole selectedRole={selectedRole} onSelect={handleSelectedRole} />
      )}
      {step === 2 &&
        (selectedRole === "Recruiter" ? <RecruiterForm /> : <JobSeekerForm />)}
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4">
        <Button className="w-30 p-6 text-xl" onClick={handleStepButton}>
          {step === 1 ? "Next" : "Prev"}
        </Button>
        <p>{`Step ${step}/2`}</p>
      </div>
    </div>
  );
};

export default OnboardingForm;
