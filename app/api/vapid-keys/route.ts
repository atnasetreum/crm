import { NextResponse } from "next/server";

import vapidKeys from "@config/vapid-keys.json";

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
