"use server";

import { revalidatePath } from "next/cache";

import { EventInput } from "@fullcalendar/core/index.js";

import prisma from "@config/database";
import { auth } from "@app/auth.config";
import { ClientForm } from "@components/crm/clients/FormClients";

interface Props extends ClientForm {
  id: number;
  comments: string[];
  events: EventInput[];
}

export const saveClient = async (clientCurrent: Props) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        ok: false,
        message: "No se ha iniciado sesión",
      };
    }

    let client;

    const proyects = await prisma.project.findMany({
      where: {
        active: true,
        name: {
          in: clientCurrent.projects.map((project) => project),
        },
      },
    });

    if (clientCurrent.id) {
      client = await prisma.client.update({
        where: {
          id: clientCurrent.id,
        },
        data: {
          name: clientCurrent.name,
          phone: clientCurrent.phone,
          email: clientCurrent.email,
          status: clientCurrent.status,
          ...(clientCurrent.birthdate && {
            birthdate: `${clientCurrent.birthdate}`,
          }),
          projects: {
            set: proyects,
          },
          comments: {
            create: clientCurrent.comments.map((comment) => ({
              comment,
              createdById: session.user.id,
            })),
          },
          events: {
            create: clientCurrent.events
              .filter((event) => !event?.id)
              .map((event) => {
                const start = event?.start as Date;

                const project = proyects.find(
                  (project) => project.name === event.project
                )!;

                return {
                  date: start,
                  comment: event.comment,
                  createdById: session.user.id,
                  projectId: project.id,
                };
              }),
          },
          updatedById: session.user.id,
        },
        include: {
          projects: true,
          comments: true,
          events: true,
        },
      });
    } else {
      client = await prisma.client.create({
        data: {
          name: clientCurrent.name,
          phone: clientCurrent.phone,
          email: clientCurrent.email,
          status: clientCurrent.status,
          ...(clientCurrent.birthdate && {
            birthdate: `${clientCurrent.birthdate}`,
          }),
          projects: {
            connect: proyects,
          },
          createdById: session.user.id,
          comments: {
            create: clientCurrent.comments.map((comment) => ({
              comment,
              createdById: session.user.id,
            })),
          },
          events: {
            create: clientCurrent.events.map((event) => {
              const start = event?.start as Date;

              const project = proyects.find(
                (project) => project.name === event.project
              )!;

              return {
                date: start,
                comment: event.comment,
                createdById: session.user.id,
                projectId: project.id,
              };
            }),
          },
        },
        include: {
          projects: true,
          comments: true,
          events: true,
        },
      });
    }

    revalidatePath("/crm/clients");

    return {
      ok: true,
      client,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error al ${
        clientCurrent.id ? "actualizar" : "crear"
      } el cliente`,
    };
  }
};
