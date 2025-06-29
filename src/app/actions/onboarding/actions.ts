"use server";

import prisma from "@/lib/prisma";
import { jobSeekerFormSchema, recruiterFormSchema } from "@/lib/validation";
import { authenticateServerUser } from "@/utils/authenticateUser";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

export const createRecruiterProfile = async (
  data: z.infer<typeof recruiterFormSchema>,
) => {
  const userId = await authenticateServerUser();

  const validateData = recruiterFormSchema.parse(data);

  await prisma.user.update({
    where: {
      clerkId: userId,
    },
    data: {
      onboarded: true,
      role: "RECRUITER",
      recruiterProfile: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
};

export const createJobSeekerProfile = async (
  data: z.infer<typeof jobSeekerFormSchema>,
) => {
  const userId = await authenticateServerUser();

  const validateData = jobSeekerFormSchema.parse(data);

  await prisma.user.update({
    where: {
      clerkId: userId,
    },
    data: {
      onboarded: true,
      role: "JOB_SEEKER",
      jobSeekerProfile: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
};
