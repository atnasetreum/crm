"use server";

import { revalidatePath } from "next/cache";

import prisma from "@config/database";

export const removeProject = async (id: number) => {
  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    revalidatePath("/crm/projects");

    return {
      ok: true,
      project,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar el proyecto",
    };
  }
};
