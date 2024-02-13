import { NextRequest, NextResponse } from "next/server";

import { vapidKeys } from "@config/vapid-keys";
import { auth } from "@app/auth.config";
import prisma from "@config/database";

type ResponseData = {
  publicKey: string;
};

export const GET = async () => {
  return new NextResponse<ResponseData>(
    JSON.stringify({ publicKey: vapidKeys.publicKey }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export async function POST(request: NextRequest) {
  const subscription = await request.json();

  const session = await auth();

  if (!session?.user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { id: userId } = session.user;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      subscriptions: {
        create: [
          {
            subscription: JSON.stringify(subscription),
            createdById: session.user.id,
          },
        ],
      },
    },
  });

  return new NextResponse<ResponseData>(
    JSON.stringify({ publicKey: vapidKeys.publicKey }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
