import { initialData } from "./seed";

import prisma from "../config/database";

async function main() {
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  const { users, projects } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  const email = users[0].email;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("User not found: email" + email);

  const { id: userId } = user;

  await prisma.project.createMany({
    data: projects.map((project) => ({
      name: project.name,
      createdById: userId,
    })),
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
