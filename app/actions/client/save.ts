"use server";

import { revalidatePath } from "next/cache";

import prisma from "@config/database";
import { auth } from "@app/auth.config";
import { ClientForm } from "@app/components/crm/clients/FormClients";

interface Props extends ClientForm {
  id: number;
  comments: string[];
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
          updatedById: session.user.id,
        },
        include: {
          projects: true,
          comments: true,
        },
      });
    } else {
      client = await prisma.client.create({
        data: {
          name: clientCurrent.name,
          phone: clientCurrent.phone,
          email: clientCurrent.email,
          status: clientCurrent.status,
          birthdate: clientCurrent?.birthdate ?? new Date(),
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
        },
        include: {
          projects: true,
          comments: true,
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
