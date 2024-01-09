"use server";

import prisma from "@config/database";

export const findAllProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        active: true,
      },
      include: {
        clients: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      ok: true,
      projects,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al recuperar los proyectos",
    };
  }
};
