"use server";

import prisma from "@/lib/prisma";
import { createJobFormSchema } from "@/lib/validation";
import { authenticateServerUser } from "@/utils/authenticateUser";
import { z } from "zod/v4";

interface createJobPostingParams {
  data: z.infer<typeof createJobFormSchema>;
  selectedRecruiterProfile: string;
}

export const createJobPosting = async ({
  data,
  selectedRecruiterProfile,
}: createJobPostingParams) => {
  const userId = await authenticateServerUser();

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });

  if (!user) throw new Error("User not found");

  const validatedData = createJobFormSchema.parse(data);

  await prisma.jobPost.create({
    data: {
      ...validatedData,
      recruiterId: selectedRecruiterProfile,
    },
  });
};
