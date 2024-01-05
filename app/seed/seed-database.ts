import { initialData } from "./seed";

import prisma from "../config/database";

async function main() {
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  const { users, projects } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.project.createMany({
    data: projects,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  // if (process.env.NODE_ENV === "production") return;
  main();
})();
