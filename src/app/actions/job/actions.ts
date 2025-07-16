"use server";

import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { createJobFormSchema } from "@/lib/validation";
import { authenticateServerUser } from "@/utils/authenticateUser";
import { jobLisitngDurationData } from "@/utils/jobListingDurationData";
import { redirect } from "next/navigation";
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

  let stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name || user.email,
    });

    stripeCustomerId = customer.id;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId,
      },
    });
  }

  const product = jobLisitngDurationData.find(
    (item) => item.days === validatedData.listingDuration,
  );

  if (!product) return;

  const newJobPost = await prisma.jobPost.create({
    data: {
      ...validatedData,
      recruiterId: selectedRecruiterProfile,
    },
  });

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `${product.days} days job posting`,
            description: product.description,
          },
          currency: "USD",
          unit_amount: product.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobPostId: newJobPost.id,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/canceled`,
  });

  return redirect(session.url as string);
};
