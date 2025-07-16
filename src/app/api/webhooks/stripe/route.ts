import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();

  const signature = headersList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.log(`Webhook Error`, error);
    return new Response(`Webhook error: ${error}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const jobPostId = session.metadata?.jobPostId;

    if (!jobPostId) {
      return new Response("No job post was found of this Id", { status: 404 });
    }

    await prisma.jobPost.update({
      where: {
        id: jobPostId,
      },
      data: {
        status: "ACTIVE",
      },
    });

    return new Response(null, { status: 200 });
  }
}
