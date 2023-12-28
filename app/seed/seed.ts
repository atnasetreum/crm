import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  password: string;
  name: string;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "eduardo-266@hotmail.com",
      name: "Eduardo Dominguez",
      password: bcryptjs.hashSync("123456"),
    },
  ],
};
