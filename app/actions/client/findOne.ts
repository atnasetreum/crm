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
