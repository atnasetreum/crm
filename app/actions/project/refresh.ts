"use server";

import { revalidatePath } from "next/cache";

export const refreshProjects = async () => {
  revalidatePath("/crm/projects");
};
