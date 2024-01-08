"use server";

import { revalidatePath } from "next/cache";

import prisma from "@config/database";
import { Project } from "@interfaces";

export const saveProject = async (projectCurrent: {
  id: number;
  name: string;
}) => {
  try {
    let project: Project;

    if (projectCurrent.id) {
      project = await prisma.project.update({
        where: {
          id: projectCurrent.id,
        },
        data: {
          name: projectCurrent.name,
        },
      });
    } else {
      project = await prisma.project.create({
        data: {
          name: projectCurrent.name,
        },
      });
    }

    revalidatePath("/crm/projects");

    return {
      ok: true,
      project,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al crear el proyecto",
    };
  }
};
