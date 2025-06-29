import { auth } from "@clerk/nextjs/server";

export const authenticateServerUser = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return userId;
};
