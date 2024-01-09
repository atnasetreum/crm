"use server";

import prisma from "@config/database";
import { Client } from "@interfaces";

export const addComment = async (client: Client) => {
  try {
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
