"use server";

import prisma from "@config/database";

export const findOneProject = async (id: number) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    return {
      ok: true,
      project,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al recuperar el proyecto",
    };
  }
};
