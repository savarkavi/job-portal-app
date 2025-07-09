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

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (!user.onboarded) {
    await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        onboarded: true,
        role: "RECRUITER",
        recruiterProfiles: {
          create: {
            ...validateData,
          },
        },
      },
    });

    return redirect("/");
  } else {
    const newProfile = await prisma.recruiterProfile.create({
      data: {
        ...validateData,
        userId: user.id,
      },
    });

    return newProfile;
  }
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
