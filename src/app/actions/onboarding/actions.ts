"use server";

import prisma from "@/lib/prisma";
import { recruiterFormSchema } from "@/lib/validation";
import { authenticateUser } from "@/utils/authenticateUser";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

export const createRecruiterProfile = async (
  data: z.infer<typeof recruiterFormSchema>,
) => {
  const userId = await authenticateUser();

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
