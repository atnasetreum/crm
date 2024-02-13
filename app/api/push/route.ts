import { NextRequest, NextResponse } from "next/server";

import * as webpush from "web-push";

import vapidKeys from "@config/vapid-keys.json";
import { auth } from "@app/auth.config";
import prisma from "@config/database";

webpush.setVapidDetails(
  "mailto:eduardo-266@hotmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

type ResponseData = {
  message: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const session = await auth();

  if (!session?.user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const clientsWithSubscription = await prisma.user.findMany({
    where: {
      subscriptions: {
        some: {
          createdById: session.user.id,
        },
      },
    },
    include: {
      subscriptions: true,
    },
  });

  for (let i = 0, t = clientsWithSubscription.length; i < t; i++) {
    const { subscriptions } = clientsWithSubscription[i];

    for (let i2 = 0, t2 = subscriptions.length; i2 < t2; i2++) {
      const data = subscriptions[i2];
      const subscription = JSON.parse(data.subscription);
      await webpush.sendNotification(subscription, JSON.stringify(body));
    }
  }

  return new NextResponse<ResponseData>(
    JSON.stringify({ message: "Notification sent" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
