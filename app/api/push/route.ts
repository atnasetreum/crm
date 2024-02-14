import { NextRequest, NextResponse } from "next/server";

import { notify } from "@actions";

type ResponseData = {
  message: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  await notify(body);

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
