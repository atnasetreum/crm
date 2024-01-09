import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  password: string;
  name: string;
}

interface SeedProject {
  name: string;
}

interface SeedData {
  users: SeedUser[];
  projects: SeedProject[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "eduardo-266@hotmail.com",
      name: "Eduardo Dominguez",
      password: bcryptjs.hashSync("123456"),
    },
  ],
  projects: [
    {
      name: "Marqués del Rio",
    },
    {
      name: "Real solare",
    },
    {
      name: "Valencia",
    },
    {
      name: "Ciudad Marqués",
    },
  ],
};
