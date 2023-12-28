import { initialData } from "./seed";

import prisma from "../config/database";

async function main() {
  await prisma.user.deleteMany();

  const { users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
