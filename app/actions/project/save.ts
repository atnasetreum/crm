"use server";

import { revalidatePath } from "next/cache";

import { Project } from "@prisma/client";

import { auth } from "@app/auth.config";
import prisma from "@config/database";

export const saveProject = async (projectCurrent: {
  id: number;
  name: string;
}) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        ok: false,
        message: "No se ha iniciado sesión",
      };
    }

    let project: Project;

    if (projectCurrent.id) {
      project = await prisma.project.update({
        where: {
          id: projectCurrent.id,
        },
        data: {
          name: projectCurrent.name,
          updatedById: session.user.id,
        },
      });
    } else {
      project = await prisma.project.create({
        data: {
          name: projectCurrent.name,
          createdById: session.user.id,
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
      message: `Error al ${
        projectCurrent.id ? "actualizar" : "crear"
      } el proyecto`,
    };
  }
};
