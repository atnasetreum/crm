"use server";

import prisma from "@config/database";

export const findOneClient = async (id: number) => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        projects: true,
        comments: {
          include: {
            createdBy: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        events: {
          include: {
            createdBy: true,
            project: true,
          },
        },
        createdBy: true,
        updatedBy: true,
      },
    });

    return {
      ok: true,
      client,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al recuperar el cliente",
    };
  }
};
