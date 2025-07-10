"use client";

import { RecruiterProfile } from "@/app/generated/prisma";
import RecruiterForm from "@/components/onboarding/recruiter-form";
import CreateJobForm from "@/components/post-job/create-job-form";
import { useState } from "react";
import RecruiterProfileCard from "./recruiter-profile-card";
import { useQuery } from "@tanstack/react-query";
import { getAllRecruiterProfiles } from "@/app/actions/recruiterProfile/actions";
import { Loader2 } from "lucide-react";

const PostJobContainer = () => {
  const { data, isPending } = useQuery({
    queryKey: ["recruiter-profiles"],
    queryFn: getAllRecruiterProfiles,
  });

  const [selectedRecruiterProfile, setSelectedRecruiterProfile] =
    useState<RecruiterProfile | null>(data ? data[0] : null);

  const handleSelectedRecruiterProfile = (
    recruiterProfile: RecruiterProfile | null,
  ) => {
    setSelectedRecruiterProfile(recruiterProfile);
  };

  if (isPending) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center p-2 xl:flex-row xl:items-start xl:gap-12">
      <CreateJobForm selectedRecruiterProfile={selectedRecruiterProfile} />
      {selectedRecruiterProfile ? (
        <RecruiterProfileCard
          selectedRecruiterProfile={selectedRecruiterProfile}
          recruiterProfiles={data}
          onRecruiterProfileChange={handleSelectedRecruiterProfile}
        />
      ) : (
        <RecruiterForm
          isOnboarding={false}
          recruiterProfiles={data}
          onRecruiterProfileChange={handleSelectedRecruiterProfile}
          selectedRecruiterProfile={selectedRecruiterProfile}
        />
      )}
    </div>
  );
};

export default PostJobContainer;
