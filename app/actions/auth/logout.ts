"use server";

import { signOut } from "@app/auth.config";

export const logout = async () => {
  await signOut();
};
