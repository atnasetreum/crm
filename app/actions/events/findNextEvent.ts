"use server";

import { stringToDateWithTime } from "@app/shared/utils";
import prisma from "@config/database";

export const findNextEvent = async () => {
  try {
    const event = await prisma.event.findFirst({
      where: {
        date: {
          gte: new Date(),
        },
      },
      include: {
        client: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    if (event) {
      console.log(event.client.name, stringToDateWithTime(event.date));
    }

    return {
      ok: true,
      client: 1,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al recuperar el cliente",
    };
  }
};
