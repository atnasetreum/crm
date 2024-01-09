"use server";

import { revalidatePath } from "next/cache";

export const refreshClients = async () => {
  revalidatePath("/crm/clients");
};
