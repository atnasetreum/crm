"use server";

import { revalidatePath } from "next/cache";

import prisma from "@config/database";

export const removeClient = async (id: number) => {
  try {
    const client = await prisma.client.update({
      where: {
        id,
      },
      data: {
        active: false,
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
