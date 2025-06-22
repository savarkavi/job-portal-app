import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2Icon, CheckIcon, UserIcon } from "lucide-react";
import { UserRoleType } from "./onboarding-form";
import { cn } from "@/lib/utils";

interface UserRoleProps {
  selectedRole: UserRoleType | null;
  onSelect: (type: UserRoleType) => void;
}

const UserRole = ({ selectedRole, onSelect }: UserRoleProps) => {
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl font-bold">
          How do you plan to use the platform?
        </p>
        <p>This will customize your experience.</p>
      </div>
      <div className="mt-12 flex flex-col items-center gap-10">
        <Card
          className={cn(
            "hover:bg-accent w-full max-w-xl cursor-pointer gap-2 hover:text-white",
            selectedRole === "Recruiter" && "bg-accent text-white",
          )}
          onClick={() => onSelect("Recruiter")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Building2Icon />
              <p>As a Recruiter</p>
              {selectedRole === "Recruiter" && <CheckIcon />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Meet and hire high-quality candidates for your team.</p>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "hover:bg-accent w-full max-w-xl cursor-pointer gap-2 hover:text-white",
            selectedRole === "Job seeker" && "bg-accent text-white",
          )}
          onClick={() => onSelect("Job seeker")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UserIcon />
              <p>As a Job Seeker</p>
              {selectedRole === "Job seeker" && <CheckIcon />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Meet founders and land your dream job.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserRole;
