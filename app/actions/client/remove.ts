"use server";

import { revalidatePath } from "next/cache";

import prisma from "@config/database";
import { auth } from "@app/auth.config";

export const removeClient = async (id: number) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        ok: false,
        message: "No se ha iniciado sesión",
      };
    }

    const clientData = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    const client = await prisma.client.update({
      where: {
        id,
      },
      data: {
        active: !clientData!.active,
        updatedById: session.user.id,
      },
    });

    revalidatePath("/crm/clients");

    return {
      ok: true,
      client,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar el cliente",
    };
  }
};
