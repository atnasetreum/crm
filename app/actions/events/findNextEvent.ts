"use server";

import { diffInMinutesFuture, stringToDateWithTime } from "@shared/utils";
import { auth } from "@app/auth.config";
import prisma from "@config/database";
import { notify } from "@actions";

export const findNextEvent = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }

    const event = await prisma.event.findFirst({
      where: {
        date: {
          gte: new Date(),
        },
      },
      include: {
        client: true,
        project: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    if (event) {
      const diffInMinutes = diffInMinutesFuture(event.date);

      const milliseconds = diffInMinutes * 60 * 1000;

      setTimeout(async () => {
        await notify({
          clientId: event.client.id,
          name: event.client.name,
          projectName: event.project.name,
          type: event.type,
          comment: event.comment,
          date: stringToDateWithTime(event.date),
        });

        findNextEvent();
      }, milliseconds);

      console.log({
        diffInMinutes,
        milliseconds,
        eventDate: stringToDateWithTime(event.date),
      });
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
