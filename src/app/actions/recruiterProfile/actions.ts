"use server";

import prisma from "@/lib/prisma";
import { authenticateServerUser } from "@/utils/authenticateUser";

export const getAllRecruiterProfiles = async () => {
  try {
    const userId = await authenticateServerUser();

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error("User not found");

    const recruiterProfiles = await prisma.recruiterProfile.findMany({
      where: { userId: user.id },
    });

    return recruiterProfiles;
  } catch (error) {
    console.log(error);
  }
};
